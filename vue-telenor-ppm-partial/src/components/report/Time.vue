<template>
    <div>
        <b-modal id="timeModal" ref="timeModal" size="lg">
          <div slot="modal-title">
            <i class="fas fa-filter"></i> Time management report
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
            <b-form-group label="System" class="col mb-0">
                <multiselect  
                    v-model="selectedSystems"
                    :options="systems"
                    label="name" 
                    :show-labels="false"
                    :multiple="true"
                    :taggable="true"
                    id="selectedSystems"
                    track-by="name"
                    @tag="addTag"
                    class="multiselect-primary" 
                />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Groups" class="col mb-0">
              <multiselect  
                v-model="groups"
                :options="parameters.groups" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="groups"
                @tag="addTag"
                class="multiselect-primary" 
              />
            </b-form-group>
            <b-form-group label="Positions" class="col mb-0">
              <multiselect  
                v-model="positions"
                :options="parameters.positions" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                :taggable="true"
                id="positions"
                @tag="addTag"
                class="multiselect-primary" 
              />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label=" ">
              <b-form-radio-group
                v-model="timeReportOption"
                :options="timeReportOptions"
                name="radio-inline"
              ></b-form-radio-group>
            </b-form-group>
          </b-form-row>

          <b-form-row v-if="timeReportOption === 'week'">
            <b-form-group label="Week after *" class="col mb-0">
              <b-form-input 
                type="week" v-model="timeAfter">
              </b-form-input>
            </b-form-group>

            <b-form-group label="Week before *" class="col mb-0">
              <b-form-input 
                type="week" v-model="timeBefore">
              </b-form-input>
            </b-form-group>
          </b-form-row>

          <b-form-row v-if="timeReportOption === 'month'">
            <vue-monthly-picker
              :clearOption="false"
              dateFormat="YYYY-MM"
              v-model="timeMonth">
            </vue-monthly-picker>
          </b-form-row>

          <br>

          <b-form-row>
            <p v-if="missingFields" style="color: red;">Please specify a date range</p>
          </b-form-row>
        <div slot="modal-footer">
            <b-btn variant="primary" @click="getTimeData"><i class="fas fa-search"></i> Search</b-btn>
        </div>
    </b-modal>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import Multiselect from 'vue-multiselect';
import Datepicker from 'vuejs-datepicker';
import VueMonthlyPicker from 'vue-monthly-picker';

export default {
    data() {
        return {
            missingFields: false,
            ids: [],
            idOptions: [],
            selectedSystems: [],
            groups: [],
            positions: [],
            timeReportOptions: [
              { text: 'Weekly split', value: 'week' },
              { text: 'Aggregate to month', value: 'month' }
            ],
            timeReportOption: 'week',
            timeAfter: '',
            timeMonth: moment(),
            timeBefore: '',

            timeReportFields: {
              'employeeName': {
                label: 'Name'
              },
              'group': {
                label: 'Group'
              },
              'position': {
                label: 'Position'
              },
              'projectId': {},
              'project.name': {
                label: 'Name'
              },
              'weekId': {},
              'system': {},
              'project.status': {
                label: 'Status'
              },
              'project.phase': {
                label: 'Phase'
              },
              'project.type': {
                label: 'Type'
              },
              'project.client': {
                label: 'Client'
              },
              'project.resmanType': {
                label: 'Resource Bucket'
              },
              'project.complexity': {
                label: 'Complexity'
              },
              'project.priority': {
                label: 'Priority'
              },
              'resman': {
                label: 'Plan'
              },
              'timesheet': {
                label: 'Actual'
              }
            },

            timeExcelFields: {
              'Employee': 'employeeName',
              'Employee Alias': 'employee',
              'Position': 'position',
              'Group': 'group',
              'pamacsId': '_id',
              'ID': 'projectId',
              'Name': 'project.name',
              'Week ID': 'weekId',
              'IT System': 'system',
              'Status': 'project.status',
              'Phase': 'project.phase',
              'Type': 'project.type',
              'Client': 'project.client',
              'Resource Bucket': 'project.resmanType',
              'IT Complexity': 'project.complexity',
              'Priority': 'project.priority',
              'Plan': {
                  field: 'resman',
                  callback: (value) => {
                      return value.replace(".", ",");
                  }
              },
              'Actual': {
                  field: 'timesheet',
                  callback: (value) => {
                      return value.replace(".", ",");
                  }
              }
            },

            timeMonthReportFields: {
              name: {},
              group: {},
              position: {},
              monthlyTimesheet: {
                label: 'Timesheet (H)'
              },
              monthlyTimesheetPercentage: {
                label: 'Timesheet (%)'
              },
              monthlyResman: {
                label: 'Plan (H)'
              },
              monthlyResmanPercentage: {
                label: 'Plan (%)'
              }
            },

            timeMonthExcelFields: {
              'Employee': 'name',
              'Employee alias': '_id',
              'Group': 'group',
              'Position': 'position',
              'Timesheet (H)': {
                  field: 'monthlyTimesheet',
                  callback: (value) => {
                      return value.replace(".", ",");
                  }
              },
              'Timesheet (%)': 'monthlyTimesheetPercentage',
              'Plan (H)': {
                  field: 'monthlyResman',
                  callback: (value) => {
                      return value.replace(".", ",");
                  }
              },
              'Plan (%)': 'monthlyResmanPercentage'
            },
        }
    },

    components: {
        Multiselect,
        Datepicker,
        VueMonthlyPicker
    },

    computed: {
        ...mapState(['parameters', 'systems']),
    },

    methods: {
        getTimeData() {
          var systems = this.selectedSystems.map(s => s.name);

          if (this.timeReportOption === 'week' && (!this.timeAfter || !this.timeBefore)) {
            this.missingFields = true;
          
          } else if (this.timeReportOption === 'week') {
            this.missingFields = false;
            this.$store.dispatch('reportTime', {
                options: {
                    fields: '',
                    ids: this.ids,
                    systems: systems,
                    groups: this.groups,
                    positions: this.positions,
                    after: this.timeAfter,
                    before: this.timeBefore
                },
                fields: this.timeReportFields,
                excelFields: this.timeExcelFields

            });
            this.$refs['timeModal'].hide()
          
          } else if (this.timeReportOption === 'month') {
            this.$store.dispatch('reportTimeMonth', {
                options: {
                    fields: '',
                    ids: this.ids,
                    systems: systems,
                    groups: this.groups,
                    positions: this.positions,
                    selectedMonth: moment(this.timeMonth).format('YYYY-MM')
                },
                fields: this.timeMonthReportFields,
                excelFields: this.timeMonthExcelFields

            })

            this.$refs['timeModal'].hide()
          }
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