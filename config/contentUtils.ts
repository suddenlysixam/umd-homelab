import type { CollectionEntry } from "astro:content";

type DocsEntry = CollectionEntry<"docs">;

export function sortPagesByModifiedDate(
    pages: DocsEntry[],
): DocsEntry[] {
    return [...pages].sort((a, b) => {
        const dateA = a.data.modify_date ?? a.data.date;
        const dateB = b.data.modify_date ?? b.data.date;

        if (!dateA && !dateB) {
            return a.data.title.localeCompare(b.data.title);
        }

        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateB.getTime() - dateA.getTime();
    });
}

export function getPagePath(page: DocsEntry): string {
    return `/${page.id.replace(/\/index$/, "")}/`;
}