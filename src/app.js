

import jQuery from "jquery";
window.$ = jQuery;

import lodash from "lodash";
window._ = lodash;


import Vue from 'vue'
import App from './vue/App.vue'

// The components
import PersonList from './vue/components/PersonList.vue'
import ExpenseList from './vue/components/ExpenseList.vue'
import Results from './vue/components/Results.vue'


Vue.component('PersonList', PersonList);
Vue.component('ExpenseList', ExpenseList);
Vue.component('Results', Results);




new Vue({
	el: '#vue-app',
	render: h => h(App),
})



