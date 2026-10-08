import type { CollectionEntry } from "astro:content";

type DocsEntry = CollectionEntry<"docs">;

export function sortPagesByModifiedDate(
    pages: DocsEntry[],
): DocsEntry[] {
    return [...pages].sort((a, b) => {
        // Use lastUpdated if it is a Date (not a boolean or null)
        const dateA = (typeof a.data.lastUpdated === "boolean" ? a.data.date : a.data.lastUpdated) ?? a.data.date;
        const dateB = (typeof b.data.lastUpdated === "boolean" ? b.data.date : b.data.lastUpdated) ?? b.data.date;

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