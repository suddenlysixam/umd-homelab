import starlightAnnouncement from 'starlight-announcement'

const modules = import.meta.glob('../../src/announcements/*.mjs', {
  eager: true,
});

const now = new Date();

const announcements = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b)) // filename-based order
  .map(([, mod]) => mod.default)
  .filter((announcement) => {
    if (!announcement.startDate && !announcement.endDate) return true;
    
    const start = announcement.startDate ? new Date(announcement.startDate) : null;
    const end = announcement.endDate ? new Date(announcement.endDate) : null;
    
    if (start && now < start) return false;
    if (end && now > end) return false;
    
    return true;
  });

export const custom_starlightAnnouncement =
    starlightAnnouncement({
        enabled: true,
        displayMode: 'stack',
        announcements,
    });