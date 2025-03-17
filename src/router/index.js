import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        pageTitle: 'Dashboard',
        title: 'Dashboard',
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/projects/Listing.vue'),
      meta: {
        pageTitle: 'Dashboard - Projects',
        title: 'Dashboard - Projects',
      },
    },
    {
      path: '/spaces',
      name: 'spaces',
      component: () => import('@/views/spaces/Listing.vue'),
      meta: {
        pageTitle: 'Dashboard - Spaces',
        title: 'Dashboard - Spaces',
      },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.pageTitle
  next()
})

export default router
