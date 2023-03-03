// VUE
import { createApp } from 'vue/dist/vue.esm-bundler.js'
import titleComp from '../vue/welcome.vue'

import Perfil from '../vue/Perfil.vue';

import MyProfile from '../vue/MyProfile.vue';

const app = createApp({})

app.component('welcome', titleComp)

app.component('perfil', Perfil)

app.component('my-profile', MyProfile)

app.mount('#app')
// BREEZE
import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();
