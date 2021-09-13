<template>
    <div id="home">
      <div>
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light"> 
            Welcome, </span>{{currentUser.name}} <span class="wave">👋</span>
        </h4>
        <hr class="border-light container-m--x my-4">
      </div>
    <div v-if="currentUser.position !== 'Guest'" class="row" id="header-panel">
        <div class="col-sm-6 col-xl-3">

            <b-card class="card-rounded mb-4 shadow">
            <div class="d-flex align-items-center">
                <div class="lnr lnr-tag display-4 text-success"></div>
                <div class="ml-3">
                <div class="text-muted small">PAMACS group</div>
                <div v-if="currentUser.role === 'Pamacs_admin'" class="text-medium">Admin</div>
                <div v-if="currentUser.role === 'Pamacs_portfolio'" class="text-medium">Portfolio Manager</div>
                <div v-if="currentUser.role === 'Pamacs_user'" class="text-medium">User</div>
                </div>
            </div>
            </b-card>

        </div>
        <div class="col-sm-6 col-xl-3">

            <b-card class="card-rounded mb-4 shadow">
            <div class="d-flex align-items-center">
                <div class="lnr lnr-history display-4 text-info"></div>
                <div class="ml-3">
                <div class="text-muted small">Last login</div>
                <div class="text-medium">{{currentUser.loginTime | dateFormatter}}</div>
                </div>
            </div>
            </b-card>

        </div>
        <div class="col-sm-6 col-xl-3">

            <b-card class="card-rounded mb-4 shadow">
            <div class="d-flex align-items-center">
                <div class="lnr lnr-layers display-4 text-danger"></div>
                <div class="ml-3">
                <div class="text-muted small">Your portfolios</div>
                <div v-if="currentUser.role==='Pamacs_admin'" class="text-medium">All</div>
                <div v-else-if="!currentUser.portfolios || currentUser.portfolios.length === 0" class="text-medium">None</div>
                <div v-else-if="currentUser.portfolios">{{currentUser.portfolios.join(", ")}}</div>
                </div>
            </div>
            </b-card>

        </div>
        <div class="col-sm-6 col-xl-3">

            <b-card class="card-rounded mb-4 shadow">
            <div class="d-flex align-items-center">
                <div class="lnr lnr-chart-bars display-4 text-warning"></div>
                <div class="ml-3">
                <div v-if="tabIndex===0" class="text-muted small">Projects you are working on</div>
                <div v-if="tabIndex===1" class="text-muted small">Your projects</div>
                <div class="text-medium">{{projectNumber}}</div>
                </div>
            </div>
            </b-card>

        </div>
    </div>

    <div v-else>
        <center>
            <b-alert show dismissible variant="danger">
                You are not registered in the PAMACS database, please alert the admins!
            </b-alert>
        </center>
    </div>

      <div>
          <div class="row">
            <div class="col-md-6 col-lg-6 col-sm-12">
                <b-card no-body class="d-flex w-100 mb-4">
                    <b-card-header header-tag="h6" class="with-elements">
                        <div class="card-header-title">
                           <span class="lnr lnr-sort-alpha-asc"></span> New projects
                        </div>
                    </b-card-header>
                    <projects-list 
                        :statuses="statuses"
                        :fields="fields"
                        :pagination="pagination"
                        :limit="limit"
                        :search="search"
                        :tableFields="lastTenTableFields"
                        >
                    </projects-list>
                </b-card>
            </div>
            <div class="col-md-6 col-lg-6 col-sm-12">
                <b-card no-body class="mb-4">
                     <b-tabs pills card content-class="mt-3" v-model="tabIndex">
                        <b-tab active>
                            <template v-slot:title>
                                <span class="lnr lnr-clock"></span> Weekly plan
                            </template>
                            
                            <weekly-plan></weekly-plan>
                        </b-tab>
                        
                        <b-tab>
                            <template v-slot:title>
                                <span class="lnr lnr-user"></span> Your projects
                            </template>
                            
                            <my-projects></my-projects>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import ProjectsList from './ProjectsList.vue';
import WeeklyPlan from './home/WeeklyPlan.vue';
import MyProjects from './home/MyProjects.vue';

export default {
    data() {
        return {
            statuses: ['Active', 'Suspended'],
            fields: 'projectId name pm.name phase type',
            search: false,
            pagination: false,
			limit: 10,
            lastTenTableFields: {
                projectId: {
                    label: 'ID'
                },
                name: {
                    label: 'Name'
                },
                'pm.name': {
                    label: 'Responsible'
                },
                phase: {
                    label: 'Phase'
                }
            },
            tabIndex: 0
        }
    },

    components: {
        'projects-list': ProjectsList,
        'weekly-plan': WeeklyPlan,
        'my-projects': MyProjects
    },

    computed: {
        ...mapState(['projects', 'myProjects', 'weekData', 'currentUser']),

        projectNumber() {
            if (this.tabIndex === 0) {
                return this.weekData.length;
            } else if (this.tabIndex === 1) {
                return this.myProjects.length;
            } else {
                return 0;
            }
            
        }
    },

    filters: {
        dateFormatter: function(date) {
            if (date) {
                return moment(date).format('MMMM DD - HH:mm');
            } else {
                return 'Unknown'
            }
        }
    }
}

</script>

<style scoped>

img {
  border-radius: 50%;
}

span.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
    0% { transform: rotate(  0.0deg) }
   10% { transform: rotate(-10.0deg) }
   20% { transform: rotate( 12.0deg) }
   30% { transform: rotate(-10.0deg) }
   40% { transform: rotate(  9.0deg) }
   50% { transform: rotate(  0.0deg) }
  100% { transform: rotate(  0.0deg) }
}

</style>