<template>
    <div>
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light"> Search result for: </span>"{{searchText}}" 
        </h4>
        <hr class="border-light container-m--x my-4">

      <b-card>
        <div v-if="projects && projects.length > 0">
          <div class="row">
            <div class="text-light font-weight-semibold mb-3">Project Status:&nbsp;&nbsp;</div>
            <div class="demo-inline-spacing">
              <b-check-group v-model="statuses" :options="statusOptions"/>
            </div>
            <br><br>
            <div class="text-light font-weight-semibold mb-3">Search in:&nbsp;&nbsp;</div>
            <div class="demo-inline-spacing">
              <b-check-group v-model="filters" :options="filterOptions" checked/>
            </div>
          </div>
          <br>
          <b-table
            show-empty
            striped
            responsive
            :items="items"
            :fields="fields"
          >
              <template slot="projectId" slot-scope="data">
                  <a :href="'/#/project/' + data.item._id"><b>{{data.item.projectId}}</b></a>
              </template>
              
              <template slot="show_details" slot-scope="row">
                <b-button variant="secondary" v-if="row.detailsShowing" size="sm" @click="row.toggleDetails" class="mr-2">
                  <i class="fas fa-chevron-up"></i>
                </b-button>

                <b-button variant="secondary" v-if="!row.detailsShowing" size="sm" @click="row.toggleDetails" class="mr-2">
                  <i class="fas fa-chevron-down"></i>
                </b-button>
              </template>

              <template slot="row-details" slot-scope="row">
                <b-card>
                  <b-row class="mb-2">
                    <b-col>{{ row.item.description }}</b-col>
                  </b-row>

                  <!--b-button size="sm" @click="row.toggleDetails">Hide Details</b-button-->
                </b-card>
              </template>

              <template slot="phase" slot-scope="data">
                  <b-badge 
                    variant="secondary"> {{ data.item.phase }}
                  </b-badge>
              </template>

              <template slot="status" slot-scope="data">
                  <b-badge 
                    pill variant="success" v-if="data.item.status ==='Active'">Active
                  </b-badge>
                  <b-badge 
                    pill variant="primary" v-if="data.item.status ==='Completed'">Completed
                  </b-badge>
                  <b-badge 
                    pill variant="secondary" v-if="data.item.status ==='Suspended'">Suspended
                  </b-badge>
                  <b-badge 
                    pill variant="danger" v-if="data.item.status ==='Deleted'">Deleted
                  </b-badge>
              </template>

              <template slot="open" slot-scope="data">
                    <a :href="'#/project/' + data.item._id">Open <i class="ion ion-md-open"></i></a>
                    <!--b-btn variant="outline-secondary" @click="openProject(data.item._id)"><i class="ion ion-md-open"></i> Open</b-btn-->
              </template>
            </b-table>
      </div>
      <div v-else>
          <center>
            <h5>Empty result</h5>
            <img src="../assets/img/empty.gif" alt=""> 
          </center>
      </div>
    </b-card>
    </div>
</template>

<script>
import Vue from 'vue'
import flatPickr from "vue-flatpickr-component"
import moment from 'moment'

export default {
    data() {
        return {
            statuses: ['Active'],
            statusOptions: [
              { text: 'Active, Suspended', value: 'Active' },
              { text: 'Completed, Deleted', value: 'Completed' }
            ],
            fields: [
              {key: 'projectId', label: 'ID', sortable: true},
              {key: 'name', label: 'Name', sortable: true},
              {key: 'pm.name', label: 'Responsible', sortable: true},
              {key: 'status', label: 'Status', sortable: true},
              {key: 'phase', label: 'Phase', sortable: true},
              {key: 'type', label: 'Type', sortable: true},
              {key: 'complexity', label: 'Complexity', sortable: true},
              {key: 'show_details', label: 'Details'},
              {key: 'open', label: ''}
            ],
            filters: ['projectId', 'name', 'description', 'pm.name'],
            filterOptions: [
              { text: 'ID', value: 'projectId' },
              { text: 'Name', value: 'name' },
              { text: 'Description', value: 'description' },
              { text: 'Responsible', value: 'pm.name' }
            ],
            columns: ['projectId', 'name', 'pm.name', 'status', 'phase', 'type', 'complexity', 'open']
        }
    },
    computed: {
        projects() {
            return this.$store.state.projects;
        },
        searchText() {
            return this.$route.query.search.toLowerCase();
        },
        items () {
            var selectedStatuses = [];
            var selectedFields= [];
            var projects = this.$store.state.projects;
            
            if (this.statuses.includes('Active')) {
              selectedStatuses.push('Active', 'Suspended');
            } 
            
            if (this.statuses.includes('Completed')) {
              selectedStatuses.push('Completed', 'Deleted');
            }

            projects = projects.filter( function (project) {
              return selectedStatuses.includes(project.status)
            })

            if (true) {
              projects = projects.filter((project) => {
                return this.filters.includes('name') && project.name.toLowerCase().indexOf(this.searchText) > -1 ||
                       this.filters.includes('description') && project.description.toLowerCase().indexOf(this.searchText) > -1 ||
                       this.filters.includes('pm.name') && project.pm.name.toLowerCase().indexOf(this.searchText) > -1 ||
                       this.filters.includes('projectId') && String(project.projectId).toLowerCase().indexOf(this.searchText) > -1
              })
            }

            return projects;
        }, 
    },
    components: {
        flatPickr
    },
    methods: {
        openProject(id) {
          this.$router.push('/project/' + id);
        }
    },
    filters: {
        timeFormatter: function(time) {    
            return moment(time).format('YYYY-MM-DD hh:mm')
        }
    }
}
</script>

<style src="@/vendor/libs/vue-flatpickr-component/vue-flatpickr-component.scss" lang="scss"></style>