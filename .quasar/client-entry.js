/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding startup/initialization code.
 * Use "quasar new boot <name>" and add it there.
 * One boot file per concern. Then reference the file(s) in quasar.conf.js > boot:
 * boot: ['file', ...] // do not add ".js" extension to it.
 *
 * Boot files are your "main.js"
 **/



import '@quasar/extras/themify/themify.css'

import '@quasar/extras/ionicons-v4/ionicons-v4.css'

import '@quasar/extras/line-awesome/line-awesome.css'

import '@quasar/extras/material-icons/material-icons.css'

import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'




// We load Quasar stylesheet file
import 'quasar/dist/quasar.sass'




import 'src/css/app.scss'


import Vue from 'vue'
import createApp from './app.js'


import 'app/src-pwa/register-service-worker.js'



import qboot_Booti18n from 'boot/i18n'

import qboot_Bootaxios from 'boot/axios'

import qboot_Bootvant from 'boot/vant'

import qboot_Bootcomponents from 'boot/components'







Vue.config.devtools = true
Vue.config.productionTip = false



console.info('[Quasar] Running PWA.')
console.info('[Quasar] Forcing PWA into the network-first approach to not break Hot Module Replacement while developing.')



// Needed only for iOS PWAs
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && window.navigator.standalone) {
  import(/* webpackChunkName: "fastclick"  */ '@quasar/fastclick')
}


async function start () {
  const { app, store, router } = await createApp()

  

  
  let routeUnchanged = true
  const redirect = url => {
    routeUnchanged = false
    window.location.href = url
  }

  const urlPath = window.location.href.replace(window.location.origin, '')
  const bootFiles = [qboot_Booti18n,qboot_Bootaxios,qboot_Bootvant,qboot_Bootcomponents]

  for (let i = 0; routeUnchanged === true && i < bootFiles.length; i++) {
    if (typeof bootFiles[i] !== 'function') {
      continue
    }

    try {
      await bootFiles[i]({
        app,
        router,
        store,
        Vue,
        ssrContext: null,
        redirect,
        urlPath
      })
    }
    catch (err) {
      if (err && err.url) {
        window.location.href = err.url
        return
      }

      console.error('[Quasar] boot error:', err)
      return
    }
  }

  if (routeUnchanged === false) {
    return
  }
  

  

    

    

    
      new Vue(app)
    

    

    

  

}

start()
