// import something here
import Vue from 'vue'
import Vant, {
  Image,
  Locale,
  Lazyload,
  Button,
  Collapse,
  CollapseItem,
  ActionSheet
} from "vant";

import enUS from "vant/lib/locale/lang/en-US";
import 'vant/lib/index.css';

// "async" is optional
Vue.use(Image);
Vue.use(Button);
Vue.use(ActionSheet);
Vue.use(Lazyload, {});
Locale.use("en-US", enUS);

export default async ({
  /* app, router, Vue, ... */
}) => {
  // something to do
}
