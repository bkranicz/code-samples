<template>
    <div v-if="loadState==='notloading'">
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light"> 
            <span class="lnr lnr-home"></span> / Admin /</span> New Project
          <span v-if="projectForm.name">/ {{projectForm.name}}</span>
        </h4>
        <hr class="border-light container-m--x my-4">
        <!-- Left steps -->
        <form-wizard id="form" class="form-wizard-vertical-left mb-5" error-color="#ff4949" @on-complete="onComplete" transition="fade">

          <tab-content icon="ion ion-md-create" title="General" :before-change="validateFirstTab">
            <b-card class="mb-3">      
              <b-form-group label="Name">
                  <b-input 
                    v-model="projectForm.name" 
                    v-bind:class="{'invalid': requiredFields && !this.projectForm.name}"
                  />        
              </b-form-group>

              <b-form-group label="Description">
                  <b-textarea 
                      v-model="projectForm.description"
                      v-bind:class="{'invalid': requiredFields && !this.projectForm.description}"
                      rows="5" 
                      placeholder="Describe the project.."
                  />
              </b-form-group>
              
              <div class="form-row">
                  <div class="col-sm-4">
                      <b-form-group label="Status">
                          <div v-if="currentUser.role != 'Pamacs_admin'">
                            {{projectForm.status}}
                          </div>
                          <div v-else>
                            <multiselect  
                                v-model="projectForm.status"
                                :options="parameters.status" 
                                :searchable="true"
                                :show-labels="false"
                                :allow-empty="false"
                            />
                          </div>

                      </b-form-group>
                  </div>  
                  <div class="col-sm-4">
                      <b-form-group label="Phase">
                          <multiselect 
                              v-model="projectForm.phase" 
                              :options="parameters.phase"
                              :searchable="true"
                              :show-labels="false"
                              :allow-empty="false"
                          />
                      </b-form-group>
                  </div>  
                  <div class="col-sm-4">
                      <b-form-group label="Type">
                          <multiselect 
                              v-model="projectForm.type" 
                              :options="parameters.type" 
                              :searchable="true"
                              :show-labels="false"
                              :allow-empty="false"
                          />
                      </b-form-group>
                  </div> 
              </div>

              <b-form-group label="Project Manager">
                  <multiselect 
                      v-model="projectForm.pm" 
                      :options="users" 
                      :searchable="true"
                      :show-labels="false"
                      :allow-empty="false"
                      label="name"
                      v-bind:class="{'invalid': requiredFields && !this.projectForm.pm.username}"
                  />
              </b-form-group>

              <b-form-group label="Client">
                  <multiselect 
                      v-model="projectForm.client" 
                      :options="parameters.client"
                      :searchable="true"
                      :show-labels="false"
                      :allow-empty="false"
                      v-bind:class="{'invalid': requiredFields && !this.projectForm.client}"
                  />
              </b-form-group>
            </b-card>
          </tab-content>

          <tab-content icon="ion ion-ios-options" title="Details" :before-change="validateSecondTab">
            <b-card class="mb-3">
                <div class="row">
                    <div class="col">
                        <b-form-group label="Priority">
                            <multiselect 
                                v-model="projectForm.priority" 
                                :searchable="true"
                                :show-labels="false"
                                :allow-empty="false"
                                :options="parameters.priority"
                            />
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="IT impact">
                            <multiselect 
                                v-model="projectForm.complexity" 
                                :allow-empty="false"
                                :show-labels="false"
                                :options="parameters.complexity"
                            />
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="TnCO impact">
                            <multiselect 
                                v-model="projectForm.tncoImpact" 
                                :allow-empty="false"
                                :options="parameters.tncoImpact"
                                :show-labels="false"
                            />
                        </b-form-group>
                    </div>
                </div>

                <b-form-group label="Portfolios">
                    <multiselect 
                        v-model="projectForm.portfolios" 
                        :multiple="true"  
                        :allow-empty="false"
                        :show-labels="false"
                        :options="parameters.portfolios"
                        :close-on-select="false"
                        :hide-selected="true" 
                        class="multiselect-primary" 
                        placeholder="Add portfolio" 
                        v-bind:class="{'invalid': requiredFields && this.projectForm.portfolios.length === 0}"
                    />
                </b-form-group>

                <b-form-group label="Project Folder link">
                    <b-input v-model="projectForm.link"/>    
                </b-form-group>    

                <div class="row">
                  <div class="col">
                      <b-form-group label="Resource bucket">
                          <multiselect 
                              v-model="projectForm.resmanType" 
                              :allow-empty="false"
                              :options="parameters.resourceBucket"
                              :show-labels="false"
                          />
                      </b-form-group>
                  </div>
                  <div class="col">
                    <b-form-group label="Driver">
                      <multiselect 
                          v-model="projectForm.strategy" 
                          :show-labels="false"
                          :allow-empty="false"
                          :options="parameters.strategy"
                          />
                    </b-form-group>
                  </div>
                  <div class="col">
                    <b-form-group label="Audit required">
                        <b-form-checkbox
                            v-model="projectForm.audit"
                            value=true
                            unchecked-value=false
                        ></b-form-checkbox>
                    </b-form-group>
                  </div>
                  <div class="col">
                    <b-form-group label="Without development">
                        <b-form-checkbox
                            v-model="projectForm.withoutDev"
                            value=true
                            unchecked-value=false
                        ></b-form-checkbox>
                    </b-form-group>
                  </div>
                </div>
            </b-card>
          </tab-content>

          <tab-content icon="ion ion-md-people" title="Members">
            <b-card class="mb-3">
                <b-form inline>
                    <b-form-group >
                        <multiselect 
                        v-model="employee" 
                        placeholder="Select employee"
                        :allow-empty="false"
                        :show-labels="false"
                        :clear-on-select="false"
                        :options="users" 
                        label="name"
                        />
                    </b-form-group>
                    <b-form-group class="ml-1">
                        <multiselect 
                        v-model="title" 
                        :show-labels="false"
                        :allow-empty="false"
                        :options="parameters.memberTitle" 
                        />
                    </b-form-group>
                    <b-form-group class="ml-1">
                        <multiselect 
                        v-model="permission" 
                        :show-labels="false"
                        :allow-empty="false"
                        :options="parameters.memberPermission"  
                        />
                    </b-form-group>
                    <b-btn 
                        class="ml-1"
                        variant="primary" 
                        size="md"
                        @click="addMember()"
                        ><i class="ion ion-md-person-add"></i> Add
                    </b-btn>
                </b-form>
                <br>

                <b-table 
                  small 
                  striped 
                  hover 
                  :items="projectForm.members" 
                  :fields="fields">

                    <template slot="edit" slot-scope="row">
                        <b-btn 
                        variant="outline-danger icon-btn btn-lg borderless"
                        @click="deleteMember(row.index)"
                        v-b-tooltip.hover title="Remove employee"
                        ><span class="ion ion-md-close"></span></b-btn>
                    </template>

                    <template slot="permission" slot-scope="data">
                        <b-badge 
                        pill variant="danger" v-if="data.item.permission ==='Write'">Write
                        </b-badge>
                        <b-badge 
                        pill variant="primary" v-if="data.item.permission ==='Read'">Read
                        </b-badge>
                    </template>

                </b-table>
            </b-card>
          </tab-content>

          <!--tab-content icon="ion ion-logo-usd" title="Financials">
            <b-card class="mb-3">
              <b-form-group label="Strategic Connection">
                <multiselect 
                    v-model="projectForm.strategy" 
                    :show-labels="false"
                    :allow-empty="false"
                    :options="parameters.strategy"
                    />
              </b-form-group>
                <b-form-group label="Functional Domain">
                <multiselect 
                    v-model="projectForm.functional" 
                    :show-labels="false"
                    :allow-empty="false"
                    :options="[0,1,2,3,4]" 
                    />
                </b-form-group>
                <b-form-group label="Driver">
                <multiselect 
                    v-model="projectForm.driver" 
                    :show-labels="false"
                    :allow-empty="false"
                    :options="['IT', 'Network', 'HR']" 
                    />
              </b-form-group>
            </b-card>
          </tab-content-->

          <tab-content icon="ion ion-md-git-branch" title="Milestones">
            <b-card class="mb-3">
              <b-form-group label="D1">
                <datepicker
                  v-model="projectForm.D1"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :format="dateFormatter"
                  :full-month-name="true"
                  placeholder="Select D1 date"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>

              <b-form-group label="D2">
                <datepicker
                  v-model="projectForm.D2"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :format="dateFormatter"
                  :full-month-name="true"
                  placeholder="Select D2 date"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>

              <b-form-group label="Go live">
                <datepicker
                  v-model="projectForm.goLive"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :format="dateFormatter"
                  :full-month-name="true"
                  placeholder="Select go live date"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>

              <b-form-group label="D4">
                <datepicker
                  v-model="projectForm.D4"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :format="dateFormatter"
                  :full-month-name="true"
                  placeholder="Select D4 date"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>

              <b-form-group label="D5">
                <datepicker
                  v-model="projectForm.D5"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :format="dateFormatter"
                  :full-month-name="true"
                  placeholder="Select D5 date"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>
            </b-card>
          </tab-content>

          <!-- Buttons -->
          <b-btn variant="outline-primary" slot="prev"><span class="ion ion-md-arrow-back"></span> Back</b-btn>
          <b-btn variant="primary" slot="next">Next <span class="ion ion-md-arrow-forward"></span></b-btn>
          <b-btn variant="success" slot="finish">Finish <span class="ion ion-md-checkmark"></span></b-btn>
        </form-wizard>
      </div>
