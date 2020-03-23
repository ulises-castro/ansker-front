
const get = (folder, component) => import(`${folder}/${component}.vue`)

const loadPage = (page) => {
  return get('pages', page)
}

const loadLayout = (layout) => {
  return get('layout', layout)
}

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
    component: loadPage('Index')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
