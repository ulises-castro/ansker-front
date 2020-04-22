// function lazyLoad(component) {
//   return () => import(`@/${component}.vue`)
// }

// TODO: Implemented a better way to performs lazyLoad of component
const routes = [{
    path: '/',
    name: 'Home',
    component: () => import('pages/Home/Index.vue')
  },
  {
    path: '/discover',
    name: 'Discover',
    meta: {
      requiresAuth: true,
    },
    component: () => import('pages/Discover/Index.vue')
  },
  // {
  //   path: '/Publish',
  //   name: 'Publish',
  //   meta: {
  //     requiresAuth: true,
  //   },
  //   component: () => import('pages/Publish/Index.vue')
  // },
  {
    path: '/settings',
    name: 'Settings',
    meta: {
      requiresAuth: true,
    },
    component: () => import('pages/Settings/Index.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      requiresAuth: true,
    },
    component: () => import('pages/Contact/Index.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('pages/Publish.vue')
  },
  {
    path: '/authenticate/google',
    name: 'AuthGoogle',
    component: () => import('pages/Authenticate/AuthGoogle.vue')
  },
  {
    path: '/authenticate/google/token',
    component: () => import('pages/Authenticate/AuthGoogle.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404')
  })
}

export default routes
