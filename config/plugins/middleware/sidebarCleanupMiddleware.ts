import type { StarlightRouteData } from '@astrojs/starlight/route-data';

export async function onRequest(
    context: {
        locals: App.Locals & {
            starlightRoute?: StarlightRouteData;
            t?: (key: string) => string;
        };
        url: URL;
    },
    next: () => Promise<Response>
): Promise<Response> {
    const { starlightRoute, t } = context.locals;

    if (!starlightRoute?.sidebar || !t) {
        return next();
    }

    const path = context.url.pathname;
    const tagsLabel = t('starlightTags.popularTags');

    // Author profiles use their own sidebar and should not show Popular Tags
    if (path.startsWith('/authors/')) {
        starlightRoute.sidebar = starlightRoute.sidebar.filter(
            (entry) => entry.label !== tagsLabel
        );
    }

    // Tag pages should only show the sidebar provided by starlight-tags
    if (path === '/tags' || path.startsWith('/tags/')) {
        starlightRoute.sidebar = starlightRoute.sidebar.filter(
            (entry) => entry.label === tagsLabel
        );
    }

    return next();
}