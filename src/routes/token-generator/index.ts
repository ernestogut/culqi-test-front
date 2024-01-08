import TokenGeneratorVue from "@/views/token-generator/TokenGenerator.vue";
import TokenGeneratorFinish from "@/views/token-generator/TokenGeneratorFinish.vue";
export default [
    {
        path: '/token-generator',
        name: 'token-generator',
        component: TokenGeneratorVue,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/token-generator/finish',
        name: 'token-generator-finish',
        component: TokenGeneratorFinish,
        meta: {
            requiresAuth: true,
        },
    },
];