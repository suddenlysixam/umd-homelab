export const routeMiddleware = {
    name: 'route-middleware',

    hooks: {
        'config:setup': ({ addRouteMiddleware }) => {
            addRouteMiddleware({
                entrypoint: '@config/plugins/middleware/guidesSortMiddleware.ts',
                order: 'post',
            });

            addRouteMiddleware({
                entrypoint: '@config/plugins/middleware/sidebarCleanupMiddleware.ts',
                order: 'post',
            });

            addRouteMiddleware({
                entrypoint: "@config/plugins/middleware/meetingHeadingsMiddleware.ts",
                order: "post",
            });
        },
    },
};