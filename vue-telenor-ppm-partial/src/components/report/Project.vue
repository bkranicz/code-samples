<template>
    <div>
        <b-modal id="paramsModal" ref="paramsModal" size="lg">
          <div slot="modal-title">
            <i class="fas fa-filter"></i> Projects report
          </div>

          <b-form-row>
            <b-form-group label="Status" class="col-md-4 col-sm-12 mb-0">
              <multiselect  
                  v-model="statuses"
                  :options="parameters.status" 
                  :searchable="true"
                  :show-labels="false"
                  :multiple="true"
                  :taggable="true"
                  id="statuses"
                  @tag="addTag"
                  class="multiselect-primary" 
              />
            </b-form-group>
            <b-form-group label="Phase" class="col-md-4 col-sm-12 mb-0">
              <multiselect  
                v-model="phases"
                :options="parameters.phase" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="phases"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>
            <b-form-group label="Type" class="col-md-4 col-sm-12 mb-0">
              <multiselect  
                v-model="types"
                :options="parameters.type" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="types"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Client" class="col-md-4 col-sm-12 mb-0">
              <multiselect  
                v-model="clients"
                :options="parameters.client" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                id="clients"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>

            <b-form-group label="Priority" class="col-md-4 col-sm-12 mb-0">
              <multiselect  
                v-model="priorities"
                :options="parameters.priority" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="priorities"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>

            <b-form-group label="IT Impact" class="col-md-4 col-sm-12 mb-0">
              <multiselect  
                v-model="complexities"
                :options="parameters.complexity" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="complexities"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Project ID" class="col mb-0">
              <multiselect  
                  v-model="ids"
                  :options="idOptions" 
                  :show-labels="false"
                  :multiple="true"
                  :taggable="true"
                  @tag="addID"
                  class="multiselect-primary" 
              />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Responsible" class="col mb-0">
              <multiselect  
                v-model="responsible"
                :options="users" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                track-by="username"
                label="name"
                :taggable="true"
                id="responsible"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Resource Bucket" class="col-md-6 col-sm-12 mb-0">
              <multiselect  
                v-model="buckets"
                :options="parameters.resourceBucket" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="buckets"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>
            <b-form-group label="Portfolios" class="col-md-6 col-sm-12 mb-0">
              <div v-if="currentUser.role === 'Pamacs_user'">
                {{ validatePortfolio.join(", ") }}
              </div>
              <multiselect v-else 
                v-model="portfolios"
                :options="parameters.portfolios" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="portfolios"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Audit" class="col-md-1 col-sm-12 mb-0">
              <b-form-checkbox
                  v-model="audit"
                  value="yes"
                  unchecked-value="no"
              ></b-form-checkbox>
            </b-form-group>
            <b-form-group label="Without Development" class="col-md-3 col-sm-12 mb-0">
              <b-form-checkbox
                  v-model="withoutDev"
                  value="yes"
                  unchecked-value="no"
              ></b-form-checkbox>
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Created after" class="col-md-6 col-sm-12 mb-0">
              <datepicker
                v-model="createdAfter"
                :bootstrapStyling="true"
                :monday-first="true"
                :full-month-name="true"
                placeholder="Created after"
                :calendar-button="true"
                calendar-button-icon="ion ion-md-calendar"
                :clear-button="true" />
            </b-form-group>
            <b-form-group label="Created before" class="col-md-6 col-sm-12 mb-0">
              <datepicker
                v-model="createdBefore"
                :bootstrapStyling="true"
                :monday-first="true"
                :full-month-name="true"
                placeholder="Created before"
                :calendar-button="true"
                calendar-button-icon="ion ion-md-calendar"
                :clear-button="true" />
              </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Go live after" class="col-md-6 col-sm-12 mb-0">
              <datepicker
                v-model="goLiveAfter"
                :bootstrapStyling="true"
                :monday-first="true"
                :full-month-name="true"
                placeholder="Created after"
                :calendar-button="true"
                calendar-button-icon="ion ion-md-calendar"
                :clear-button="true" />
            </b-form-group>
            <b-form-group label="Go live before" class="col-md-6 col-sm-12 mb-0">
              <datepicker
                v-model="goLiveBefore"
                :bootstrapStyling="true"
                :monday-first="true"
                :full-month-name="true"
                placeholder="Created before"
                :calendar-button="true"
                calendar-button-icon="ion ion-md-calendar"
                :clear-button="true" />
              </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>  
            <b-form-group label="Changed after" class="col-md-6 col-sm-12 mb-0">
              <datepicker
                v-model="changedAfter"
                :bootstrapStyling="true"
                :monday-first="true"
                :full-month-name="true"
                placeholder="Changed after"
                :calendar-button="true"
                calendar-button-icon="ion ion-md-calendar"
                :clear-button="true" />
            </b-form-group>
            <b-form-group label="Changed before" class="col-md-6 col-sm-12 mb-0">
              <datepicker
                v-model="changedBefore"
                :bootstrapStyling="true"
                :monday-first="true"
                :full-month-name="true"
                placeholder="Changed before"
                :calendar-button="true"
                calendar-button-icon="ion ion-md-calendar"
                :clear-button="true" />
              </b-form-group>
          </b-form-row>

        <div slot="modal-footer">
            <b-btn variant="primary" @click="getProjectsData"><i class="fas fa-search"></i> Search</b-btn>
        </div>
    </b-modal>
    </div>
