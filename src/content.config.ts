import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema'
import { starlightTagsExtension } from 'starlight-tags';
import { topicSchema } from 'starlight-sidebar-topics/schema'

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) => blogSchema(context).extend(starlightTagsExtension.shape).extend(topicSchema.shape).extend({
						location: z.string().optional(),
						topic: z.string().optional(),
						rsvp: z.url().optional(),
						slides: z.string().optional(),
						project: z.string().optional(),
						modify_date: z.date().optional(),
					}),
			// extend: (context) => blogSchema(context).extend(topicSchema.shape)
		})
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
