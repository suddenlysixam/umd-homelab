export const custom_sidebarCleanup = {
    name: 'custom-sidebar-cleanup',

    hooks: {
        'config:setup': ({ addRouteMiddleware }) => {
            addRouteMiddleware({
                entrypoint: './config/plugins/sidebarCleanupMiddleware.ts',
                order: 'post',
            });
        },
    },
};