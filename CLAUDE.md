## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Regla Graphify (lectura obligatoria antes de buscar)

Antes de hacer Glob, Grep o Read sobre múltiples archivos, primero:

1. Verifica que `graphify-out/GRAPH_REPORT.md` exista. Si no, sugiéreme correr `/graphify .` y espera mi confirmación.
2. Si existe, léelo primero. Identifica si la respuesta a mi pregunta ya está ahí (god nodes, comunidades, suggested questions).
3. Si la pregunta es sobre relaciones entre módulos, usa `/graphify query "..."` antes de abrir archivos.
4. Si es sobre cómo se conectan dos cosas, usa `/graphify path "NodeA" "NodeB"`.
5. Solo después, si el grafo no responde, abre archivos.

Esta regla aplica salvo que yo te diga explícitamente "ignora el grafo" o "abre directo el archivo X".
