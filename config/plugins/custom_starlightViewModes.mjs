import starlightViewModes from "starlight-view-modes";

export const custom_starlightViewModes = starlightViewModes({
    zenModeSettings: {
        enabled: false
    },
    presentationModeSettings: {
        enabled: true,
        // exclude: ["about/**/*", "authors/**/*", "meetings/**/*", "tags/**/*", "docs/**/*"],
        exclude: ["!(guides/**/*|reference/**/*)"],
        splitHeadingLevel: 4
    }
});