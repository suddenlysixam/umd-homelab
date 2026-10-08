import { authors } from '@config/authors.mjs';

export function getAuthorGroup(key) {
    const author = authors[key];

    if (
        author.title === 'President' ||
        author.title === 'Treasurer' ||
        author.title === 'Officer'
    ) {
        return 'officers';
    }

    if (author.title === 'Advisor') {
        return 'advisors';
    }

    if (author.title?.startsWith('Alum')) {
        return 'alumni';
    }

    if (author.title === 'Member') {
        return 'members';
    }

    if (author.name === 'Build I.T. Club') {
        return 'exclude';
    }

    return 'other';
}

export function getAuthorSortPriority(key) {
    const author = authors[key];

    // Officers
    if (author.title === 'President') {
        return -3;
    }

    if (author.title === 'Treasurer') {
        return -2;
    }

    if (author.title === 'Officer') {
        return -1;
    }

    // Non-advisor & non-alum members
    if (
        author.title &&
        !author.title.startsWith('Alum') &&
        author.title !== 'Advisor'
    ) {
        return 0;
    }

    // Advisors
    if (author.title === 'Advisor') {
        return 1;
    }

    // Alumni
    if (author.title?.startsWith('Alum')) {
        return 2;
    }

    // Default Build I.T. author, this is filtered out later when getting the keys
    if (key === 'none') {
        return 3;
    }

    // Everyone else
    return 4;
}

export function getSortedAuthorKeys() {
    return Object.keys(authors)
        .filter((key) => key !== 'none')
        .sort((a, b) => {
            const priorityDifference =
                getAuthorSortPriority(a) - getAuthorSortPriority(b);

            if (priorityDifference !== 0) {
                return priorityDifference;
            }

            return authors[a].name.localeCompare(authors[b].name);
        });
}