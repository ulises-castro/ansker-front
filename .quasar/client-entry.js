/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 *
 * You are probably looking on adding initialization code.
 * Use "quasar new plugin <name>" and add it there.
 * One plugin per concern. Then reference the file(s) in quasar.conf.js > plugins:
 * plugins: ['file', ...] // do not add ".js" extension to it.
 **/



import 'quasar-extras/themify/themify.css'

import 'quasar-extras/ionicons-v4/ionicons-v4.css'

import 'quasar-extras/line-awesome/line-awesome.css'

import 'quasar-extras/material-icons/material-icons.css'




import 'quasar-app-styl'


import 'src/css/app.scss'


import Vue from 'vue'
import createApp from './app.js'














Vue.config.devtools = true
Vue.config.productionTip = false



console.info('[Quasar] Running SPA with MAT theme.')



const { app, store, router } = createApp()












new Vue(app)






