import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'Image of Restaurant',
      type: 'image',
    }),

    defineField({
      name: 'lat',
      title: 'Latitude of Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'long',
      title: 'Longitude of Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Address of Restaurant',
      type: 'string', 
      validation: (Rule) => Rule.required(), 
    }),
    defineField({
      name: 'rating', 
      title: 'Rating of Restaurant',
      type: 'number',
      validation: (Rule)=> Rule.min(1).max(5).error('Rating must be between 1 and 5'),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(), 
      type:'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: {type: 'dish'}}],
    }),
  ], 
})
