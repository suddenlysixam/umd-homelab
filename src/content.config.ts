import { defineCollection } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema'
import { starlightTagsExtension } from 'starlight-tags';
// import { topicSchema } from 'starlight-sidebar-topics/schema'

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) => blogSchema(context).extend(starlightTagsExtension.shape)
			// extend: (context) => blogSchema(context).extend(topicSchema.shape)
		})
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
