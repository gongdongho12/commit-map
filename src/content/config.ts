import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    endDate: z.date().optional(),
    country: z.string(),
    countries: z.array(z.string()).optional(),
    tripType: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    excerpt: z.string().optional(),
    locations: z.array(z.object({
      name: z.string(),
      lat: z.number(),
      lng: z.number(),
      type: z.string().optional(),
      order: z.number().optional(),
      country: z.string().optional(),
      link: z.string().optional(),
      visitDate: z.string().optional(),
      note: z.string().optional(),
      contents: z.array(z.object({
        heading: z.string(),
        text: z.string(),
      })).optional(),
      images: z.array(z.object({
        src: z.string(),
        alt: z.string().optional(),
      })).optional(),
    }).passthrough()),
  }),
});

export const collections = {
  posts: postsCollection,
};
