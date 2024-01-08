import CardInfo from '@/views/card/CardInfo.vue';

export default [
    {
        path: '/card-info',
        name: 'card-info',
        component: CardInfo,
        meta: {
            requiresAuth: true,
        }
    },
];