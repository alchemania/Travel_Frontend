import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/index/index.vue')
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/index.vue'),
        children: [{
            path: "/ml",
            name: "ML",
            component: () => import('@/views/admin/ml/mlManage.vue')
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
