import starlightSidebarTopics from 'starlight-sidebar-topics'
import { github_link } from '../social.mjs';

export const custom_starlightSidebarTopics =
    starlightSidebarTopics([
        {
            label: 'Guides',
            link: '/guides',
            icon: 'open-book',
            // items: ['guides/example'],
            // items: [
            //     {
            //     label: 'Guides',
            //     autogenerate: { directory: 'guides' },
            //     },
            // ],
            items: [{ autogenerate: { "directory": "guides" } }],
        },
        // {
        //     label: 'Reference',
        //     link: '/reference',
        //     icon: 'information',
        //     // id: 'reference',
        //     // badge: { text: 'Official', variant: 'success' },
        //     // items: ['reference/example'],
        //     // items: [
        //     //     {
        //     //     label: 'Reference',
        //     //     autogenerate: { directory: 'reference' },
        //     //     },
        //     // ],
        //     items: [{ autogenerate: { "directory": "reference" } }],
        // },
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
            '/meetings', '/meetings/**/*',
            '/tags', '/tags/**/*',
        ],
    });