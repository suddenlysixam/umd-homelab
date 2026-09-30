import starlightSidebarTopics from 'starlight-sidebar-topics'
import { github_link } from '../social.mjs';

export const custom_starlightSidebarTopics =
    starlightSidebarTopics([
        {
            label: 'Guides',
            link: '/guides',
            icon: 'open-book',
            items: [{ autogenerate: { "directory": "guides" } }],
        },
        {
            label: 'Reference',
            link: '/reference',
            icon: 'information',
            items: [{ autogenerate: { "directory": "reference" } }],
        },
        {
            label: 'GitHub',
            icon: 'github',
            link: github_link,
        },
    ],{
        // topics: {
        //     reference: ['/staging/', '/staging/**/*'],
        // },
        exclude: [
            '/about', '/authors', '/authors/**/*', '/faq',
            '/meetings', '/meetings/**/*',
            '/tags', '/tags/**/*',
            '/reference', '/reference/**/*',
        ],
    });