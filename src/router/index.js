import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import aaa from '@/components/aaa'
import bbb from '@/components/bbb'
import inputindex from '@/inputindex'

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
      ]
    }
  ]
})
