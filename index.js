import service from 'vscode-json-languageservice'
import { readFile } from 'node:fs/promises'

const { getLanguageService, TextDocument } = service

async function main() {
  const schemaUri = new URL('./schema.json', import.meta.url).href
  const schemaContent = await readFile('schema.json', 'utf-8')
  const service = getLanguageService({
    schemaRequestService: (uri) => Promise.resolve(schemaContent)
  })
  service.configure({
    allowComments: false,
    schemas: [
      {
        fileMatch: [
          "*.json",
        ],
        uri: schemaUri,
      }
    ]
  })

  const jsonUri = new URL('./data.json', import.meta.url).href
  const jsonContent = await readFile('data.json', 'utf-8')
  const textDocument = TextDocument.create(jsonUri, 'json', 1, jsonContent)
  const jsonDocument = service.parseJSONDocument(textDocument)
  
  const diagnostics = await service.doValidation(textDocument, jsonDocument)
  console.log('Validation results:', diagnostics.map(d => `[line ${d.range.start.line}] ${d.message}`))
  /*
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

  */
}

main().then(() => {}).catch((err) => console.error(err))
