<template>
    <div id="home">
      <div>
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light"> 
            <span class="lnr lnr-home"></span> / Admin / </span>User Administration 
        </h4>
        <hr class="border-light container-m--x my-4">
        <div class="row">
          <div class="col">
            <div class="float-sm-right">
                <b-btn variant="primary" 
                    size="md"
                    v-b-modal.userModal
                    ><i class="fas fa-user-plus"></i> New user
                </b-btn>
            </div>
          </div>
        </div>
        <br>
        <b-card no-body class="shadow p-3 mb-5 bg-white rounded">
          <b-card-body>
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

          <b-table
            :items="items"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :striped="true"
            :current-page="currentPage"
            :per-page="perPage"
            class="card-table"
            id="projects-table"
            responsive>

            <template slot="portfolios" slot-scope="data">
              {{ data.item.portfolios.join(", ") }}
            </template>

            <template slot="resman" slot-scope="data">
              <div v-if="data.item.resman">
                <i class="fas fa-check" style="color: #02BC77;"></i>
              </div>
              <div v-else>
                <i class="fas fa-times" style="color: #d9534f"></i>
              </div>
            </template>

            <template slot="timesheet" slot-scope="data">
              <div v-if="data.item.timesheet">
                <i class="fas fa-check" style="color: #02BC77;"></i>
              </div>
              <div v-else>
                <i class="fas fa-times" style="color: #d9534f"></i>
              </div>
            </template>

            <template slot="report" slot-scope="data">
              <div v-if="data.item.report">
                <i class="fas fa-check" style="color: #02BC77;"></i>
              </div>
              <div v-else>
                <i class="fas fa-times" style="color: #d9534f"></i>
              </div>
            </template>

            <template slot="budget" slot-scope="data">
              <div v-if="data.item.budget">
                <i class="fas fa-check" style="color: #02BC77;"></i>
              </div>
              <div v-else>
                <i class="fas fa-times" style="color: #d9534f"></i>
              </div>
            </template>

            <template slot="external" slot-scope="data">
              <div v-if="data.item.external">
                <i class="fas fa-check" style="color: #02BC77;"></i>
              </div>
              <div v-else>
                <i class="fas fa-times" style="color: #d9534f"></i>
              </div>
            </template>

            <template slot="edit" slot-scope="row">
              <b-btn 
                  variant="outline-primary icon-btn btn-lg borderless" 
                  v-b-tooltip.hover title="Edit employee"
                  @click="editUser(row.item)"
              ><i class="fas fa-user-edit"></i></b-btn>
            </template>

            <template slot="delete" slot-scope="row">
              <b-btn 
                  variant="outline-danger icon-btn btn-lg borderless" 
                  v-b-tooltip.hover title="Delete employee"
                  @click="deleteUser(row.item)"
              ><i class="fas fa-user-times"></i></b-btn>
            </template>

          </b-table>
          
          <!-- Pagination -->
          <b-card-body class="pt-0 pb-3">

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

          <!-- User admin modal -->
          <b-modal v-if="!parametersLoading" id="userModal" ref="userModal" size="lg">
            <div slot="modal-title">
              User <span class="font-weight-light">administration</span><br>
            </div>

            <b-form-row class="mb-2">
              <b-form-group label="Username" class="col mb-0">
                  <multiselect 
                      v-model="user" 
                      :options="users" 
                      :searchable="true"
                      :show-labels="false"
                      :allow-empty="false"
                      placeholder="Select employee"
                      @select="userChanged"
                      label="name"
                  />
              </b-form-group>
              <b-form-group label="Portfolios" class="col mb-0">
                  <multiselect 
                    v-model="portfolios" 
                    :options="parameters.portfolios" 
                    :searchable="true"
                    :show-labels="false"
                    :allow-empty="false"
                    :multiple="true"  
                    :close-on-select="false"
                    :hide-selected="true" 
                    class="multiselect-primary" 
                    placeholder="Select portfolios"
                  />
              </b-form-group>
            </b-form-row>
            <b-form-row class="mb-2">
              <b-form-group label="Position" class="col mb-0">
                  <multiselect 
                    v-model="position" 
                    :options="parameters.positions" 
                    :searchable="true"
                    :show-labels="false"
                    :allow-empty="false"
                    placeholder="Select position"
                  />
              </b-form-group>
              <b-form-group label="Group" class="col mb-0">
                  <multiselect 
                    v-model="group" 
                    :options="parameters.groups" 
                    :searchable="true"
                    :show-labels="false"
                    :allow-empty="false"
                    placeholder="Select group"
                  />
              </b-form-group>
            </b-form-row>
            <b-form-row>
              <b-form-group label="Resource Management" class="col mb-0">
                <b-form-checkbox
                    v-model="resman"
                    value=true
                    unchecked-value=false
                ></b-form-checkbox>
              </b-form-group>
              <br>
              <b-form-group label="Timesheet" class="col mb-0">
                <b-form-checkbox
                    v-model="timesheet"
                    value=true
                    unchecked-value=false
                ></b-form-checkbox>
              </b-form-group>
              <br>
              <b-form-group label="Report" class="col mb-0">
                <b-form-checkbox
                    v-model="report"
                    value=true
                    unchecked-value=false
                ></b-form-checkbox>
              </b-form-group>
              <b-form-group label="Budget" class="col mb-0">
                <b-form-checkbox
                    v-model="budget"
                    value=true
                    unchecked-value=false
                ></b-form-checkbox>
              </b-form-group>
              <b-form-group label="External" class="col mb-0">
                <b-form-checkbox
                    v-model="external"
                    value=true
                    unchecked-value=false
                ></b-form-checkbox>
              </b-form-group>
            </b-form-row>
          <div slot="modal-footer">
              <b-btn variant="primary" @click="saveUser">Save <i class="fas fa-paper-plane"></i></b-btn>
          </div>
      </b-modal>

      </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'

