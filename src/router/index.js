import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import aaa from '@/components/aaa'
import bbb from '@/components/bbb'
import ccc from '@/components/ccc'
import ddd from '@/components/ddd'
import eee from '@/components/eee'
import fff from '@/components/fff'
import ggg from '@/components/ggg'
import hhh from '@/components/hhh'
import iii from '@/components/iii'
import inputindex from '@/inputindex'
// import dashboard from '@/components/dashboard_yu.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: inputindex,
      redirect: '/HelloWorld',  //重定向到指定的子路由
      children: [
        {
          path: '/HelloWorld',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '/aaa',
          name: 'aaa',
          component: aaa
        },
        {
          path: '/bbb',
          name: 'bbb',
          component: bbb
        },
        {
          path: '/ccc',
          name: 'ccc',
          component: ccc
        },
        {
          path: '/ddd',
          name: 'ddd',
          component: ddd
        },
        {
          path: '/eee',
          name: 'eee',
          component: eee
        }, {
          path: '/fff',
          name: 'fff',
          component: fff
        }, {
          path: '/ggg',
          name: 'ggg',
          component: ggg
        },{
          path: '/hhh',
          name: 'hhh',
          component: hhh
        },{
          path: '/iii',
          name: 'iii',
          component: iii
        },
        // {
        //   path: '/dashboard',
        //   name: 'dashboard',
        //   component: dashboard
        // },
        
      ]
    }
  ]
})