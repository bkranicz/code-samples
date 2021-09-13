<template>
    <div id="home">
      <div id="header" v-observe-visibility="visibilityChanged">
      <div class="row d-flex justify-content-between" >
        <div>
          <a href="javascript:void(0)" @click="showPrevious()">
            <i class="lnr lnr-arrow-left"></i> Previous
          </a>
        </div>
        <div>
          <a href="javascript:void(0)" @click="showNext()">
            Next <i class="lnr lnr-arrow-right"></i>
          </a>   
        </div>
      </div>
      <br>
      <h5><i class="fas fa-cogs"></i> Configurator</h5>
      <div class="row" v-if="parameters">
        <div class="demo-inline-spacing">
          <multiselect 
              placeholder="Select groups" 
              selectLabel=""
              deselectLabel=""
              selectGroupLabel=""
              deselectGroupLabel=""
              tagPlaceholder=""
              v-model="groups" 
              :options="groupOptions"
              :limit="3"
              group-label="label"
              group-values="options"
              :group-select="true"
              :multiple="true" 
              :taggable="true" 
              @tag="addTag"
              id="groups"
              class="multiselect-primary" 
            >
          </multiselect>
        </div>

        &nbsp; &nbsp;

        <div class="demo-inline-spacing">
          <multiselect 
              placeholder="Select positions" 
              selectLabel=""
              deselectLabel=""
              selectGroupLabel=""
              deselectGroupLabel=""
              tagPlaceholder=""
              :options="positionOptions"
              :limit="3"
              group-label="label"
              group-values="options"
              :group-select="true"
              v-model="positions" 
              :multiple="true" 
              :taggable="true" 
              @tag="addTag"
              id="positions"
              class="multiselect-primary" 
            >
          </multiselect>
        </div>

        &nbsp; &nbsp;

        <div class="demo-inline-spacing">
          <b-form-input type="week" v-model="week">
          </b-form-input>
        </div>

        &nbsp; &nbsp;

        <div class="demo-inline-spacing">
          <multiselect 
              placeholder="Primary data" 
              selectLabel=""
              deselectLabel=""
              v-model="planOrActual" 
              :options="['Plan', 'Actual']"
              :preselect-first="true"
              :multiple="false" 
              :taggable="false" 
              :allow-empty="false"
              class="multiselect-primary" 
            >
          </multiselect>
        </div>

         &nbsp; &nbsp;

        <div class="demo-inline-spacing">
          <button 
            class="btn btn-primary"
            @click="updateData">
            <i class="fas fa-sync-alt"></i> Filter
          </button>
        </div>
      </div>
      </div>

      <div v-if="!isVisible" class="container-m--x fixedElement shadow bg-white rounded">
        <div class="row container-p-x py-3">
          <div class="demo-inline-spacing d-inline-flex p-2 mr-2">

            <a href="javascript:void(0)" @click="showPrevious()">
              <i class="lnr lnr-arrow-left" style="color: black;"></i> 
            </a>

            <div>{{week}}</div>

            <a href="javascript:void(0)" @click="showNext()">
               <i class="lnr lnr-arrow-right" style="color: black;"></i>
            </a> 
          </div>

          <div class="demo-inline-spacing mr-2">
            <multiselect 
                placeholder="Select groups" 
                selectLabel=""
                deselectLabel=""
                selectGroupLabel=""
                deselectGroupLabel=""
                v-model="groups" 
                :options="groupOptions"
                :limit="3"
                group-label="label"
                group-values="options"
                :group-select="true"
                :multiple="true" 
                :taggable="true" 
                class="multiselect-primary" 
              >
            </multiselect>
          </div>

          <div class="demo-inline-spacing  mr-2">
            <multiselect 
                placeholder="Select positions" 
                selectLabel=""
                deselectLabel=""
                selectGroupLabel=""
                deselectGroupLabel=""
                :options="positionOptions"
                :limit="3"
                group-label="label"
                group-values="options"
                :group-select="true"
                v-model="positions" 
                :multiple="true" 
                :taggable="true" 
                class="multiselect-primary borderless" 
              >
            </multiselect>
          </div>

          <div class="demo-inline-spacing mr-2">
            <multiselect 
                placeholder="Primary data" 
                selectLabel=""
                deselectLabel=""
                v-model="planOrActual" 
                :options="['Plan', 'Actual']"
                :preselect-first="true"
                :multiple="false" 
                :taggable="false" 
                :allow-empty="false"
                class="multiselect-primary" 
              >
            </multiselect>
          </div>

          <div class="demo-inline-spacing">
            <button 
              class="btn btn-primary"
              @click="updateData">
              <i class="fas fa-sync-alt"></i> Filter
            </button>
          </div>

        </div>
      </div>


      <hr class="border-light container-m--x my-4">

      <div class="row d-flex align-items-center">
        <div class="col-12 ">
          <!-- Stats + Links -->
          <b-card no-body class="d-flex w-100 mb-4">
            <div class="row no-gutters row-bordered h-100">
              <div class="d-flex col-md-3 col-sm-12 align-items-center">

                <a href="javascript:void(0)" class="card-body media align-items-center text-body">
                  <i class="lnr lnr-users display-4 d-block text-primary"></i>
                  <span class="media-body d-block ml-3">
                    <span class="text-big font-weight-bolder">{{ sumStats.activePeopleNumber }}/{{ maxNumber }}</span> Active users<br>
                    <small class="text-muted">In this week</small>
                  </span>
                </a>

              </div>
              <div class="d-flex col-md-3 col-sm-12 align-items-center">

                <a href="javascript:void(0)" class="card-body media align-items-center text-body">
                  <i class="lnr lnr-chart-bars display-4 d-block text-primary"></i>
                  <span class="media-body d-block ml-3">
                    <span class="text-big"><span class="font-weight-bolder">{{ sumStats.resman }}</span> Plan hours</span><br>
                    <small class="text-muted">Planned this week</small>
                  </span>
                </a>

              </div>
              <div class="d-flex col-md-3 col-sm-12 align-items-center">

                <a href="javascript:void(0)" class="card-body media align-items-center text-body">
                  <i class="lnr lnr-hourglass display-4 d-block text-primary"></i>
                  <span class="media-body d-block ml-3">
                    <span class="text-big"><span class="font-weight-bolder">{{ sumStats.timesheet }}</span> Timesheet hours</span><br>
                    <small class="text-muted">Spent this week</small>
                  </span>
                </a>

              </div>
              <div class="d-flex col-md-3 col-sm-12 align-items-center">

                <a href="javascript:void(0)" class="card-body media align-items-center text-body">
                  <i class="lnr lnr-checkmark-circle display-4 d-block text-primary"></i>
                  <span class="media-body d-block ml-3">
                    <span class="text-big"><span class="font-weight-bolder">{{ projectNumber }}</span> Active projects</span><br>
                    <small class="text-muted">In this week</small>
                  </span>
                </a>

              </div>
            </div>
          </b-card>
          <!-- / Stats + Links -->
        </div>

      </div>

      <div class="row">
         <div class="col-md-6 col-sm-12">
           <employee-list
            :primaryData="primaryData">
          </employee-list>
        </div>

        <div class="col-md-6 col-sm-12">
          <project-list
            :primaryData="primaryData">
          </project-list>
        </div>
      </div>

      <div class="row d-flex justify-content-center">

        <div class="col-md-4 col-sm-12">
          <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
            <b-card-header header-tag="h6" >
              Complexity split
            </b-card-header>
            <div v-if="!chartsLoading" class="Chart__container">
              <div class="Chart__content">
                <DoughnutChart 
                    :chartData="chartData.complexitySplit" 
                    :chartLabels="chartData.complexitySplit.labels"
                    :primary="primaryData"
                    >
                </DoughnutChart>
              </div>
            </div>
          </b-card>
        </div>

        <div class="col-md-4 col-sm-12">
          <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
          <div v-if="!chartsLoading" class="Chart__container">
            <b-card-header header-tag="h6" >
              Type split
            </b-card-header>
            <div class="Chart__content">
              <DoughnutChart 
                  :chartData="chartData.typeSplit" 
                  :chartLabels="chartData.typeSplit.labels"
                  :primary="primaryData"
                  >
              </DoughnutChart>
            </div>
          </div>
          </b-card>
        </div>

        <div class="col-md-4 col-sm-12">
          <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
          <div v-if="!chartsLoading" class="Chart__container">
            <b-card-header header-tag="h6" >
              BAU split
            </b-card-header>
            <div class="Chart__content">
              <DoughnutChart 
                  :chartData="chartData.bauSplit" 
                  :chartLabels="chartData.bauSplit.labels"
                  :primary="primaryData"
                  >
              </DoughnutChart>
            </div>
          </div>
          </b-card>
        </div>

      </div>

      <div class="row d-flex justify-content-center">

        <div class="col-md-4 col-sm-12">
          <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
          <div v-if="!chartsLoading" class="Chart__container">
            <b-card-header header-tag="h6" >
              Project-Like split
            </b-card-header>
            <div class="Chart__content">
              <DoughnutChart 
                  :chartData="chartData.bauProjectLikeSplit" 
                  :chartLabels="chartData.bauProjectLikeSplit.labels"
                  :primary="primaryData"
                  >
              </DoughnutChart>
            </div>
          </div>
          </b-card>
        </div>

        <div class="col-md-4 col-sm-12">
          <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
          <div v-if="!chartsLoading" class="Chart__container">
            <b-card-header header-tag="h6" >
              Business Continuity split
            </b-card-header>
            <div class="Chart__content">
              <DoughnutChart 
                  :chartData="chartData.businessContinuitySplit" 
                  :chartLabels="chartData.businessContinuitySplit.labels"
                  :primary="primaryData"
                  >
              </DoughnutChart>
            </div>
          </div>
          </b-card>
        </div>

        <div class="col-md-4 col-sm-12">
          <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
          <div v-if="!chartsLoading" class="Chart__container">
            <b-card-header header-tag="h6" >
              Other BaU split
            </b-card-header>
            <div class="Chart__content">
              <DoughnutChart 
                  :chartData="chartData.bauOtherSplit" 
                  :chartLabels="chartData.bauOtherSplit.labels"
                  :primary="primaryData"
                  >
              </DoughnutChart>
            </div>
          </div>
          </b-card>
        </div>

      </div>

    </div>
