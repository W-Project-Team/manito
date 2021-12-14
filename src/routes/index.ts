import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

//  Layouts
import defaultLayout from '@/layouts/default.vue'

//  Pages
import Home from '@/pages/Home.vue'
import Login from '@/pages/auth/Login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: defaultLayout,
    children: [
      {
        path: '',
        component: Home,
        meta: { title: 'Home' }
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: defaultLayout,
    children: [
      {
        path: 'Login',
        component: Login,
        meta: { title: 'Login' }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})
