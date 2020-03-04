import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main' },
    component: () => import ("./../views/Home.vue")
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty' },
    component: () => import ("./../views/Login.vue")
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main' },
    component: () => import ("./../views/Categories.vue")
  },
  {
    path: '/detail-record',
    name: 'Detail-record',
    meta: { layout: 'main' },
    component: () => import ("./../views/Detail-record.vue")
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main' },
    component: () => import ("./../views/History.vue")
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main' },
    component: () => import ("./../views/Planning.vue")
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main' },
    component: () => import ("./../views/Profile.vue")
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main' },
    component: () => import ("./../views/Record.vue")
  },
  {
    path: '/detail-record',
    name: 'Detail-record',
    meta: { layout: 'main' },
    component: () => import ("./../views/Detail-record.vue")
  },
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty' },
    component: () => import ("./../views/Register.vue")
  }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
