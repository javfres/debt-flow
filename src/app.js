

import jQuery from "jquery";
window.$ = jQuery;

import lodash from "lodash";
window._ = lodash;


import Vue from 'vue'
import App from './vue/App.vue'



new Vue({
	el: '#vue-app',
	render: h => h(App),
})



