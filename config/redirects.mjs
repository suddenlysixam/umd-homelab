import { withBase } from './basePath.mjs';
import { github_link, discord_link, linkedin_link, terplink_link } from './social.mjs';

export const custom_redirects = {
    '/github': github_link,
    '/discord': discord_link,
    '/linkedin': linkedin_link,
    '/terplink': terplink_link,
    '/next': withBase('/meetings/'),
};