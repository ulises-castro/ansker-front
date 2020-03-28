// import something here
import Vue from 'vue'
import Vant, {
  Icon,
  Popup,
  Image,
  Locale,
  Lazyload,
  Button,
  NavBar,
  Collapse,
  CollapseItem,
  ActionSheet
} from "vant"

import enUS from "vant/lib/locale/lang/en-US"
import 'vant/lib/index.css'

// "async" is optional
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Image)
Vue.use(Image)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(ActionSheet)
Vue.use(Lazyload, {})
Locale.use("en-US", enUS)
