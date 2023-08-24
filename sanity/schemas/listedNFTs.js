import {defineField, defineType} from 'sanity'
import blockContent from "./blockContent"


export default defineType({
  name: 'listedNFTs',
  title: 'Listed NFTs',
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
      title: 'Price (MATIC)',
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
    defineField({
      name: 'contractAddress',
      title: 'ContractAddress',
      type: 'string',
    }),
    defineField({
      name: 'tokenId',
      title: 'Token Id',
      type: 'number',
      // options: {
      //   hotspot: true,
      // },
    }),
    defineField({
      name: 'minter',
      title: 'Minter',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})