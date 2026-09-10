import starlightAnnouncement from 'starlight-announcement'

const modules = import.meta.glob('../../src/announcements/*.mjs', {
  eager: true,
});

const announcements = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b)) // filename-based order
  .map(([, mod]) => mod.default);

export const custom_starlightAnnouncement =
    starlightAnnouncement({
        enabled: true,
        displayMode: 'stack',
        announcements,
    });