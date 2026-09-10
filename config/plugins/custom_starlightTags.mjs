import starlightTags from 'starlight-tags';

export const custom_starlightTags =
    starlightTags({
        configPath: 'config/tags.yml',
        tagsPagesPrefix: 'tags',
        tagsIndexSlug: 'tags',
        onInlineTagsNotFound: 'create',
        itemsPerPage: 12,
        sidebar: {
            enabled: true,
            position: 'bottom',			// 'top', 'bottom'
            limit: 10,				// (0 = all)
            sortBy: 'priority',			// 'count', 'alphabetical', or 'priority'
            showCount: true,
            collapsed: false,
            showViewAllLink: true
        }
    });