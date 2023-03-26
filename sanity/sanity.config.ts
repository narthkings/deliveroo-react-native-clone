import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'deliveroo',

  projectId: "1s8s88az",
  dataset: "production",
  // projectId: 'cxyqg2ij',
  // dataset: 'sanity',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
