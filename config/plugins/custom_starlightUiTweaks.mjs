import starlightUiTweaks from 'starlight-ui-tweaks'
import { withBase } from '../basePath.mjs';

export const custom_starlightUiTweaks =
    starlightUiTweaks({
        navbarLinks: [
            { label: "Documentation", href: withBase("/guides") },
            { label: "Meetings", href: withBase("/meetings") },
        ],
        footer: {
            showSocialIcons: false,
            copyright: "Build I.T. Club. All rights reserved.",
            firstColumn: {
            title: "About Us",
            links: [
                // { label: "About", href: withBase("/about") },
                { label: "Meetings", href: withBase("/meetings") },
            ],
            },
            secondColumn: {
            title: "Resources",
            links: [
                { label: "Guides", href: withBase("/guides") },
                { label: "Reference", href: withBase("/reference") },
            ],
            },
            thirdColumn: {
            title: "Support",
            links: [
                { label: "Discord", href: withBase("/discord") },
            ],
            },
            fourthColumn: {
            title: "Contribute",
            links: [
                { label: "GitHub", href: withBase("/github") },
            ],
            },
        },
    });