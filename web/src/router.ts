import { createWebHistory, createRouter } from 'vue-router'
import ColumnDetail from './views/ColumnDetail.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import CreatePost from './views/CreatePost.vue'
import store from './store'
import Signup from './views/Signup.vue'
import axios from 'axios'
const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
/**
 * 路由导航守卫
 *
 * to:即将到达的目标，
 * from：即将离开的路由,
 * next:放行
 * next(false) 不放行跟不加false状态一样
 */
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta

  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = token
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('/login')
      })
    }
  }
  if (requiredLogin && !user.isLogin) {
    next({ name: 'login' })
  } else if (redirectAlreadyLogin && user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
