import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {path:'/',redirect:'/index'},
    {path: '/index', name: 'index', component: resolve => { require(['@views/index/index.vue'], resolve) }}
]

const router = new VueRouter({
    mode: 'history',
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes
})

export default  router