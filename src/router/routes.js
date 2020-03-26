// function lazyLoad(component) {
//   return () => import(`@/${component}.vue`)
// }

// TODO: Implemented a better way to performs lazyLoad of component
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // }
  {
    path: '/',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/discover',
    component: () => import('pages/Discover/Index')
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
