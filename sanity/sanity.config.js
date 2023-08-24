import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import createClient from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from '@sanity/image-url';

const sanityClient = defineConfig({
  name: 'default',
  title: 'nftropolis',

  projectId: 'vh6m6uma',
  dataset: 'production',

  apiVersion: "2021-03-25",

  useCdn: true,


  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

export default sanityClient

export const client = createClient(sanityClient)



const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source)
}