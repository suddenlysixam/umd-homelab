// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Plugin imports
import { starlightBasePath } from "starlight-base-path";
import starlightBlog from 'starlight-blog'
import starlightHeadingBadges from 'starlight-heading-badges'
import icon from 'astro-icon';

// Plugin imports with custom configurations
import { custom_starlightTags } from '@plugins/custom_starlightTags.mjs'
import { custom_starlightUiTweaks } from '@plugins/custom_starlightUiTweaks.mjs'
import { custom_starlightAnnouncement } from '@plugins/custom_starlightAnnouncement.mjs';
import { custom_starlightSidebarTopics } from '@plugins/custom_starlightSidebarTopics.mjs';

// Custom plugins
import { routeMiddleware } from '@plugins/routeMiddleware.mjs';

// Custom configurations
// import { BASE_PATH } from '@config/basePath.mjs';
import { custom_redirects } from '@config/redirects.mjs';
import { authors } from '@config/authors.mjs';
import { social } from '@config/social.mjs';

const SITE_SUBTITLE = '(a.k.a The Homelab Club)';

// https://astro.build/config
export default defineConfig({
    vite: {
        define: {
            __SITE_SUBTITLE__: JSON.stringify(SITE_SUBTITLE),
        },
    },
    site: 'https://suddenlysixam.club',
    // base: BASE_PATH,
    redirects: custom_redirects,
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    integrations: [starlight({
        title: 'Build I.T.',
        disable404Route: true,
        logo: {
            src: '@assets/favicon.svg',
        },
        // @ts-expect-error Icons provided at runtime.
        social,
        customCss: [
            '@styles/color-themes/terminal/color-theme-terminal.css',
            '@styles/custom-base.css',
            '@styles/meeting-cards.css',
            '@styles/guides.css',
        ],
        components: {
            SiteTitle: '@components/overrides/SiteTitleOverride.astro',
            SocialIcons: '@components/overrides/SocialIconsOverride.astro',
            PageTitle: '@components/overrides/PageTitleOverride.astro',
        },
        plugins: [
            starlightBasePath(),
            starlightBlog({
                title: 'Meetings',
                prefix: 'meetings',
                navigation: 'none',
                authors,
                rss: false,
            }),
            starlightHeadingBadges(),
            custom_starlightUiTweaks,
            custom_starlightAnnouncement,
            custom_starlightSidebarTopics,
            custom_starlightTags, // must be listed after 'custom_starlightSidebarTopics'
            routeMiddleware,
        ],
		}),
        icon()],
});