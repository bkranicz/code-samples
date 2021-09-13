<template>
    <div>
        <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
            <b-card-header header-tag="h6" >
              Overbooked people
              <div class="float-sm-right">
                <b-input size="sm" placeholder="Search..." class="d-inline-block w-auto" v-model="peopleKeyword" />
                <b-select size="sm" v-model="peoplePerPage" :options="[10, 20, 30, 40, 50]" class="d-inline-block w-auto" />
              </div>
            </b-card-header>
            <div class="table-responsive">
                <b-table
                    class="table card-table"
                    id="peopleTimeTable"
                    :items="peopleItems"
                    :fields="peopleTimeFields"
                    :striped="true"
                    :bordered="false"
                    :borderless="true"
                    :current-page="peopleCurrentPage"
                    :per-page="peoplePerPage"
                    :sort-by.sync="primaryData"
                    :sort-desc.sync="sortDesc"
                    responsive>

                  
                  <template slot="employeeName" slot-scope="data">
                    <div v-if="data.item[primaryData] > 40">
                     {{data.item.employeeName}} <i class="fas fa-exclamation-circle" style="color: #B23C26"></i>
                    </div>
                    <div v-else>
                      {{data.item.employeeName}}
                    </div>
                    
                  </template>

                  <template slot="resman" slot-scope="data">
                    {{data.item.resman}} h 
                  </template>

                  <template slot="timesheet" slot-scope="data">
                    {{data.item.timesheet}} h 
                  </template>

                  <template slot="show_details" slot-scope="row">
                    <div v-if="!row.detailsShowing">
                      <b-btn 
                        variant="outline-primary icon-btn btn borderless"
                        @click="row.toggleDetails">
                        <span class="fas fa-plus"></span>
                      </b-btn>
                    </div>

                    <div v-else>
                      <b-btn 
                        variant="outline-primary icon-btn btn borderless"
                        @click="row.toggleDetails">
                        <span class="fas fa-minus"></span>
                      </b-btn>
                    </div>

                  </template>

                  <template slot="row-details" slot-scope="row">

                    <b-card no-body class="mb-4">
                      <div class="table-responsive">
                        <b-table
                          id="employeeDetailsTable"
                          :items="row.item.projects"
                          :fields="peopleTimeDetailsFields"
                          :striped="false"
                          responsive>
                        </b-table> 
                      </div>
                    </b-card>
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>

                  </template>
                  
                </b-table>
            </div>

            <!-- Pagination -->
              <b-card-body class="pt-0 pb-3">

                <div class="row">
                  <div class="col-sm text-sm-left text-center pt-3">
                    <span class="text-muted" v-if="peopleTotalItems">Page {{ peopleCurrentPage }} of {{ peopleTotalPages }}</span>
                  </div>
                  <div class="col-sm pt-3">
                    <b-pagination class="justify-content-center justify-content-sm-end m-0"
                      v-if="peopleTotalItems"
                      v-model="peopleCurrentPage"
                      :total-rows="peopleTotalItems"
                      :per-page="peoplePerPage"
                      size="sm" />
                  </div>
                </div>

              </b-card-body>
              <!-- / Pagination -->

          </b-card>
    </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
    props: {
      primaryData: {
          type: String,
          required: true
      }
    },
    data() {
        return {
            peopleTimeFields: {
                employeeName: {
                    label: 'Employee',
                    sortable: true
                },
                group: {
                    label: 'Group',
                    sortable: true
                },
                resman: {
                    label: 'Plan',
                    sortable: true
                },
                timesheet: {
                    label: 'Actual',
                    sortable: true
                },
                show_details: {
                  label: ''
                }
            },
            peopleTimeDetailsFields: {
              'projectId': {
                label: 'ID',
                sortable: true
              },
              'name': {
                label: 'Name',
                sortable: true
              },
              'system': {
                label: 'System',
                sortable: true
              }, 
              'resman': {
                label: 'Plan',
                sortable: true
              },
              'timesheet': {
                label: 'Actual',
                sortable: true
              }
            },
            peopleCurrentPage: 1,
            peoplePerPage: 10,
            peopleKeyword: '',
            sortDesc: true,
        }
    },

    computed: {
        ...mapState(['timeData']),

        peopleItems() {
          return this.peopleKeyword
                ? this.timeData.filter(
                          item => 
                           ( item.employeeName &&  item.employeeName.toLowerCase().includes(this.peopleKeyword.toLowerCase()) ) || 
                           ( item.group && item.group.toLowerCase().includes(this.peopleKeyword.toLowerCase()) )
                  )
                : this.timeData
        },

        peopleTotalItems () {
            return this.peopleItems.length
        },

        peopleTotalPages () {
            return Math.ceil(this.peopleTotalItems / this.peoplePerPage)
        },
    },

    mounted() {
        this.$store.dispatch('getUsersTimeData', {
          groups: null,
          positions: null,
          week: null
        });
    }
}

</script>