</template>


<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import moment from 'moment';
import DoughnutChart from './dashboard/DoughnutChart';
import EmployeeList from './dashboard/EmployeeList.vue';
import ProjectList from './dashboard/ProjectList';

export default {

    components: {
        DoughnutChart,
        Multiselect,
        'employee-list': EmployeeList,
        'project-list': ProjectList
    },

    data() {
        return {
            isVisible: true,
            groups: [],
            positions: [],
            week: moment().format('YYYY') + '-W' + moment().startOf('isoWeek').format('WW'),
            planOrActual: 'Plan',
        }
    },

    computed: {
        ...mapState(['timeData', 'projects', 'chartData', 'chartsLoading' ,'parameters', 'internalUsers']),

        primaryData() {
          if (this.planOrActual === 'Plan') {
            return 'resman'
          } else {
            return 'timesheet'
          }
        },

        groupOptions() {

          var options = [{
            label: 'All groups',
            options: this.parameters.groups
          }]

          return options;
        },

        positionOptions() {

          var options = [{
            label: 'All positions',
            options: this.parameters.positions
          }]

          return options;
        },

        projectNumber() {
          return this.projects.length;
        },

        maxNumber() {
          return this.internalUsers.length;
        },

        sumStats() {
          var sumResman = 0;
          var sumTimesheet = 0;
          var sumActivePeople = 0;

          for (var i = 0; i < this.timeData.length; i++) {
            sumResman += this.timeData[i].resman;
            sumTimesheet += this.timeData[i].timesheet;
            if (Number(this.timeData[i][this.primaryData]) > 0) {
              sumActivePeople++
            }
          }

          var sumStats = {
            'resman': sumResman,
            'timesheet': sumTimesheet,
            'activePeopleNumber': sumActivePeople
          }

          return sumStats;
        },
    },

    methods: {
        visibilityChanged (isVisible, entry) {
          this.isVisible = isVisible;
        },

        addTag (tag, parameter) {
          this[parameter].push(tag)
        },

        updateData() {

          var weekId = this.week.substring(2,4) + this.week.substring(6,8)

          this.$store.dispatch('getUsersTimeData', {
            groups: this.groups,
            positions: this.positions,
            week: weekId
          });

          this.$store.dispatch('getProjectsTimeData', {
            groups: this.groups,
            positions: this.positions,
            week: weekId
          });

          this.$store.dispatch('getChartData', {
            groups: this.groups,
            positions: this.positions,
            week: weekId
          });

          this.$store.dispatch('getDashboardUsers', {
            groups: this.groups,
            positions: this.positions
          })
        },

        showPrevious() {
          var year = this.week.substring(2,4);
          var week = this.week.substring(6,8);

          var previousWeek = moment().year(year).week(week).day('Monday').add(-7, 'days').startOf('isoWeek').format('YYWW');

          this.week = 20 + previousWeek.substring(0,2) + '-W' + previousWeek.substring(2,4)

          this.$store.dispatch('getUsersTimeData', {
            groups: this.groups,
            positions: this.positions,
            week: previousWeek
          });

          this.$store.dispatch('getProjectsTimeData', {
            groups: this.groups,
            positions: this.positions,
            week: previousWeek
          });

          this.$store.dispatch('getChartData', {
            groups: this.groups,
            positions: this.positions,
            week: previousWeek
          });

          this.$store.dispatch('getDashboardUsers', {
            groups: this.groups,
            positions: this.positions
          })
        
        },

        showNext() {
          var year = this.week.substring(2,4);
          var week = this.week.substring(6,8);

          var nextWeek = moment().year(year).week(week).day('Monday').add(7, 'days').startOf('isoWeek').format('YYWW');

          this.week = 20 + nextWeek.substring(0,2) + '-W' + nextWeek.substring(2,4)

          this.$store.dispatch('getUsersTimeData', {
            groups: this.groups,
            positions: this.positions,
            week: nextWeek
          });

          this.$store.dispatch('getProjectsTimeData', {
            groups: this.groups,
            positions: this.positions,
            week: nextWeek
          });

          this.$store.dispatch('getChartData', {
            groups: this.groups,
            positions: this.positions,
            week: nextWeek
          });

          this.$store.dispatch('getDashboardUsers', {
            groups: this.groups,
            positions: this.positions
          })
        }
    },

    mounted() {
        this.$store.dispatch('getChartData', {
          groups: null,
          positions: null,
          week: null
        });

        this.$store.dispatch('getDashboardUsers', {
          groups: null,
          positions: null,
        })

        this.$store.dispatch('getParameters');
    }
}

</script>

<style scoped>
.container-m--x {
    padding-right: 150px;
    margin-right: auto;
}

.fixedElement {
    background-color: #ffffff;
    color: black;
    opacity: 1;
    position:fixed;
    top:0;
    width:100%;
    height: 70px;
    z-index:100;
}

.hidden_header {
  display: none;
}

</style>

