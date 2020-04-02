// function lazyLoad(component) {
//   return () => import(`@/${component}.vue`)
// }

// TODO: Implemented a better way to performs lazyLoad of component
const routes = [{
    path: '/',
    component: () => import('pages/Home/Index.vue')
  },
  {
    path: '/discover',
    component: () => import('pages/Discover/Index.vue')
  },
  {
    path: '/authenticate/google',
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
