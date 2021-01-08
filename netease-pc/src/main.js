import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'

import * as getApi from '@apis/http'
import utils from '@utils/utils'


Vue.use(less)

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(less)


//设置请求和工具类相关
Vue.config.productionTip = false
Vue.prototype.$http = getApi
Vue.prototype.$utils = utils


new Vue({
  render: h => h(App),
}).$mount('#app')
