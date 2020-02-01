import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'home',
    component: Home,
    meta: { d: true },
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/About.vue'),
    children: [
      { path: '/title', name: '创建菜单名', component: () => import('../views/children/title.vue') },
      { path: '/titlelist', name: '菜单列表', component: () => import('../views/children/titlelist.vue') },
      { path: '/menus', name: '创建名称', component: () => import('../views/children/menus.vue') },
      { path: '/menulist', name: '创建列表', component: () => import('../views/children/menulist.vue') },
      { path: '/baner', name: '创建思维导图', component: () => import('../views/children/baner.vue') },
      { path: '/note', name: '创建笔记', component: () => import('../views/children/note.vue') },
      { path: '/notelist', name: '笔记列表', component: () => import('../views/children/notelist.vue') }


    ]
  },
  {
    path: '*',
    component: () => import('../views/About.vue'),
    
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.d && !localStorage.token) {
    router.push('/login')
  } else {
    nprogress.start()
    next()
  }
})
router.afterEach(() => {
  nprogress.done()
})

export default router
