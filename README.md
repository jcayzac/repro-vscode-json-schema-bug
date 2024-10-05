# repro-vscode-json-schema-bug

[Open in Stackblitz](https://stackblitz.com/~/github.com/jcayzac/repro-vscode-json-schema-bug)

This is a minimal repro for https://github.com/microsoft/vscode-json-languageservice/issues/245 which shows `vscode-json-languageservice` does not properly interpret the provided JSON schema when using type intersections (`"allOf": […]`).

## Running

```sh
$ npm install
$ node index.js
Validation results: [
  '[line 1] Property $schema is not allowed.',
  '[line 2] Property published is not allowed.',
  '[line 3] Property updated is not allowed.',
  '[line 4] Property title is not allowed.',
  '[line 5] Property subheading is not allowed.',
  '[line 7] Property hero is not allowed.',
  '[line 11] Property tags is not allowed.',
  '[line 14] Property description is not allowed.'
]
done
```
