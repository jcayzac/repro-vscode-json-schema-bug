# repro-vscode-json-schema-bug

This is a minimal repro for https://github.com/microsoft/vscode-json-languageservice/issues/245 which shows `vscode-json-languageservice` does not properly interpret the provided JSON schema when using type intersections (`"allOf": […]`).