</template>


<script>
import { mapState } from 'vuex';
import Multiselect from 'vue-multiselect';
import Datepicker from 'vuejs-datepicker';

export default {
    data() {
        return {
            missingFields: false,
            statuses: [],
            phases: [],
            types: [],
            clients: [],
            priorities: [],
            complexities: [],
            responsible: [],
            members: [],
            buckets: [],
            portfolios: [],
            audit: false,
            withoutDev: false,
            createdAfter: '',
            createdBefore: '',
            changedAfter: '',
            changedBefore: '',
            goLiveAfter: '',
            goLiveBefore: '',
            ids: [],
            idOptions: [],
            projectReportFields: {
                projectId: {},
                name: {},
                'pm.name': {
                    label: 'Responsible'
                },
                description: {},
                status: {},
                phase: {},
                type: {},
                client: {},
                priority: {},
                complexity: {},
                resmanType: {},
                portfolios: {},
                link: {},
                audit: {},
                withoutDev: {},
                strategy: {},
                D1: {},
                D2: {},
                goLive: {},
                D4: {},
                D5: {},
                created: {},
                updated: {}
            },   
            projectExcelFields: {
              'pamacsId': '_id',
              'ID': 'projectId',
              'Name': 'name',
              'Responsible': 'pm.name',
              'Responsible Alias': 'pm.username',
              'Description': 'description',
              'Status': 'status',
              'Phase': 'phase',
              'Type': 'type',
              'Client': 'client',
              'Priority': 'priority',
              'Complexity': 'complexity',
              'Resource Bucket': 'resmanType',
              'Portfolios': 'portfolios',
              'Link': 'link',
              'Audit': 'audit',
              'Without Development': 'withoutDev',
              'Strategy': 'strategy',
              'D1': 'D1',
              'D2': 'D2',
              'Go Live': 'goLive',
              'D4': 'D4',
              'D5': 'D5',
              'Created': 'created',
              'Updated': 'updated'
            },
        }
    },

    components: {
        Multiselect,
        Datepicker
    },

    computed: {
        ...mapState(['parameters','users', 'currentUser']),

        validatePortfolio() {
          if (this.currentUser.role === 'Pamacs_user') {
            return this.portfolios = this.currentUser.portfolios;
          }
        }
    },

    methods: {
        getProjectsData() {
            var responsibles = this.responsible.map(r => r.name);

            this.$store.dispatch('reportProjects', {
                options: {
                    fields: 'projectId name pm description status phase type priority complexity client portfolios resmanType link audit withoutDev strategy created updated D1 D2 goLive D4 D5',
                    statuses: this.statuses,
                    phases: this.phases,
                    types: this.types,
                    clients: this.clients,
                    priorities: this.priorities,
                    complexities: this.complexities,
                    buckets: this.buckets,
                    ids: this.ids,
                    responsibles: responsibles,
                    portfolios: this.portfolios,
                    audit: this.audit,
                    withoutDev: this.withoutDev,
                    createdAfter: this.createdAfter,
                    createdBefore: this.createdBefore,
                    goLiveAfter: this.goLiveAfter,
                    goLiveBefore: this.goLiveBefore,
                    changedAfter: this.changedAfter,
                    changedBefore: this.changedBefore
                },
                fields: this.projectReportFields,
                excelFields: this.projectExcelFields

            });

            this.$refs['paramsModal'].hide()
        },

        addTag (tag, parameter) {
            if (parameter === 'responsible' || parameter === 'members' ) {
              this[parameter].push({
                name: tag, 
                username: tag
              })
            } else if (parameter === 'selectedSystems') {
              this[parameter].push({
                name: tag, 
                description: ''
              })
            } else {
              this[parameter].push(tag)
            }
        },

        addID (tag) {
            tag.split(',').map((item) => {
                if (isNaN(Number(item))) {
                    return;
                }
                this.idOptions.push(item.trim());
                this.ids.push(Number(item.trim()));
            });
        },
    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>