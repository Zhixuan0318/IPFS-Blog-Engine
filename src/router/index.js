import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/Home'),
  },
  {
    path: '/render-machine',
    component: () => import('@/views/render-machine/index'),
  },
  {
    path: '/blog/:id',
    component: () => import('@/views/blog/index'),
  },
]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
