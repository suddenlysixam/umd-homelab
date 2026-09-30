import { slug } from 'github-slugger';

import { authors } from './authors.mjs';
import { getAuthorGroup, getSortedAuthorKeys } from './authorUtils.mjs';

const authorKeys = getSortedAuthorKeys();

function authorItems(group) {
    return authorKeys
        .filter((key) => getAuthorGroup(key) === group)
        .map((key) => ({
            label: authors[key].name,
            link: `/authors/${slug(authors[key].name)}/`,
        }));
}

export const authorsSidebar = [
    {
        label: 'Authors',
        items: [
            {
                label: 'All Authors',
                link: '/authors/',
            },
            // {
            //     label: 'Build I.T. Club',
            //     link: '/authors/build-it-club/',
            // },
        ],
    },
    {
        label: 'Officers',
        items: authorItems('officers'),
    },
    {
        label: 'Members',
        items: authorItems('members'),
    },
    {
        label: 'Advisors',
        items: authorItems('advisors'),
    },
    {
        label: 'Alumni',
        items: authorItems('alumni'),
    },
    {
        label: 'Contributors',
        items: authorItems('other'),
    },
];

// export const sidebar = [
//     {
//         label: 'Guides',
//         items: [
//             // Each item here is one entry in the navigation menu.
//             { label: 'Example Guide', slug: 'guides/example' },
//         ],
//     },
//     {
//         label: 'Reference',
//         autogenerate: { directory: 'reference' },
//     },
// ];