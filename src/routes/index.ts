import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

//  Layouts
import defaultLayout from '@/layouts/default.vue'
import authenticatedLayout from '@/layouts/authenticated.vue'

//  Pages
import Home from '@/pages/Home.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: authenticatedLayout,
    children: [
      {
        path: '',
        component: Home,
        meta: { title: '홈' }
      },
      {
        path: 'Register',
        component: Register,
        meta: { title: '회원가입' }
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
        meta: { title: '로그인' }
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
