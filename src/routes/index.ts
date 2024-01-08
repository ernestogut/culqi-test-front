import AuthenticationRoutes from "./authentication";
import CardRoutes from "./card";
import TokenGeneratorRoutes from "./token-generator";
import Layout from "../layout/Layout.vue";
export default [
    {
        path: '/',
        name: 'home',
        redirect: { name: 'token-generator' },
        component: Layout,
        children: [
            ...TokenGeneratorRoutes,
            ...CardRoutes,
        ],
        meta: {
            requiresAuth: true,
        },
    },
    ...AuthenticationRoutes,
]