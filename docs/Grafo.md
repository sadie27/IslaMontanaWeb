# Grafo.md — Grafo de conocimiento del repositorio

> El repo está mapeado con `graphify` en `graphify-out/graph.json`: un grafo de
> conocimiento del código. Este doc define **cómo usarlo para buscar** y **cómo
> actualizarlo de forma incremental** sin relanzar el plugin completo.
> Se lee bajo demanda (no se importa con `@`).

---

## 1. Qué es

Grafo NetworkX en formato node-link (`graph.json`, ~547 KB). Contiene:

- **Nodos** (~664): ficheros **y** símbolos dentro de ellos (funciones,
  componentes). Campos: `id` (normalizado, p. ej. `src_app_error_tsx`,
  `error_error`), `label`, `norm_label`, `file_type` (`code`/`document`/`image`),
  `source_file` (ruta del fichero), `source_location` (línea, p. ej. `L5`),
  `community` (clúster).
- **Aristas** (`links`, ~617): `source`/`target` (ids de nodo), `relation`,
  `confidence` (`EXTRACTED` | `INFERRED` | `AMBIGUOUS`), `confidence_score`,
  `weight`, `source_file`, `source_location`. Relaciones: `contains`, `calls`,
  `implements`, `references`, `conceptually_related_to`, `semantically_similar_to`,
  `shares_data_with`, `rationale_for`.
- **Hiperaristas** (`hyperedges`): grupos con nombre que representan "sistemas"
  (p. ej. *Nav Data Pipeline: API→Adapter→Layout*), con `members`, `relation`,
  `rationale`.

### Dos avisos importantes

1. **Rutas absolutas de Windows.** `source_file` viene como
   `C:\Users\...\IslaMontanaWeb\frontend\...`. Para usarlo en cualquier máquina,
   **normaliza a ruta relativa al repo**: toma lo que va después de
   `IslaMontanaWeb\` (la raíz del repo) y cambia `\` por `/`.
   Ej.: `…\IslaMontanaWeb\frontend\src\app\error.tsx` → `frontend/src/app/error.tsx`.
2. **No lo cargues entero en contexto.** Son 547 KB. **Siempre** consúltalo con
   un script que filtre y devuelva solo el subgrafo relevante (ver §2).

---

## 2. Regla de búsqueda — el grafo es un índice, el código es la verdad

**Orden de fuentes:**

- Para preguntas de **relación, impacto o localización** → consulta primero el
  grafo (es precomputado y barato).
- Para el **contenido real** de un fichero → lee el código en
  `source_file:source_location`.
- **Ante conflicto, gana el código.** El grafo puede estar desactualizado
  (ver §4: marcador de frescura). Si el grafo dice algo que el código desmiente,
  el código manda y, si procede, se parchea el grafo.

**Qué consultar y con qué relación:**

| Pregunta | Cómo resolverla en el grafo |
|---|---|
| ¿Dónde está el símbolo/componente X? | nodo cuyo `label`/`norm_label` ≈ X → `source_file` + `source_location` |
| ¿Quién llama / usa X? | aristas `calls`/`references` con `target` = X → sus `source` |
| ¿Qué usa X? | aristas `calls`/`references` con `source` = X → sus `target` |
| ¿Qué contiene el fichero F? | aristas `contains` con `source` = nodo de F |
| ¿Qué "sistema" toca esto? | `hyperedges` cuyos `members` incluyan el nodo; y su `community` |
| **Radio de impacto de tocar Z** | todas las aristas que tocan los nodos de Z + miembros de su `community` + hiperaristas que lo incluyan |

**Cómo consultarlo (patrón, no cargar el JSON en contexto):** usa un script
puntual que cargue `graph.json`, filtre y devuelva solo lo necesario. Ejemplo
para "quién referencia/llama a un nodo":

```python
import json
g = json.load(open("graphify-out/graph.json", encoding="utf-8"))
target = "src_lib_image_loader_ts"   # id del nodo
hits = [l for l in g["links"]
        if l["target"] == target and l["relation"] in ("calls", "references")]
