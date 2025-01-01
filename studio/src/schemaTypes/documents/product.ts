import {defineField, defineType} from 'sanity'
import {DesktopIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: DesktopIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name:'brand',
      title: 'Brand name',
      type: 'reference',
      to: [{type: 'brand'}],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Product image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tax',
      title: 'Shipping fee & Tax',
      type: 'number',
    }),
  ],
})