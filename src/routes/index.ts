import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

//  Layouts
import defaultLayout from '@/layouts/default.vue'
import authenticatedLayout from '@/layouts/authenticated.vue'

//  Pages
import Home from '@/pages/Home.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import _RoomId from '@/pages/_RoomId.vue'
import Invite_RoomId from '@/pages/invite/Invite_RoomId.vue'

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
      },
      {
        path: ':roomId',
        component: _RoomId,
        meta: { title: '대기방' }
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
  },
  {
    path: '/invite',
    name: '초대',
    component: defaultLayout,
    meta: { title: '초대' },
    children: [
      {
        path: ':roomId',
        component: Invite_RoomId,
        meta: { title: '초대' }
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
