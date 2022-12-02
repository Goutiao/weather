
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect:'/homelist'
    },{
        path: '/homelist',
        name: 'homelist',
        component: () => import('@/views/HomeListView.vue'),
        props:true
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        props:true
    },{
        path: '/city',
        name: 'city',
        component: () => import('@/views/CityView.vue'),
        props:true
        // meta: {
        //     keepAlive:true
        // }
    }, {
        path: '/geologation',
        component: () => import('@/views/GeologationView.vue'),
        props:true
        // meta: {
        //     keepAlive:false
        // }
    }, {
        path: '/weeks',
        name:'weeks',
        component: () => import('@/views/WeeksView.vue'),
        props:true
        // meta: {
        //     keepAlive:false
        // }
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router