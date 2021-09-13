<template>
    <div>
        <b-modal id="documentsModal" ref="documentsModal" size="lg">
            <div slot="modal-title">
                <i class="fas fa-filter"></i> Documents report
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
                <b-form-group label="Phase" class="col mb-0">
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

                <b-form-group label="Type" class="col mb-0">
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

                <b-form-group label="IT Impact" class="col mb-0">
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
                <b-form-group label="Go live after" class="col mb-0">
                    <datepicker
                    v-model="goLiveAfter"
                    :bootstrapStyling="true"
                    :monday-first="true"
                    :full-month-name="true"
                    placeholder="Go live after"
                    :calendar-button="true"
                    calendar-button-icon="ion ion-md-calendar"
                    :clear-button="true" />
                </b-form-group>
                <b-form-group label="Go live before" class="col mb-0">
                    <datepicker
                    v-model="goLiveBefore"
                    :bootstrapStyling="true"
                    :monday-first="true"
                    :full-month-name="true"
                    placeholder="Go live before"
                    :calendar-button="true"
                    calendar-button-icon="ion ion-md-calendar"
                    :clear-button="true" />
                </b-form-group>
            </b-form-row>

            <div slot="modal-footer">
                <b-btn variant="primary" @click="getDocumentsData"><i class="fas fa-search"></i> Search</b-btn>  
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
            phases: [],
            types: [],
            complexities: [],
            goLiveAfter: '',
            goLiveBefore: '',
            documentsReportFields: {
              projectId: {},
              name: {},
              status: {},
              phase: {},
              type: {},
              complexity: {},
              portfolios: {},
              goLive: {},
              'docs.docType': {
                label: 'Document Type'
              },
              'docs.link': {
                label: 'Document Link'
              }
            },
            documentsExcelFields: {
              'pamacsId': '_id',
              'ID': 'projectId',
              'Name': 'name',
              'Status': 'status',
              'Phase': 'phase',
              'Type': 'type',
              'Complexity': 'complexity',
              'Portfolios': 'portfolios',
              'Go Live': 'goLive',
              'Document Type': 'docs.docType',
              'Document Link': 'docs.link'
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
        getDocumentsData() {
            this.$store.dispatch('reportDocuments', {
                options: {
                    fields: '',
                    ids: this.ids,
                    statuses: this.statuses,
                    portfolios: this.portfolios,
                    phases: this.phases,
                    types: this.types,
                    complexities: this.complexities,
                    goLiveAfter: this.goLiveAfter,
                    goLiveBefore: this.goLiveBefore
                },
                fields: this.documentsReportFields,
                excelFields: this.documentsExcelFields

            })
            this.$refs['documentsModal'].hide()
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
