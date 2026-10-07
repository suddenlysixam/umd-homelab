import starlightSidebarTopics from 'starlight-sidebar-topics'
import { github_link } from '../social.mjs';

export const custom_starlightSidebarTopics =
    starlightSidebarTopics([
        {
            label: 'Guides',
            link: '/guides',
            id: 'guides',
            icon: 'open-book',
            items: [{ autogenerate: { "directory": "guides" } }],
        },
        {
            label: 'Reference',
            link: '/reference',
            id: 'reference',
            icon: 'information',
            items: [{ autogenerate: { "directory": "reference" } }],
        },
        {
            label: 'GitHub',
            icon: 'github',
            link: github_link,
        },
    ],{
        topics: {
            // reference: ['/staging/', '/staging/**/*'],
            guides: ['/docs'],
        },
        exclude: [
            '/about', '/authors', '/authors/**/*', '/faq',
            '/meetings', '/meetings/**/*',
            '/tags', '/tags/**/*',
            '/reference', '/reference/**/*',
        ],
    });