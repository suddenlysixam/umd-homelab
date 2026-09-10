// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Plugin imports
import { starlightBasePath } from "starlight-base-path";
import starlightBlog from 'starlight-blog'
import starlightHeadingBadges from 'starlight-heading-badges'
import icon from 'astro-icon';

// Plugin imports with custom configurations
import { custom_starlightTags } from './config/plugins/custom_starlightTags.mjs'
import { custom_starlightUiTweaks } from './config/plugins/custom_starlightUiTweaks.mjs'
import { custom_starlightAnnouncement } from './config/plugins/custom_starlightAnnouncement.mjs';
import { custom_starlightSidebarTopics } from './config/plugins/custom_starlightSidebarTopics.mjs';

// Custom configurations
import { BASE_PATH } from './config/basePath.mjs';
import { custom_redirects } from './config/redirects.mjs';
import { authors } from './config/authors.mjs';
import { social } from './config/social.mjs';

const SITE_SUBTITLE = '(a.k.a The Homelab Club)';

// https://astro.build/config
export default defineConfig({
    vite: {
        define: {
            __SITE_SUBTITLE__: JSON.stringify(SITE_SUBTITLE),
        },
    },
    site: 'https://suddenlysixam.club',
    base: BASE_PATH,
    redirects: custom_redirects,
    integrations: [starlight({
        title: 'Build I.T.',
        logo: {
            src: './src/assets/favicon.svg',
        },
        // @ts-expect-error Icons provided at runtime.
        social,
        customCss: [
            './src/styles/color-themes/terminal/color-theme-terminal.css',
            './src/styles/custom-base.css',
            './src/styles/meeting-cards.css',
        ],
        components: {
            SiteTitle: './src/components/SiteTitle.astro',
            SocialIcons: './src/components/SocialIcons.astro',
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
        ],
		}),
        icon()],
});