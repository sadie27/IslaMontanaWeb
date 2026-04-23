# Graph Report - C:\Users\Santiago Die\Desktop\IslaMontana\IslaMontanaWeb  (2026-04-23)

## Corpus Check
- Large corpus: 90 files · ~1,439,703 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 173 nodes · 151 edges · 12 communities detected
- Extraction: 75% EXTRACTED · 25% INFERRED · 1% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Backend DB Layer|Backend DB Layer]]
- [[_COMMUNITY_Navigation & Destinations Docs|Navigation & Destinations Docs]]
- [[_COMMUNITY_Brand Identity Images|Brand Identity Images]]
- [[_COMMUNITY_Map Animation Mobile|Map Animation Mobile]]
- [[_COMMUNITY_CSS Design System|CSS Design System]]
- [[_COMMUNITY_Destinations Page|Destinations Page]]
- [[_COMMUNITY_Map Animation Desktop|Map Animation Desktop]]
- [[_COMMUNITY_API Client Layer|API Client Layer]]
- [[_COMMUNITY_Hero Manifest Script|Hero Manifest Script]]
- [[_COMMUNITY_Hero Manifest Docs|Hero Manifest Docs]]
- [[_COMMUNITY_FastAPI App Root|FastAPI App Root]]
- [[_COMMUNITY_Backend Test Suite|Backend Test Suite]]