window.swal = require('sweetalert2')
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
});

export default {
    components: {
        Multiselect
    },
    data() {
        return {
            sortBy: 'username',
            sortDesc: false,
            currentPage: 1,
            currentPage: 0,
            perPage: 10,
            keyword: '',
            user: '',
            position: '',
            group: '',
            portfolios: [],
            resman: false,
            timesheet: false,
            report: false,
            budget: false,
            external: false,
            employees: [],
            fields: {
                username: {
                    label: 'Username',
                    sortable: true
                },  
                name: {
                    label: 'Name',
                    sortable: true
                }, 
                /* pamacsRole: {
                    label: 'Role',
                    sortable: true
                }, */
                position: {
                    label: 'Position',
                    sortable: true
                },
                group: {
                  label: 'Group',
                  sortable: true
                },
                portfolios: {
                    label: 'Portfolios',
                    sortable: true
                },
                resman: {
                    label: 'Time Plan',
                    sortable: true
                }, 
                timesheet: {
                    label: 'Timesheet',
                    sortable: true
                },
                report: {
                    label: 'Report',
                    sortable: true
                },
                budget: {
                  label: 'Budget',
                  sortable: true
                },
                external: {
                  label: 'External',
                  sortable: true
                },
                edit: {
                    label: ''
                },
                delete: {
                  label: ''
                }
            },
        }
    },
    computed: {
      ...mapState(['loadState', 'parametersLoading', 'users', 'internalUsers', 'parameters']),

      userList() {
        return this.employees = JSON.parse(JSON.stringify(this.$store.state.internalUsers));
      },

      items () {
        return this.keyword
            ? this.userList.filter(item => 
                item.name.toLowerCase().includes(this.keyword.toLowerCase()) || 
                item.username.toLowerCase().includes(this.keyword.toLowerCase()) || 
                item.position.toLowerCase().includes(this.keyword.toLowerCase()) || 
                item.group.toLowerCase().includes(this.keyword.toLowerCase()) ||
                item.portfolios.includes(this.keyword)
                )
            : this.userList
      },    

      totalItems () {
          return this.items.length
      },

      totalPages () {
          return Math.ceil(this.totalItems / this.perPage)
      },

    },
    methods: {
      userChanged(user, id) {
        
        for (var i = 0; i < this.userList.length; i++) {
          
           if (this.userList[i].username === user.username) {
            this.position = this.userList[i].position;
            this.group = this.userList[i].group;
            this.portfolios = this.userList[i].portfolios;
            this.resman = this.userList[i].resman;
            this.timesheet = this.userList[i].timesheet;
            this.report = this.userList[i].report;
            this.budget = this.userList[i].budget;
            this.external = this.userList[i].external;

            return;
          } 
        }

          this.position = '';
          this.group = '';
          this.portfolios = [];
          this.resman = false;
          this.timesheet = false;
          this.report = false;
          this.budget = false;
          this.external = false;

      },

      editUser(user) {
        this.user = {name: user.name, username: user.username};
        this.position = user.position;
        this.group = user.group;
        this.portfolios = user.portfolios;
        this.resman = user.resman;
        this.timesheet = user.timesheet;
        this.report = user.report;
        this.budget = user.budget;
        this.external = user.external;

        this.$refs['userModal'].show();
      },

      deleteUser(user) {
        this.$swal({
                title: `Are you sure to remove ${user.name}?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if(result.value === true) {
                    this.$store.dispatch('removeUser', user.username);
                    for (var i = 0; i < this.userList.length; i++) {
                      if (user.username === this.userList[i].username) {
                        this.userList.splice(i, 1);
                        break;
                      }
                    }
                } 
            });
      },

      saveUser() {

        if (!this.user.name || !this.user.username || !this.position || !this.group || !this.portfolios || this.portfolios.length === 0) {
          toast({type: 'warning', title: "Please fill out the entire form!"})
          return;
        }

        var employee = {
          name: this.user.name,
          username: this.user.username,
          position: this.position,
          group: this.group,
          portfolios: this.portfolios,
          resman: this.resman,
          timesheet: this.timesheet,
          report: this.report,
          budget: this.budget,
          external: this.external
        }

        //Remove line if found
        for (var i = 0; i < this.userList.length; i++) {
          if (employee.username === this.userList[i].username) {
            this.userList.splice(i, 1);
            break;
          }
        }
      
        this.userList.push(employee);
        this.$store.dispatch('setUser', employee);
        this.$refs['userModal'].hide();
      }
    },
    
    mounted() {
      this.$store.dispatch('getInternalUsers');
      this.$store.dispatch('getExternalUsers');
      this.$store.dispatch('getParameters');
    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

