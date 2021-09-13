<template>
    <div id="projects">
      <div>
        <b-card no-body class="p-3 bg-white rounded">
            
            <b-card-body v-if="search">
                <div class="row">
                    <div class="col">
                        Per page: &nbsp;
                        <b-select size="sm" v-model="perPage" :options="[10, 20, 30, 40, 50]" class="d-inline-block w-auto" />
                    </div>
                    <div class="col">
                        <b-input size="md" placeholder="Search..." class="d-inline-block w-auto float-sm-right" v-model="keyword" />
                    </div>
                </div>
            </b-card-body>

        <hr class="border-light m-0">
        <div class="table-responsive">

        <b-table
          sort-icon-left
          :items="items"
          :fields="tableFields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :striped="true"
          :current-page="currentPage"
          :per-page="perPage"

          class="card-table"
          id="projects-table"
          responsive
          >

            <template slot="projectId" slot-scope="data">
                <a :href="'/#/project/' + data.item._id"><b>{{data.item.projectId}}</b></a>
            </template>

            <template slot="info" slot-scope="data">
                  <a :href="'#/project/' + data.item._id">Open <i class="ion ion-md-open"></i></a>
            </template>

            <template slot="pm.name" slot-scope="data">
                <b-badge 
                    variant="outline-dark"> {{ data.item.pm.name }}
                </b-badge>
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
<!-- 
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
              <b-badge 
                pill variant="warning" v-if="data.item.status ==='Pending'">Pending
              </b-badge>
          </template> -->

        </b-table>

      </div>
    
      <!-- Pagination -->
      <b-card-body class="pt-0 pb-3" :style="{visibility: pagination ? 'visible' : 'hidden'}">

        <div class="row">
          <div class="col-sm text-sm-left text-center pt-3">
            <span class="text-muted" v-if="totalItems">Page {{ currentPage }} of {{ totalPages }}</span>
          </div>
          <div class="col-sm pt-3">
            <b-pagination class="justify-content-center justify-content-sm-end m-0"
              v-if="totalItems"
              v-model="currentPage"
              :total-rows="totalItems"
              :per-page="perPage"
              size="sm" />
          </div>
        </div>

      </b-card-body>
      <!-- / Pagination -->

    </b-card>

      </div>
      
    </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component"
import { mapState } from 'vuex';

export default {
    props: ['statuses', 'fields', 'tableFields', 'searchText', 'buckets', 'pagination', 'limit', 'search'],
    data() {
        return {
            sortBy: 'projectId',
            sortDesc: true,
            currentPage: 1,
            currentPage: 0,
            perPage: 10,

            keyword: ''

        }
    },
    components: {
        flatPickr
    },
    computed: {
        ...mapState(['projects']),
        items () {
            return this.keyword
                ? this.projects.filter(
                          item => 
                            String(item.projectId).includes(this.keyword) || 
                            item.name.toLowerCase().includes(this.keyword.toLowerCase()) || 
                            item.pm.name.toLowerCase().includes(this.keyword.toLowerCase())
                  )
                : this.projects
        },    
        totalItems () {
            return this.items.length
        },
        totalPages () {
            return Math.ceil(this.totalItems / this.perPage)
        }
    },

    methods: {
        navigateProject(id) {
            this.$router.push('/project/' + id)
        },
        onRowClicked (item, index, event) {
            this.navigateProject(item._id);
        }
    }, 
    mounted() {
        this.$store.dispatch('loadProjects', {
            searchText: this.searchText,
            fields: this.fields,
            statuses: this.statuses,
            buckets: this.buckets,
            limit: this.limit
        });
    }

}
</script>


<style src="@/vendor/libs/vue-flatpickr-component/vue-flatpickr-component.scss" lang="scss"></style>