</template>

<script>
import { FormWizard, TabContent, WizardStep } from 'vue-form-wizard'
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'

window.swal = require('sweetalert2')
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
});

export default {
  data() {
    return {
      projectForm: {
        name: '',
        description: '',
        status: 'Active',
        phase: 'Initiation',
        type: 'Candidate',
        pm: {
         name: '',
         username: ''
        },
        client: '',
        priority: 'Undefined',
        complexity: 'S - Small',
        tncoImpact: 'Undefined',
        resmanType: 'Other',
        portfolios: [],
        link: '',
        audit: false,
        members: [],
        strategy: 'Run the Business',
        D1: '',
        D2: '',
        goLive: '',
        D4: '',
        D5: '',
        comments: [],
        withoutDev: false
      },
      employee: '',
      username: '',
      title: 'Member',
      permission: 'Read',
      fields: {
        name: {
            label: 'Employee'
        },
        title: {
            label: 'Title'
        },
        permission: {
            label: 'Permission'
        },
        edit: {
            label: 'Delete'
        }
      },
      requiredFields: false,
      params: ''
    }
  },
  computed: {
      ...mapState(['parameters', 'users', 'loadState', 'currentUser']),
      status() {
        if (this.currentUser.role != 'Pamacs_admin') {
          return this.projectForm.status = 'Pending'
        }
      }
  },
  components: {
    FormWizard,
    TabContent,
    WizardStep,
    Multiselect,
    Datepicker
  },
  methods: {
    onComplete() {
        this.$store.dispatch('createProject', this.projectForm);
    },

    addMember() {
      if (this.employee !== '') {

        for (var i = 0; i < this.projectForm.members.length; i++) {
          if (this.projectForm.members[i].username === this.employee.username) {
              toast({type: 'warning', title: "This employee is already on the list"})
              return;
          }
        }

        var memberObject = {}
        memberObject.name = this.employee.name
        memberObject.username = this.employee.username
        memberObject.title = this.title
        memberObject.permission = this.permission

        this.projectForm.members.push(memberObject)

        this.employee = ''
      } 
    },

    deleteMember(index) {
        this.projectForm.members.splice(index, 1)
    },

    validateFirstTab() {
        if (!this.projectForm.name || !this.projectForm.description || !this.projectForm.pm.name || !this.projectForm.client) {
          this.requiredFields = true;
          return false;
        } else {
          return true;
        }
    },

    validateSecondTab() {
      if (this.projectForm.portfolios.length === 0) {
        this.requiredFields = true;
        return false;
      } else {
        return true;
      }
    },
    
    dateFormatter(date) {
      return moment(date).format('YYYY MMMM DD');
    }
  },
  mounted() {
      this.$store.dispatch('getParameters');
      this.$store.dispatch('getExternalUsers');
      //Set the status to Pending if user not admin
      if (this.currentUser.role != 'Pamacs_admin') {
        this.projectForm.status = 'Pending'
      } 
      
  } 
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-form-wizard/vue-form-wizard.scss" lang="scss"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>
<style>
.table > tbody > tr > td {
     vertical-align: middle;
}

.invalid { 
  border: 1px solid #d9534f;
}
</style>