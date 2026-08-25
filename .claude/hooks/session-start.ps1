# SessionStart hook - inyecta el resumen del grafo (GRAPH_REPORT.md) como
# contexto RAG al iniciar la sesion. Al ir en un .ps1 llamado con -File, bash ya
# no mangla las comillas invertidas, los $(...) ni el $null.

$ErrorActionPreference = 'SilentlyContinue'

# Raiz del repo = dos niveles por encima de .claude\hooks
$repo       = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$reportPath = Join-Path $repo 'graphify-out\GRAPH_REPORT.md'

$report = Get-Content $reportPath -Raw -Encoding UTF8 -ErrorAction SilentlyContinue

if ($report) {
    $ctx = "[GRAPHIFY RAG CONTEXT - IslaMontana Knowledge Graph]`n$report"
    @{
        hookSpecificOutput = @{
            hookEventName     = 'SessionStart'
            additionalContext = $ctx
        }
    } | ConvertTo-Json -Compress -Depth 5
}
else {
    '{}'
}
