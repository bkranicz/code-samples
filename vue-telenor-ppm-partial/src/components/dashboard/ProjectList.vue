<template>
    <div>
        <b-card no-body class="mb-4 shadow p-3 mb-5 bg-white rounded">
            <b-card-header header-tag="h6">
                Top Projects
                <div class="float-sm-right">
                <b-input size="sm" placeholder="Search..." class="d-inline-block w-auto" v-model="projectKeyword" />
                <b-select size="sm" v-model="projectsPerPage" :options="[10, 20, 30, 40, 50]" class="d-inline-block w-auto" />
                </div>
                
            </b-card-header>
            <div class="table-responsive">
                <b-table
                    id="projectsTimeTable"
                    :items="projectItems"
                    :fields="projectsTimeFields"
                    :striped="true"
                    :bordered="false"
                    :borderless="true"
                    :current-page="projectsCurrentPage"
                    :per-page="projectsPerPage"
                    :sort-by.sync="primaryData"
                    :sort-desc.sync="sortDesc"
                    responsive>
                    

                    <template slot="resman" slot-scope="data">
                    {{data.item.resman}} h 
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
                            :items="row.item.employees"
                            :fields="projectTimeDetailsFields"
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
                <span class="text-muted" v-if="projectsTotalItems">Page {{ projectsCurrentPage }} of {{ projectsTotalPages }}</span>
                </div>
                <div class="col-sm pt-3">
                <b-pagination class="justify-content-center justify-content-sm-end m-0"
                    v-if="projectsTotalItems"
                    v-model="projectsCurrentPage"
                    :total-rows="projectsTotalItems"
                    :per-page="projectsPerPage"
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
            projectsTimeFields: {
                '_id.projectId': {
                    label: 'ID',
                    sortable: true
                },
                name: {
                    label: 'Name',
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
            projectTimeDetailsFields: {
                'employeeName': {
                    label: 'Employee',
                    sortable: true
                },
                'group': {
                    label: 'Group',
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
            projectsCurrentPage: 1,
            projectsPerPage: 10,
            projectKeyword: '',
            sortDesc: true,

        }
    },

    computed: {
        ...mapState(['projects']),

        projectItems() {
          return this.projectKeyword
                ? this.projects.filter(
                          item => 
                            String(item._id.projectId).includes(this.projectKeyword) || 
                            item.name.toLowerCase().includes(this.projectKeyword.toLowerCase()) 
                  )
                : this.projects
        },

        projectsTotalItems () {
            return this.projectItems.length
        },

        projectsTotalPages () {
            return Math.ceil(this.projectsTotalItems / this.projectsPerPage)
        },
    },

    mounted() {
        this.$store.dispatch('getProjectsTimeData', {
          groups: null,
          positions: null,
          week: null
        });
    }
}

</script>

