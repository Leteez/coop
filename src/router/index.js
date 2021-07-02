import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signin',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/conversation/:id',
    name : 'Conversation',
    component: () => import('../views/Conversation.vue')
  },
  {
    path: '/member/:member_id',
    name : 'Member',
    component: () => import('../views/Member.vue')
  },
  {
    path: '/members',
    name : 'Members',
    component: () => import('../views/Members.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
