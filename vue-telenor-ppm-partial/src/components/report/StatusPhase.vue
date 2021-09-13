<template>
    <div>
    <b-modal id="statusPhaseModal" ref="statusPhaseModal" size="lg">
          <div slot="modal-title">
            <i class="fas fa-filter"></i> Status & Phase changes report
          </div>

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

            <b-form-group label="Portfolios" class="col mb-0">
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

          <br><br>

          <b-form-row>
              <b-form-group label="Current status" class="col mb-0">
                <multiselect  
                    v-model="currentStatuses"
                    :options="parameters.status" 
                    :show-labels="false"
                    :multiple="true"
                    :taggable="true"
                    id="currentStatuses"
                    @tag="addTag"
                    class="multiselect-primary" 
                />
              </b-form-group>

              <b-form-group label="Changed status" class="col mb-0">
                <multiselect  
                    v-model="newStatuses"
                    :options="parameters.status" 
                    :show-labels="false"
                    :multiple="true"
                    :taggable="true"
                    id="newStatuses"
                    @tag="addTag"
                    class="multiselect-primary" 
                />
              </b-form-group>
            </b-form-row>

            <br>

            <b-form-row>

              <b-form-group label="Status change after" class="col mb-0">
                <datepicker
                  v-model="statusChangeAfter"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :full-month-name="true"
                  placeholder="After"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>

              <b-form-group label="Status change before" class="col mb-0">
                <datepicker
                  v-model="statusChangeBefore"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :full-month-name="true"
                  placeholder="Before"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>
          </b-form-row>

          <br><br>

          <b-form-row>
              <b-form-group label="Current phase" class="col mb-0">
                <multiselect  
                    v-model="currentPhases"
                    :options="parameters.phase" 
                    :show-labels="false"
                    :multiple="true"
                    :taggable="true"
                    id="currentPhases"
                    @tag="addTag"
                    class="multiselect-primary" 
                />
              </b-form-group>

              <b-form-group label="Changed phase" class="col mb-0">
                <multiselect  
                    v-model="newPhases"
                    :options="parameters.phase" 
                    :show-labels="false"
                    :multiple="true"
                    :taggable="true"
                    id="newPhases"
                    @tag="addTag"
                    class="multiselect-primary" 
                />
              </b-form-group>
            </b-form-row>

            <br>

            <b-form-row>
              <b-form-group label="Phase change after" class="col mb-0">
                <datepicker
                  v-model="phaseChangeAfter"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :full-month-name="true"
                  placeholder="After"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>

              <b-form-group label="Phase change before" class="col mb-0">
                <datepicker
                  v-model="phaseChangeBefore"
                  :bootstrapStyling="true"
                  :monday-first="true"
                  :full-month-name="true"
                  placeholder="Before"
                  :calendar-button="true"
                  calendar-button-icon="ion ion-md-calendar"
                  :clear-button="true" />
              </b-form-group>
          </b-form-row>

        <div slot="modal-footer">
            <b-btn variant="primary" @click="getStatusPhaseData"><i class="fas fa-search"></i> Search</b-btn>
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
            ids: [],
            idOptions: [],
            portfolios: [],
            currentStatuses: [],
            newStatuses: [],
            statusChangeAfter: '',
            statusChangeBefore: '',
            currentPhases: [],
            newPhases: [],
            phaseChangeAfter: '',
            phaseChangeBefore: '',
            statusPhaseReportFields: {
              projectId: {},
              name: {},
              status: {
                label: 'Current Status'
              },
              'statuses.status': {
                label: 'Changed Status'
              },              
              'statuses.date': {
                label: 'Status Change Date'
              },
              phase: {
                label: 'Current Phase'
              },
              'phases.phase': {
                label: 'Changed Phase'
              },
              'phases.date': {
                label: 'Phase Change Date'
              }
            },

            statusPhaseExcelFields: {
              'pamacsId': '_id',
              'ID': 'projectId',
              'Name': 'name',
              'Current Status': 'status',
              'Changed Status': 'statuses.status',
              'Status Change Date': 'statuses.date',
              'Current Phase': 'phase',
              'Changed Phase': 'phases.phase',
              'Phase Change Date': 'phases.date'
            },
        }
    },
    components: {
        Multiselect,
        Datepicker
    },
    computed: {
        ...mapState(['parameters', 'currentUser']),

        validatePortfolio() {
          if (this.currentUser.role === 'Pamacs_user') {
            return this.portfolios = this.currentUser.portfolios;
          }
        }
    },
    methods: {

        getStatusPhaseData() {

          this.$store.dispatch('reportStatusPhase', {
              options: {
                fields: '',
                ids: this.ids,
                portfolios: this.portfolios,
                currentStatuses: this.currentStatuses,
                newStatuses: this.newStatuses,
                statusChangeAfter: this.statusChangeAfter,
                statusChangeBefore: this.statusChangeBefore,
                currentPhases: this.currentPhases,
                newPhases: this.newPhases,
                phaseChangeAfter: this.phaseChangeAfter,
                phaseChangeBefore: this.phaseChangeBefore
              },
              fields: this.statusPhaseReportFields,
              excelFields: this.statusPhaseExcelFields
          });

          this.$refs['statusPhaseModal'].hide()

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
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>