## God Nodes (most connected - your core abstractions)
1. `Galapagos Destination - Sea Lions on Boardwalk` - 9 edges
2. `MASTER_PLAN — IslaMontana Travel` - 8 edges
3. `Frontend Architecture — Data Flow` - 6 edges
4. `IslaMontana Monorepo README` - 5 edges
5. `frontend/src/app/ — App Router Routes` - 5 edges
6. `Layered Architecture: routers -> services -> models` - 5 edges
7. `Backend README — FastAPI REST API` - 4 edges
8. `components/layout/ — Navbar, MegaMenu, Footer` - 4 edges
9. `FastAPI Python Backend on VPS` - 4 edges
10. `Next.js Server/Client Component Split Strategy` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Ecuador High-Resolution SVG Map (Provinces)` --conceptually_related_to--> `Ecuador Destinations: Galapagos, Amazonia, Andes, Costa`  [INFERRED]
  frontend/public/ecuadorHigh.svg → README.md
- `South America Low-Resolution SVG Map (Countries)` --conceptually_related_to--> `Ecuador Destinations: Galapagos, Amazonia, Andes, Costa`  [INFERRED]
  frontend/public/southAmericaLow.svg → README.md
- `Layered Architecture: routers -> services -> models` --semantically_similar_to--> `Next.js Server/Client Component Split Strategy`  [INFERRED] [semantically similar]
  backend/README.md → frontend/ARCHITECTURE.md
- `MASTER_PLAN — IslaMontana Travel` --references--> `Next.js 14 App Router Frontend`  [EXTRACTED]
  MASTER_PLAN.md → frontend/README.md
- `getNavMenuData()` --calls--> `getNavMenu()`  [INFERRED]
  C:\Users\Santiago Die\Desktop\IslaMontana\IslaMontanaWeb\frontend\src\app\layout.tsx → C:\Users\Santiago Die\Desktop\IslaMontana\IslaMontanaWeb\frontend\src\lib\api.ts

## Hyperedges (group relationships)
- **Backend Layered Stack** — backend_routers_readme, backend_services_readme, backend_models_readme, concept_supabase_postgres [EXTRACTED 0.95]
- **Frontend Data Pipeline** — concept_fastapi_backend, concept_data_flow, concept_pydantic_schemas, concept_server_client_split [EXTRACTED 0.92]
- **Home Page Rebuild Plan** — master_plan, concept_home_sections, concept_bem_css, concept_color_palette [EXTRACTED 0.93]
- **Islamontana Travel Brand Identity Suite** — logo_horizontal_sf, logo_horizontal, logo_original_sf, logo_original, logo_simple_sf, logo_simple [INFERRED 0.97]
- **Galapagos Wildlife Hero Image Set** — lobitos_computer_hero, paisaje_computer_hero, piquero_computer_hero, lobito_movile_hero, piqueros_movile_hero [INFERRED 0.90]
- **Ecuador Destination Regions Mega-Menu Group** — megamenu_amazonia, megamenu_andes_naturaleza, megamenu_costa, megamenu_galapagos [INFERRED 0.92]

## Communities

### Community 0 - "Backend DB Layer"
Cohesion: 0.1
Nodes (24): Backend migrations/ — Alembic DB Migrations, Backend models/ — SQLAlchemy ORM Models, Backend README — FastAPI REST API, Backend routers/ — REST Endpoint Definitions, Backend schemas/ — Pydantic DTOs, Backend services/ — Business Logic Layer, Backend migrations/versions/ — Migration Scripts, Alembic DB Migration System (+16 more)

### Community 1 - "Navigation & Destinations Docs"
Cohesion: 0.15
Nodes (16): Ecuador Destinations: Galapagos, Amazonia, Andes, Costa, Known Bugs: missing images, 404 routes, typo directory, MegaMenu Component — GPU-Animated Full-Width Panel, Navbar Component — Client Component with Scroll + MegaMenu, Tours Catalog: Galapagos Esencial, Cuyabeno Inmersivo, Quilotoa Loop, frontend/src/app/ — App Router Routes, components/ — React Component Directory, app/destinations/ — Destinations Route (IMPLEMENTED) (+8 more)

### Community 2 - "Brand Identity Images"
Cohesion: 0.21
Nodes (15): Galapagos Sea Lion Pup with Adults on Beach (Mobile Hero), Galapagos Sea Lion Pups on Beach (Desktop Hero), Islamontana Travel Logo Horizontal with Background, Islamontana Travel Logo Horizontal Sans Background, Islamontana Travel Logo Original Vertical with Background, Islamontana Travel Logo Original Vertical Sans Background, Islamontana Travel Icon Only with Background, Islamontana Travel Icon Only Sans Background (+7 more)

### Community 3 - "Map Animation Mobile"
Cohesion: 0.2
Nodes (2): lerp(), tick()

### Community 4 - "CSS Design System"
Cohesion: 0.27
Nodes (10): BEM CSS Methodology with CSS Custom Properties, Color Design Tokens, CSS Hover Rule: @media (hover: hover) and (pointer: fine), Home Page Sections: Stats, Destinations, WhyUs, Tours, Gallery, FinalCta, Outfit Google Font — Primary Typography, Subagent Division Plan, src/styles/ — globals.css BEM + CSS Tokens, MASTER_PLAN — IslaMontana Travel (+2 more)

### Community 6 - "Destinations Page"
Cohesion: 0.29
Nodes (4): getDestinationBySlug(), NotFound(), DestinationPage(), generateMetadata()

### Community 7 - "Map Animation Desktop"
Cohesion: 0.38
Nodes (3): clamp(), lerp(), tick()

### Community 8 - "API Client Layer"
Cohesion: 0.33
Nodes (2): getNavMenu(), getNavMenuData()

### Community 10 - "Hero Manifest Script"
Cohesion: 1.0
Nodes (2): generateManifest(), readImagesFromDir()

### Community 26 - "Hero Manifest Docs"
Cohesion: 1.0
Nodes (2): Hero Images Manifest — Auto-generated, scripts/ — generate-hero-manifest.mjs

### Community 49 - "FastAPI App Root"
Cohesion: 1.0
Nodes (1): Backend app/ — FastAPI Application Root

### Community 50 - "Backend Test Suite"
Cohesion: 1.0
Nodes (1): Backend tests/ — pytest Test Suite

## Ambiguous Edges - Review These
- `Galapagos Volcanic Landscape Panorama (Desktop Hero)` → `Andes Naturaleza Destination - Snow-capped Volcano at Sunset`  [AMBIGUOUS]
  frontend/public/images/hero-main/Computer/paisaje.webp · relation: semantically_similar_to

## Knowledge Gaps
- **22 isolated node(s):** `Backend app/ — FastAPI Application Root`, `Backend models/ — SQLAlchemy ORM Models`, `Backend routers/ — REST Endpoint Definitions`, `Backend schemas/ — Pydantic DTOs`, `Backend services/ — Business Logic Layer` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Map Animation Mobile`** (11 nodes): `clamp()`, `getRegion()`, `getRegionFill()`, `getRegionOpacity()`, `handler()`, `handleTouchEnd()`, `handleTouchMove()`, `handleTouchStart()`, `lerp()`, `tick()`, `DestinationMapAnimationMobile.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `API Client Layer`** (6 nodes): `getDestination()`, `getDestinations()`, `getNavMenu()`, `getNavMenuData()`, `layout.tsx`, `api.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Manifest Script`** (3 nodes): `generateManifest()`, `readImagesFromDir()`, `generate-hero-manifest.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Hero Manifest Docs`** (2 nodes): `Hero Images Manifest — Auto-generated`, `scripts/ — generate-hero-manifest.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `FastAPI App Root`** (1 nodes): `Backend app/ — FastAPI Application Root`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Backend Test Suite`** (1 nodes): `Backend tests/ — pytest Test Suite`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Galapagos Volcanic Landscape Panorama (Desktop Hero)` and `Andes Naturaleza Destination - Snow-capped Volcano at Sunset`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **Why does `MASTER_PLAN — IslaMontana Travel` connect `CSS Design System` to `Backend DB Layer`, `Navigation & Destinations Docs`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `Galapagos Destination - Sea Lions on Boardwalk` (e.g. with `Galapagos Sea Lion Pups on Beach (Desktop Hero)` and `Galapagos Sea Lion Pup with Adults on Beach (Mobile Hero)`) actually correct?**
  _`Galapagos Destination - Sea Lions on Boardwalk` has 9 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Backend app/ — FastAPI Application Root`, `Backend models/ — SQLAlchemy ORM Models`, `Backend routers/ — REST Endpoint Definitions` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Backend DB Layer` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._