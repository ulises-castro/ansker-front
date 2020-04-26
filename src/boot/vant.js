// import something here
import Vue from 'vue'
import Vant, {
  Icon,
  Popup,
  Image,
  Field,
  Locale,
  Slider,
  Picker,
  Search,
  Button,
  NavBar,
  Notify,
  Loading,
  Lazyload,
  Tabbar,
  Skeleton,
  Cell,
  CellGroup,
  TabbarItem,
  Collapse,
  CollapseItem,
  ActionSheet,
  ShareSheet,
  Sticky,
} from "vant"


import enUS from "vant/lib/locale/lang/en-US"
import 'vant/lib/index.css'

// "async" is optional
Vue.use(Cell)
Vue.use(Icon)
Vue.use(Popup)
Vue.use(Image)
Vue.use(Image)
Vue.use(Field)
Vue.use(Slider)
Vue.use(Picker)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Search)
Vue.use(Tabbar)
Vue.use(ShareSheet)
Vue.use(Sticky)
Vue.use(Notify)
Vue.use(Loading)
Vue.use(Skeleton)
Vue.use(CellGroup)
Vue.use(TabbarItem)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(ActionSheet)
Vue.use(Lazyload, {})
Locale.use("en-US", enUS)
