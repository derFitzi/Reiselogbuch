import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import TravelEntries from './views/TravelEntries.vue';
import Statistics from './views/Statistics.vue';

const routes = [
    { 
        path: '/', 
        component: Home,
        props: true  // Aktiviere die Weitergabe von Props
    },
    { 
        path: '/entries', 
        component: TravelEntries,
        props: true  // Aktiviere die Weitergabe von Props
    },
    { 
        path: '/statistics', 
        component: Statistics,
        props: true  // Aktiviere die Weitergabe von Props
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;