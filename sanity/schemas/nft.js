import {defineField, defineType} from 'sanity'
import blockContent from "./blockContent"


export default defineType({
  name: 'nft',
  title: 'NFT',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'slug',
      // options: {
      //   source: 'name',
      //   maxLength: 96,
      // },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      // options: {
      //   hotspot: true,
      // },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})