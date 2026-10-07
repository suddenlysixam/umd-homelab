export const routeMiddleware = {
    name: 'route-middleware',

    hooks: {
        'config:setup': ({ addRouteMiddleware }) => {
            addRouteMiddleware({
                entrypoint: './config/plugins/middleware/sidebarCleanupMiddleware.ts',
                order: 'post',
            });
        },
    },
};