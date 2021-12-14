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
import { useAuthStore } from '@/store/auth'
import useStorage from '@/hooks/useStorage'
import { useLoading } from '@/store/useLoading'
import { onBeforeMount } from 'vue'
import { Provider } from '@/types/auth'
import { storeToRefs } from 'pinia'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Authenticated',
    component: authenticatedLayout,
    children: [
      {
        name: 'Home',
        path: '',
        component: Home,
        meta: { title: '홈' }
      },
      {
        name: 'Register',
        path: 'Register',
        component: Register,
        meta: { title: '회원가입' }
      },
      {
        name: 'Room',
        path: ':roomId',
        component: _RoomId,
        meta: { title: '대기방' }
      }
    ],
    async beforeEnter (before, after, next) {
      const { isAuthenticated } = storeToRefs(useAuthStore())
      const { localStorage } = useStorage()

      if (isAuthenticated.value) {
        next()
        return
      }

      let success = false
      try {
        const providedBy = localStorage.getItem<Provider>('provider')
        if (providedBy === 'Google' || providedBy === 'Github') {
          success = await useAuthStore().getPersistenceFirebaseUser(providedBy)
        }

        if (!success) {
          next('/auth/login')
        }
      } catch {
        next('/auth/login')
      }

      next()
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: defaultLayout,
    children: [
      {
        name: 'Login',
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
        name: 'Invite',
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
  }
})
