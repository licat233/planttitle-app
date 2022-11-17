// import { Route } from 'vue-router'

// fixRouterBug(Route);
// function fixRouterBug(Router){
// 	if(!Router){
// 		throw Error("VueRouter is ",Router)
// 	}
// 	// 解决编程式路由往同一地址跳转时会报错的情况
// 	const originalPush = Router.prototype.push;
// 	const originalReplace = Router.prototype.replace;

// 	// push
// 	Router.prototype.push = function push(location, onResolve, onReject) {
// 	  if (onResolve || onReject)
// 	    return originalPush.call(this, location, onResolve, onReject);
// 	  return originalPush.call(this, location).catch(err => err);
// 	};

// 	//replace
// 	Router.prototype.replace = function push(location, onResolve, onReject) {
// 	  if (onResolve || onReject)
// 	    return originalReplace.call(this, location, onResolve, onReject);
// 	  return originalReplace.call(this, location).catch(err => err);
// 	};
// }

import './.env.js'
import messages from "./i18n"

let i18nConfig = {
	locale: uni.getLocale(), // 获取已设置的语言
	messages
}

import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.prototype.i18n = i18n
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	...App
})
app.$mount()
// #endif

// Vue3
// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	createI18n,
} from 'vue-i18n'
export function createApp() {
	const app = createSSRApp(App)
	const i18n = createI18n(i18nConfig)
	app.use(i18n)
	return {
		app
	}
}
// #endif
