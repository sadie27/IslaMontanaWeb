# Stop hook - registra los ficheros modificados en la sesion y marca el grafo
# como pendiente de actualizacion.

$ErrorActionPreference = 'SilentlyContinue'

# Raiz del repo = dos niveles por encima de .claude\hooks
$repo = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
Set-Location $repo

$changed = git diff --name-only HEAD 2>$null

if ($changed) {
    $files = @($changed)            # fuerza array aunque sea una sola linea
    $count = $files.Count
    $lines = $files -join "`n"
    $ts    = Get-Date -Format 'yyyy-MM-dd HH:mm'

    $content = @"
# Graphify - actualizacion pendiente

Ultima sesion ($ts) modifico $count fichero(s):

$lines

> Preferente: parchea la capa EXTRACTED del grafo de forma incremental
> invocando la skill graphify (se documenta a si misma; ver tambien la nota
> en docs/CONTEXT.md #6). Alternativa: ejecuta /graphify para una
> reconstruccion completa (recalcula tambien la capa semantica).
"@

    $outPath = Join-Path $repo 'graphify-out\PENDING_UPDATE.md'
    Set-Content -Path $outPath -Value $content -Encoding UTF8

    @{
        systemMessage = "Graphify: $count fichero(s) cambiados - parchea el grafo incrementalmente (skill graphify) o ejecuta /graphify. Ver graphify-out/PENDING_UPDATE.md"
    } | ConvertTo-Json -Compress
}
else {
    '{}'
}
