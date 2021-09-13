<template>
    <div>
        <b-modal id="historyModal" ref="historyModal" size="lg">
            <div slot="modal-title">
                <i class="fas fa-filter"></i> History report
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
            </b-form-row>

            <br>

            <b-form-row>
                <b-form-group label="Resource Bucket" class="col mb-0">
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
                <b-form-group label="Week after *" class="col mb-0">
                <b-form-input 
                    type="week" v-model="weekAfter">
                </b-form-input>
                </b-form-group>

                <b-form-group label="Week before *" class="col mb-0">
                <b-form-input 
                    type="week" v-model="weekBefore">
                </b-form-input>
                </b-form-group>
            </b-form-row>

            <div slot="modal-footer">
                <b-btn variant="primary" @click="getHistoryData"><i class="fas fa-search"></i> Search</b-btn>  
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
            buckets: [],
            portfolios: [],
            weekAfter: [],
            weekBefore: [],
            historyReportFields: {
              'projectId': {
                  label: 'Project ID'
              },
              'history.name': {
                  label: 'Name'
              },
              'history.startWeek': {
                  label: 'Start Week'
              },
              'history.endWeek': {
                  label: 'End Week'
              },
              'history.status': {
                  label: 'Status'
              },
              'history.phase': {
                  label: 'Phase'
              },
              'history.type': {
                  label: 'Type'
              },
              'history.client': {
                  label: 'Client'
              },
              'history.resmanType': {
                  label: 'Resource Bucket'
              },
              'history.complexity': {
                  label: 'Complexity'
              },
              'history.priority': {
                  label: 'Priority'
              }
            },
            historyExcelFields: {
              'pamacsId': 'href',
              'ID': 'projectId',
              'Name': 'name',
              'Start Week': 'startWeek',
              'endWeek': 'endWeek',
              'Status': 'status',
              'Phase': 'phase',
              'Type': 'type',
              'Client': 'client',
              'Resource Bucket': 'resmanType',
              'Complexity': 'complexity',
              'Priority': 'priority'
            }
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
        getHistoryData() {
            this.$store.dispatch('reportHistory', {
                options: {
                    fields: '',
                    ids: this.ids,
                    buckets: this.buckets,
                    portfolios: this.portfolios,
                    weekAfter: this.weekAfter,
                    weekBefore: this.weekBefore
                },
                fields: this.historyReportFields,
                excelFields: this.historyExcelFields

            })
            this.$refs['historyModal'].hide()
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
