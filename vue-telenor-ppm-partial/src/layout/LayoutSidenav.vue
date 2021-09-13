<template>
  <sidenav :orientation="orientation" :class="curClasses">

    <!-- Brand demo (see src/demo.css) -->

    <div class="app-brand demo" v-if="orientation !== 'horizontal'">
      <img src="../assets/img/pamacs_header.png" alt="pamacs" width="40">

      <div class="app-brand-text demo sidenav-text font-weight-normal ml-2">
        
        <router-link to="/" 
          class="sidenav-text font-weight-normal ml-2"
          >P  A  M  A  C  S 
          <span>
            <b-btn 
              style="color: white !important; margin-left: 0.5rem;"
              variant="outline-default icon-btn btn-sm borderless" 
              v-b-tooltip.hover title="Relogin to application"
              @click="refreshSession"
            ><i class="fas fa-sync-alt"></i></b-btn>
          </span>
        </router-link>
        <br>
        <!--span class="text-tiny font-weight-semibold opacity-25">admin</span-->
      </div>
      
      <a href="javascript:void(0)" class="layout-sidenav-toggle sidenav-link text-large ml-auto" @click="toggleSidenav()">
        <i class="ion ion-md-menu align-middle"></i>
      </a>
    </div>
    <div class="sidenav-divider mt-0" v-if="orientation !== 'horizontal'"></div>

    <!-- Inner -->
    <div class="sidenav-inner" :class="{ 'py-1': orientation !== 'horizontal' }">

      <sidenav-header class="small font-weight-semibold">MENU</sidenav-header>

      <sidenav-router-link icon="ion ion-ios-home" to="/" :exact="true">Home</sidenav-router-link>
      <sidenav-router-link icon="ion ion-ios-filing" to="/projects" :exact="true">Active Projects</sidenav-router-link>
      <sidenav-router-link icon="ion ion-ios-star-outline" to="/company-portfolio" :exact="true">Company Portfolio</sidenav-router-link>
      <sidenav-menu v-if="currentUser.resman || currentUser.timesheet" icon="ion ion-ios-timer" :active="isMenuActive('/time')" :open="isMenuOpen('/time')">
        <template slot="link-text">Time Management</template>
        <sidenav-router-link v-if="currentUser.resman" to="/time-management/resman/current" :exact="true">Time Planning</sidenav-router-link>
        <sidenav-router-link v-if="currentUser.timesheet" to="/time-management/timesheet/current" :exact="true">Timesheet</sidenav-router-link>
      </sidenav-menu>
<!--       <div class="sidenav-item"><a href="https://teams.microsoft.com/_#/files/General?threadId=19%3Ac8948da27b284a158b002387b5e90705%40thread.skype&ctx=channel&context=Template-ek&rootfolder=%252Fsites%252FORG-ITDevelopment-TnHU1%252FShared%2520Documents%252FGeneral%252FTemplate-ek" target="_blank" class="sidenav-link"><i class="sidenav-icon ion ion-ios-document"></i> <div>Templates</div> </a></div>-->      
      <sidenav-menu v-if="currentUser.report" icon="ion ion-ios-speedometer" :active="isMenuActive('/dashboard')" :open="isMenuOpen('/dashboard')">
        <template slot="link-text">Dashboard</template>
        <sidenav-router-link to="/dashboard/portfolio" :exact="true">Portfolio Management</sidenav-router-link>
        <sidenav-router-link to="/dashboard/quality-management" :exact="true">Quality Management</sidenav-router-link>
        <!--sidenav-router-link to="/dashboard/my-team" :exact="true">My team</sidenav-router-link-->
      </sidenav-menu>
      <sidenav-router-link v-if="currentUser.report" icon="ion ion-ios-funnel" to="/reports" :exact="true">Reports</sidenav-router-link>
      <!--sidenav-router-link icon="fab fa-medapps" to="/knowledge-center" :exact="true">Knowledge Center</sidenav-router-link-->
      <sidenav-menu icon="ion ion-md-build" :active="isMenuActive('/admin')" :open="isMenuOpen('/admin')" v-if="currentUser.role !== 'Pamacs_user'">
        <template slot="link-text">Admin</template>
        <sidenav-router-link to="/admin/new-project" :exact="true">New project</sidenav-router-link>
        <sidenav-router-link to="/admin/pending-projects" :exact="true">Pending Projects</sidenav-router-link>
        <sidenav-router-link v-if="currentUser.role === 'Pamacs_admin'" to="/admin/user-administration" :exact="true" >User administration</sidenav-router-link>
        <!--sidenav-router-link to="/admin/reports" :exact="true">Reports</sidenav-router-link-->
        <sidenav-router-link v-if="currentUser.role === 'Pamacs_admin'" to="/admin/parameters" :exact="true">Parameters</sidenav-router-link>
        <sidenav-router-link v-if="currentUser.role === 'Pamacs_admin'" to="/admin/control-panel" :exact="true">Control Panel</sidenav-router-link>
      </sidenav-menu>
    </div>  
  </sidenav>
</template>


<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'
import { mapState } from 'vuex'
import Vue from 'vue'
import IdleVue from 'idle-vue'

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 900000
})

export default {
  name: 'app-layout-sidenav',
  components: {
    Sidenav,
    SidenavLink,
    SidenavRouterLink,
    SidenavMenu,
    SidenavHeader,
    SidenavBlock,
    SidenavDivider
  },

  props: {
    orientation: {
      type: String,
      default: 'vertical'
    }
  },

  data: () => ({
    active: true
  }),

  onIdle () {
    this.active = false
    this.$swal({
        title: 'Your session has expired!',
        text: 'Please restart the application',
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Restart',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        this.$store.dispatch('removeSession');
    });
  },
  onActive () {
    this.active = true
  },

  computed: {
    ...mapState(['currentUser']),

    curClasses () {
      let bg = this.layoutSidenavBg

      if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
        bg = bg
          .replace(' sidenav-dark', '')
          .replace(' sidenav-light', '')
          .replace('-darker', '')
          .replace('-dark', '')
      }

      return `bg-${bg} ` + (
        this.orientation !== 'horizontal'
          ? 'layout-sidenav'
          : 'layout-sidenav-horizontal container-p-x flex-grow-0'
      )
    },
  },


  methods: {
    isMenuActive (url) {
      return this.$route.path.indexOf(url) === 0
    },

    isMenuOpen (url) {
      return this.$route.path.indexOf(url) === 0 && this.orientation !== 'horizontal'
    },

    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },

    refreshSession() {
      this.$store.dispatch('removeSession');
    }
  },

  mounted() {
    this.$store.dispatch('getCurrentUser');
  }
}
</script>


<style>
</style>
