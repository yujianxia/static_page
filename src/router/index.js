import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import inputindex from '@/inputindex'
import dataModel from '@/components/dataModel'

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
        }, {
          path: '/dataModel',
          name: 'dataModel',
          component: dataModel
        },
      ]
    }
  ]
})
