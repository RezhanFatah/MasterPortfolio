import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: 'longDescription',
            title: 'Long Description',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    fields: [
                        {
                            type: 'text',
                            name: 'alt',
                            title: 'Alternative text',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'links',
            title: 'Links',
            type: 'object',
            fields: [
                {
                    name: 'github',
                    title: 'GitHub URL',
                    type: 'url',
                },
                {
                    name: 'demo',
                    title: 'Demo URL',
                    type: 'url',
                },
                {
                    name: 'paper',
                    title: 'Paper URL',
                    type: 'url',
                },
            ],
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string',
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'galleryImages',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string',
                        },
                    ],
                },
            ],
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Published', value: 'published' },
                    { title: 'Archived', value: 'archived' },
                ],
                layout: 'radio',
            },
            initialValue: 'published',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'coverImage',
            publishedAt: 'publishedAt',
        },
        prepare({ title, media, publishedAt }) {
            return {
                title,
                media,
                subtitle: publishedAt
                    ? new Date(publishedAt).toLocaleDateString()
                    : 'Not published',
            }
        },
    },
})
