import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/coworkers/',
      name: 'Coworkers',
      component: () => import(/* webpackChunkName: "coworkers" */ "../pages/Coworkers")
    },
    {
      path: '/coworkers/:id',
      name: 'Coworker',
      component: () => import(/* webpackChunkName: "coworker" */ "../pages/Coworker")
    },
    {
      path: '/companies/',
      name: 'Companies',
      component: () => import(/* webpackChunkName: "companies" */ "../pages/Companies")
    },
    {
      path: '/companies/:id',
      name: 'Company',
      component: () => import(/* webpackChunkName: "company" */ "../pages/Company")
    },
    {
      path: '/articles/',
      name: 'Articles',
      component: () => import(/* webpackChunkName: "articles" */ "../pages/Articles")
    },
    {
      path: '/articles/:id',
      name: 'Article',
      component: () => import(/* webpackChunkName: "article" */ "../pages/Article")
    },
    {
      path: '/early-stage',
      name: 'EarlyStage',
      component: () => import(/* webpackChunkName: "early-stage" */ "../pages/EarlyStage")
    },
    {
      path: '/growth-stage',
      name: 'GrowthStage',
      component: () => import(/* webpackChunkName: "growth-stage" */ "../pages/GrowthStage")
    },
    {
      path: '/buy-out',
      name: 'BuyOut',
      component: () => import(/* webpackChunkName: "buy-out" */ "../pages/BuyOut")
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: () => import(/* webpackChunkName: "jobs" */ "../pages/Jobs")
    },
    {
      path: '/jobs/:id',
      name: 'Job',
      component: () => import(/* webpackChunkName: "job" */ "../pages/Job")
    },
    {
      path: '/disclosures',
      name: 'Publications',
      component: () => import(/* webpackChunkName: "publications" */ "../pages/Publications")
    },
    {
      path: '/legal',
      name: 'Legal',
      component: () => import(/* webpackChunkName: "legal" */ "../pages/Legal")
    }, 
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound', 
      beforeEnter() {
        window.location = '/'
      }
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})