<template>
    <div>
        <b-modal id="membersModal" ref="membersModal" size="lg">
          <div slot="modal-title">
            <i class="fas fa-filter"></i> Project members report
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
              <b-form-group label="Status" class="col mb-0">
                <multiselect  
                    v-model="statuses"
                    :options="parameters.status" 
                    :searchable="true"
                    :show-labels="false"
                    :multiple="true"
                    :taggable="true"
                    id="statues"
                    @tag="addTag"
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
                class="multiselect-primary" 
                />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Member" class="col mb-0">
              <multiselect  
                v-model="members"
                :options="users" 
                :searchable="true"
                :show-labels="false"
                :multiple="true"
                track-by="username"
                label="name"
                :taggable="true"
                id="members"
                @tag="addTag"
                class="multiselect-primary" 
                />
            </b-form-group>
          </b-form-row>

          <br>

          <b-form-row>
            <b-form-group label="Created after" class="col mb-0">
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

            <b-form-group label="Created before" class="col mb-0">
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

        <div slot="modal-footer">
            <b-btn variant="primary" @click="getMembersData"><i class="fas fa-search"></i> Search</b-btn>
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
            statuses: [],
            portfolios: [],
            members: [],
            createdAfter: '',
            createdBefore: '',
            memberReportFields: {
              projectId: {},
              name: {},
              status: {},
              phase: {},
              'members.name': {
                label: 'Member'
              },
              'members.title': {
                label: 'Title'
              },
            },
            memberExcelFields: {
              'pamacsId': '_id',
              'ID': 'projectId',
              'Name': 'name',
              'Status': 'status',
              'Phase': 'phase',
              'Employee': 'members.name',
              'Employee Alias': 'members.username',
              'Employee Role': 'members.title'
            },
        }
    },
    components: {
        Multiselect,
        Datepicker
    },
    computed: {
        ...mapState(['parameters', 'users', 'currentUser']),

        validatePortfolio() {
          if (this.currentUser.role === 'Pamacs_user') {
            return this.portfolios = this.currentUser.portfolios;
          }
        }
    },
    methods: {
        getMembersData() {
            var membersList = this.members.map(m => m.name);

            this.$store.dispatch('reportMembers', {
                options: {
                    fields: '',
                    ids: this.ids,
                    statuses: this.statuses,
                    portfolios: this.portfolios,
                    members: membersList,
                    createdAfter: this.createdAfter,
                    createdBefore: this.createdBefore
                },
                fields: this.memberReportFields,
                excelFields: this.memberExcelFields
            })
            this.$refs['membersModal'].hide()
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