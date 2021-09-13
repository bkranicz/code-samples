<template>
  <b-navbar toggleable="lg" class="layout-navbar align-items-lg-center container-p-x bg-white">
    <b-navbar-brand to="/" class="app-brand demo d-lg-none py-0 mr-4">
      <img src="../assets/img/pamacs_header_invert.png" alt="pamacs" width="40">
      <span class="app-brand-text demo font-weight-normal ml-2">PAMACS</span>
    </b-navbar-brand>

    <!-- Navbar toggle -->
    <b-navbar-toggle target="app-layout-navbar"></b-navbar-toggle>
    <ul class="navbar-nav layout-sidenav-toggle d-lg-none align-items-lg-center mr-auto">
      <a href="javascript:void(0)" class="nav-item nav-link px-0 mr-lg-4" @click="toggleSidenav()">
        <i class="ion ion-md-menu text-large align-middle"></i>
      </a>
    </ul>
    <b-collapse is-nav id="app-layout-navbar">
      <b-navbar-nav class="align-items-lg-center">
        <!-- Search -->
        <b-input-group >
            <input type="text" 
              v-model="searchText"
              class="form-control" 
              placeholder="Search for projects..." 
              v-on:keyup.enter="searchProjects"
            >
            <b-btn 
              variant="outline-default" 
              @click="searchProjects" 
              slot="append"
              v-b-tooltip.hover title="Search for projects">
              <i style="color: black" class="ion ion-ios-search navbar-icon align-middle"></i>
            </b-btn>
            <!--template slot="button-content"><i style="color: black" class="ion ion-ios-search navbar-icon align-middle"></i></template-->
            <!--b-dd split :right="!isRTL" slot="append" variant="outline-default" no-caret @click="searchProjects">
                <b-dropdown-header>Project status:</b-dropdown-header>
                <b-form >
                  <b-form-radio-group
                    style="padding: 10px;"
                    v-model="status"
                    :options="statuses"
                    stacked
                  ></b-form-radio-group>
                </b-form>
              </b-dd-->
        </b-input-group>
      </b-navbar-nav>

       <b-navbar-nav :right="!isRTL" class="align-items-lg-center ml-auto">
        <div class="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div>
        <span @mouseover="mouseOver" @mouseleave="mouseleave">
          <div v-if="show"><b>P</b>roject <b>A</b>dministration <b>M</b>anagement <b>A</b>nd <b>C</b>ontrolling <b>S</b>ystem</div>
          <div v-else>P  A  M  A  C  S</div>
        </span>
       </b-navbar-nav>
      
    </b-collapse>

  </b-navbar>

</template>

<script>
export default {
  name: 'app-layout-navbar',
  data() {
    return {
      isChrome: true,
      searchText: '',
      status: 'active',
      statuses: [{ text: 'Active', value: 'active' }, { text: 'Completed', value: 'closed' }],
      show: false
    }
  },

  computed: {
    statusList() {
      if (this.status === 'active') {
        return ['Active', 'Suspended']
      } else {
        return ['Completed', 'Deleted']
      }
    }
  },

  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },
    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },
    mouseOver: function(){
        this.show = !this.show;   
    },
    mouseleave: function() {
      this.show = !this.show;
    },
    searchProjects() {   
      if (this.searchText.length > 1) {
        this.$store.dispatch('loadProjects', {
            searchText: this.searchText,
            fields: '_id projectId name description pm.name status phase type complexity',
            statuses: ['Active', 'Suspended', 'Completed', 'Deleted']
        });
        this.$router.push({ path: '/project-search', query: { search: this.searchText }})
      }
    }
  },

  mounted() {
    if (!this.$browserDetect.isChrome) {
      this.$store.dispatch('sendWarning', {
        "title": "Your browser is not supported!",
        "text": "Please use Google Chrome instead"
        })
    }
  }
}
</script>

<style>
.layout-navbar {
  height: 66px;
}

#searchProject .b-dropdown {
  padding: 0;
  border: none;
  background: none;
}


</style>
