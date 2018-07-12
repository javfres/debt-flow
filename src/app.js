

import jQuery from "jquery";
window.$ = jQuery;

import lodash from "lodash";
window._ = lodash;


import Vue from 'vue'
import App from './vue/App.vue'

// The components
import PersonList from './vue/components/PersonList.vue'
import ExpenseList from './vue/components/ExpenseList.vue'
import Info from './vue/components/Info.vue'
import Results from './vue/components/Results.vue'

// Modals
import ModalTemplate from './vue/components/ModalTemplate.vue'
import ModalNewPerson from './vue/components/ModalNewPerson.vue'


Vue.component('PersonList', PersonList);
Vue.component('ExpenseList', ExpenseList);
Vue.component('Info', Info);
Vue.component('Results', Results);
Vue.component('ModalTemplate', ModalTemplate);
Vue.component('ModalNewPerson', ModalNewPerson);




new Vue({
	el: '#vue-app',
	render: h => h(App),
})



