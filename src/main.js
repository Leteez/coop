import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import milligram from 'milligram'
import md5 from 'crypto-js/md5'

window.md5 = md5;
window.api = axios.create({
	baseURL: 'https://allweb.fun/coop/api/',
	headers: { Authorization: '5126d789b71406f4db88a9300f1a08c329ea90b7' }
});

Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false

new Vue({
	beforeCreate() {
		api.interceptors.request.use(config => {
			console.log(config.url);
			if(this.$store.state.token) {
				config.url+='?token='+this.$store.state.token
			}
			return config;
		})
	},
	router,
	store,
	render: h => h(App)
}).$mount('#app')