for l in hits:
    print(l["source"], "->", l["target"], f"({l['relation']}, {l['confidence']})")
```

### Sinergia con la zona intocable

Antes de tocar un vecino de `/destinations`, consulta el grafo para ver **qué
depende de los ficheros intocables y de qué dependen ellos**. Permite evaluar el
radio de impacto sin abrir la zona intocable. (La zona intocable sigue sin
tocarse; el grafo solo se *lee*.)

---

## 3. Regla de actualización incremental (sin relanzar el plugin)

La clave está en el campo `confidence` de cada arista:

- **Capa `EXTRACTED`** (`contains`, `calls`, `implements`, `references` con
  `confidence == "EXTRACTED"`): se deriva parseando **un solo fichero**. Es
  determinista y barata → **se parchea incrementalmente**.
- **Capa `INFERRED`** (todo lo marcado `INFERRED`/`AMBIGUOUS`, más
  `conceptually_related_to`, `semantically_similar_to`, `shares_data_with`, las
  `hyperedges` y la asignación de `community`): requiere la pasada semántica
  sobre **todo** el repo → **NO se toca en incremental**.

### Qué hacer al terminar un cambio de código

Engánchalo al **mismo momento** en que escribes la entrada de trazabilidad. Para
cada fichero de código modificado/creado/eliminado:

1. **Localiza** sus nodos en el grafo (por `source_file` normalizado).
2. **Parchea solo la capa EXTRACTED** de ese fichero:
   - Añade/elimina nodos de símbolo si se añadieron/quitaron funciones o componentes.
   - Añade/elimina aristas `contains`/`calls`/`implements`/`references`
     **`EXTRACTED`** que hayan cambiado. Ajusta `source_location` si tienes la
     línea; si no, déjala aproximada.
   - Nodos nuevos: asígnales `community` centinela `-1` (sin asignar) hasta el
     próximo `/graphify` completo. **No** intentes reclusterizar.
3. **No toques** aristas `INFERRED`, hiperaristas ni `community` de nodos existentes.
4. **Actualiza el marcador de frescura** (§4).

> Si un cambio elimina un fichero, elimina sus nodos y todas las aristas que lo
> tocan. Si renombra, actualiza `id`/`label`/`source_file` y las aristas.

### Cuándo SÍ relanzar `/graphify` completo

- Cambios estructurales grandes (nueva sección/módulo, refactor amplio).
- Cuando la capa semántica lleve demasiados parches acumulados (ver
  `meta.pending_files` en §4).
- Recalibración periódica.

---

## 4. Marcador de frescura

El grafo no trae metadatos de frescura. Manténlos en un objeto `meta` dentro del
JSON para que la obsolescencia sea visible:

```json
"meta": {
  "last_full_run":      { "fecha": "AAAA-MM-DD", "commit": "<hash o ->" },
  "last_incremental":   { "fecha": "AAAA-MM-DD", "commit": "<hash o ->" },
  "pending_files":      ["frontend/src/...", "..."],
  "semantic_stale":     true
}
```

- `pending_files`: ficheros parcheados en incremental desde el último full run.
- `semantic_stale`: `true` en cuanto haya un parche incremental; vuelve a `false`
  tras un `/graphify` completo.

Quien consulte el grafo debe asumir que la **capa semántica puede estar
desactualizada** si `semantic_stale` es `true`, y apoyarse en el código para
confirmar.

---

## 5. Resumen operativo

- **Buscar** relación/impacto/ubicación → grafo (filtrado por script). Contenido
  real → código. Conflicto → gana el código.
- **Al terminar cambios** → parchear solo la capa `EXTRACTED` de los ficheros
  tocados + actualizar `meta`. Nunca recalcular la capa semántica a mano.
- **`/graphify` completo** → solo para cambios grandes o recalibración periódica.
