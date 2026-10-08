import { getCollection } from "astro:content";
import type { StarlightRouteData } from "@astrojs/starlight/route-data";
import { isUpcoming } from "../../dateUtils";

export async function onRequest(
    context: {
        locals: App.Locals & {
            starlightRoute?: StarlightRouteData;
        };
        url: URL;
    },
    next: () => Promise<Response>
): Promise<Response> {
    const { starlightRoute } = context.locals;

    if (!starlightRoute || !starlightRoute.toc) {
        return next();
    }

    const path = context.url.pathname;

    if (!path.startsWith("/meetings/")) {
        return next();
    }

    const meetingPath = path.replace(/^\/+|\/+$/g, "");

    const meetings = await getCollection(
        "docs",
        ({ id, data }) =>
            id === meetingPath &&
            !data.draft
    );

    const meeting = meetings[0];

    if (!meeting) {
        return next();
    }

    if (
        meeting.data.date &&
        isUpcoming(meeting.data.date) &&
        meeting.data.rsvp
    ) {
        starlightRoute.toc.items.push({
            depth: 3,
            slug: "rsvp",
            text: "RSVP",
            children: [],
        });
    }

    if (meeting.data.slides) {
        starlightRoute.toc.items.push({
            depth: 3,
            slug: "slides",
            text: "Slides",
            children: [],
        });
    }

    if (meeting.data.project) {
        starlightRoute.toc.items.push({
            depth: 3,
            slug: "project-page",
            text: "Project Page",
            children: [],
        });
    }

    return next();
}