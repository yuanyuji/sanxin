import Vue from 'vue'
import Router from 'vue-router'
import { getCookie, setCookie} from '../utils/cookies.js'
import HelloWorld from '../views/HelloWorld.vue'
import Publics from '../views/helloworld_main/public.vue'
import Grid from '../views/helloworld_main/grid.vue'
import Entry from '../views/helloworld_main/entry.vue'

import Info from '../views/helloworld_main_public_activity/info.vue'
import entryInfo from '../views/helloworld_main_entry_entryActivity/entryInfo.vue'

import Action from '../views/helloworld_main_public_activity/action.vue'
import entryAction from '../views/helloworld_main_entry_entryActivity/entryAction.vue'

import Activity from '../components/helloworld_main_public/activity.vue'
import entryActivity from '../components/helloworld_main_entry/entryActivity.vue'

import Unload from '../views/Login.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'admin/menu/publics'
    },
    {
      path: '/admin',
      name: 'admin',
      component: HelloWorld,
      children: [
        {
          path: '/admin/menu/publics',
          name: 'publics',
          redirect: '/admin/menu/publics/info',          
          component: Publics,
          children: [
            {
              path: 'info',
              name: 'info',
              component: Info           
            },
            {
              path: 'action',
              name: 'action',
              component: Action
            }
          ]
        },
        {
          path: '/admin/menu/grid',
          name: 'grid',
          component: Grid
        },
        {
          path: '/admin/menu/entry',
          name: 'entry',
          redirect: '/admin/menu/entry/entryInfo',
          component: Entry,
          children: [
            {
              path: 'entryInfo',
              name: 'entryInfo',
              component: entryInfo           
            },
            {
              path: 'entryAction',
              name: 'entryAction',
              component: entryAction
            }
          ]
        },
        {
          path:'activity/:id',
          name:'activity',
          component: Activity
        },
        {
          path: 'entryActivity/:id',
          name: 'entryActivity',
          component: entryActivity
        }
      ]
    },
    {
      path: '/unload',
      name: 'unload',
      component: Unload
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == 'unload') {
    next()
  }else {
    if (getCookie('token')) {
      next()
    }else{
      next('/unload')
    }
  }
})

export default router