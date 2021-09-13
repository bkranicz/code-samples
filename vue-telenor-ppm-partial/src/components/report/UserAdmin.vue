<template>
    <div>
    <b-modal id="userAdminModal" ref="userAdminModal" size="lg">

        <div slot="modal-title">
          <i class="fas fa-filter"></i> User admin report
        </div>

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

        <b-form-group label="Portfolios" class="col mb-0">
          <multiselect
            v-model="portfolios"
            :options="parameters.portfolios" 
            :searchable="true"
            :show-labels="false"
            :multiple="true"
            class="multiselect-primary" 
          />
        </b-form-group>
      </b-form-row>

      <br>

      <b-form-row>
        <b-form-group label="Time Planning" class="col mb-0">
          <b-form-checkbox
              v-model="resman"
              value="yes"
              unchecked-value="no"
          ></b-form-checkbox>
        </b-form-group>
        <br>
        <b-form-group label="Timesheet" class="col mb-0">
          <b-form-checkbox
              v-model="timesheet"
              value="yes"
              unchecked-value="no"
          ></b-form-checkbox>
        </b-form-group>
        <br>
        <b-form-group label="Report" class="col mb-0">
          <b-form-checkbox
              v-model="reporting"
              value="yes"
              unchecked-value="no"
          ></b-form-checkbox>
        </b-form-group>
      </b-form-row>

      <div slot="modal-footer">
        <b-btn variant="primary" @click="getUserAdminData"><i class="fas fa-search"></i> Search</b-btn>  
      </div>

    </b-modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect';

export default {
    data() {
        return {
            missingFields: false,
            groups: [],
            positions: [],
            portfolios: [],
            resman: "no",
            timesheet: "no",
            reporting: "no",
            userAdminReportFields: {
              username: {},
              name: {},
              group: {},
              position: {},
              portfolios: {},
              resman: {
                label: 'Time Planning'
              },
              timesheet: {
                label: 'Timesheet'
              },
              report: {}
            },
            userAdminExcelFields: {
              'Alias': 'username',
              'Name': 'name',
              'Group': 'group',
              'Position': 'position',
              'Portfolios': 'portfolios',
              'Time planning': 'resman',
              'Timesheet': 'timesheet',
              'Reporting': 'report'
            }
        }
    },
    components: {
        Multiselect
    },
    computed: {
        ...mapState(['parameters']),
    },
    methods: {
        getUserAdminData() {
            this.$store.dispatch('reportUserAdmin', {
                options: {
                    fields: '',
                    groups: this.groups,
                    positions: this.positions,
                    portfolios: this.portfolios,
                    resman: this.resman,
                    timesheet: this.timesheet,
                    reporting: this.reporting
                },
                fields: this.userAdminReportFields,
                excelFields: this.userAdminExcelFields
            })
            this.$refs['userAdminModal'].hide()
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
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>