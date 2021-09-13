import Vue from 'vue';
import VueRouter from 'vue-router'
import { store } from '../store/store';

import home from '../components/Home.vue';
import activeProjects from '../components/ActiveProjects.vue';
import companyPortfolio from '../components/CompanyPortfolio.vue';
import project from '../components/Project.vue';
import addProject from '../components/ProjectAdd.vue';
import pendingProjects from '../components/PendingProjects.vue';
import searchResult from '../components/SearchResult.vue';
import resMan from '../components/ResMan.vue';
import timeSheet from '../components/TimeSheet.vue';
import timeManagement from '../components/TimeManagement.vue';
import dashboard from '../components/Dashboard.vue';
import qualityDashboard from '../components/QualityDashboard';
import reports from '../components/Reports.vue';
import userAdministration from '../components/UserAdministration.vue';
import knowledgeCenter from '../components/KnowledgeCenter';
import parameters from '../components/Parameters.vue';
import controlPanel from '../components/ControlPanel.vue';
import notFound from '../components/404.vue';
import templates from '../components/Templates.vue';
import notAllowed from '../components/NotAllowed';
import faq from '../components/Faq';

Vue.use(VueRouter)

export const router = new VueRouter({
     routes: [
        { 
            path: '/', 
            component: home
        },
        { 
            path: '/project/:id', 
            component: project
        },
        { 
            path: '/projects', 
            component: activeProjects
        },
        {
            path: '/company-portfolio',
            component: companyPortfolio
        },
        {
            path: '/dashboard/portfolio',
            component: dashboard
        },
        {
            path: '/dashboard/quality-management',
            component: qualityDashboard
        },
        { 
            path: '/reports', 
            component: reports
        },
        { 
            path: '/knowledge-center', 
            component: knowledgeCenter
        },
        { 
            path: '/admin/pending-projects', 
            component: pendingProjects,
            meta: { requiresAdmin: true }
        },
        { 
            path: '/admin/new-project', 
            component: addProject,
            meta: { requiresPortfolio: true }
        },
        { 
            path: '/admin/user-administration', 
            component: userAdministration,
            meta: { requiresAdmin: true }
        },
        { 
            path: '/admin/parameters', 
            component: parameters,
            meta: { requiresAdmin: true }
        },
        { 
            path: '/admin/control-panel', 
            component: controlPanel,
            meta: { requiresAdmin: true }
        },
        { 
            path: '/time/resman', 
            component: resMan
        },
        { 
            path: '/time/timesheet/:month', 
            component: timeSheet
        },
        {
            path: '/time-management/:schema/:month',
            component: timeManagement
        },
        { 
            path: '/project-search', 
            component: searchResult
        },
        {
            path: '/faq',
            component: faq
        },
        { 
            path: '/not-allowed', 
            component: notAllowed
        },
        {
            path: '/templates',
            component: templates
        },
        { 
            path: '*', 
            component: notFound 
        }  
    ] 
})

// Check if user is admin or pm if necessary
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (store.state.currentUser.role === 'Pamacs_admin') {
            next();
        } else {
            next({ path: '/' });
        }
    } else if (to.matched.some(record => record.meta.requiresPortfolio)) {
        if (store.state.currentUser.role === 'Pamacs_admin' || store.state.currentUser.role === 'Pamacs_portfolio') {
            next();
        } else {
            next({ path: '/' });
        }
    } else {
      next() 
    }
})