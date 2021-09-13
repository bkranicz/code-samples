<template>
    <div id="home">
        <div>
            <h4 class="font-weight-bold py-3 mb-4">
            <span class="text-muted font-weight-light"> 
                <span class="lnr lnr-home"></span> / Dashboard / </span>Quality Management 
            </h4>
            <hr class="border-light container-m--x my-4">
        </div>
        <div class="row">
            <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
                <b-form-row>
                    <b-form-group class="p-1">
                        <multiselect  
                            v-model="projectIds"
                            :options="idOptions" 
                            :show-labels="false"
                            :multiple="true"
                            :taggable="true"
                            placeholder="Project IDs"
                            @tag="addID"
                            class="multiselect-primary" 
                            style="min-width: 255px"
                        />
                    </b-form-group>
                    <b-form-group class="p-1">
                        <multiselect  
                            v-model="withoutDev"
                            :options="withoutDevOptions" 
                            :show-labels="false"
                            :multiple="false"
                            :taggable="true"
                            placeholder="Without development"
                            @tag="addID"
                            class="multiselect-primary" 
                            style="min-width: 255px"
                        />
                    </b-form-group>
                </b-form-row>
                <b-form-row>
                    <b-form-group class="p-1">
                        <datepicker
                            v-model="goLiveAfter"
                            :bootstrapStyling="true"
                            :monday-first="true"
                            :full-month-name="true"
                            placeholder="Go Live after"
                            :calendar-button="true"
                            calendar-button-icon="ion ion-md-calendar"
                            :clear-button="true" 
                            style="min-width: 255px"/>
                    </b-form-group>
                    <b-form-group class="p-1">
                        <datepicker
                            v-model="goLiveBefore"
                            :bootstrapStyling="true"
                            :monday-first="true"
                            :full-month-name="true"
                            placeholder="Go Live before"
                            :calendar-button="true"
                            calendar-button-icon="ion ion-md-calendar"
                            :clear-button="true" 
                            style="min-width: 255px"/>
                    </b-form-group>
                </b-form-row>
                <b-form-row>
                    <b-form-group class="p-1">
                        <datepicker
                            v-model="closedAfter"
                            :bootstrapStyling="true"
                            :monday-first="true"
                            :full-month-name="true"
                            placeholder="Closed after"
                            :calendar-button="true"
                            calendar-button-icon="ion ion-md-calendar"
                            :clear-button="true" 
                            style="min-width: 255px"/>
                    </b-form-group>
                    <b-form-group class="p-1">
                        <datepicker
                            v-model="closedBefore"
                            :bootstrapStyling="true"
                            :monday-first="true"
                            :full-month-name="true"
                            placeholder="Closed before"
                            :calendar-button="true"
                            calendar-button-icon="ion ion-md-calendar"
                            :clear-button="true" 
                            style="min-width: 255px"/>
                    </b-form-group>

                    <b-form-group class="p-1">
                        <b-btn 
                            @click="filterDocuments"
                            class="btn-primary mb-0">
                            <i class="fas fa-sync-alt"></i>  Filter
                        </b-btn>
                    </b-form-group>
                </b-form-row>
            </div>

        </div>
        <div >
            <b-card no-body class="shadow p-3 mb-5 bg-white rounded"> 
                <div class="float-right">
<!--                     <JsonExcel
                        class   = "btn btn-outline-primary float-right"
                        style   = "width: 150px; max-width:150px;"
                        :data   = "documents"
                        :fields = "excelFields"
                        type    = "xls"
                        name    = "pamacs_export.xls">
                        <i class="fas fa-file-excel"></i> Download Excel
                    </JsonExcel> -->
                    <vue-excel-xlsx
                        class = "btn btn-outline-primary float-right"
                        style = "width: 150px; max-width:150px;"
                        :data="documents"
                        :columns="columns"
                        :filename="'pamacs_quality_data'"
                        :sheetname="'Quality Dashboard'"
                        >
                        <i class="fas fa-file-excel"></i> Download Excel
                    </vue-excel-xlsx>
                </div>
                <br>
                <b-table
                    :items="documents"
                    :fields="fields"
                    :striped="true"
                    class="my-table-scroll"
                    sticky-header="150px"
                    responsive
                    >

                    <template slot="projectId" slot-scope="data">
                        <a :href="'/#/project/' + data.item._id"><b>{{data.item.projectId}}</b></a>
                    </template>

                    <template slot="CD" slot-scope="data">
                        <div v-if="!data.item.CD">
                            <i class="fas fa-times" style="color: #FF9494"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-check" style="color: #00B200"></i>
                        </div>     
                    </template>

                    <template slot="TFS" slot-scope="data">
                        <div v-if="!data.item.TFS">
                            <i class="fas fa-times" style="color: #FF9494"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-check" style="color: #00B200"></i>
                        </div>     
                    </template>

                    <template slot="SP" slot-scope="data">
                        <div v-if="!data.item.SP">
                            <i class="fas fa-times" style="color: #FF9494"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-check" style="color: #00B200"></i>
                        </div>     
                    </template>

                    <template slot="SRS" slot-scope="data">
                        <div v-if="!data.item.SRS">
                            <i class="fas fa-times" style="color: #FF9494"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-check" style="color: #00B200"></i>
                        </div>     
                    </template>

                    <template slot="Param" slot-scope="data">
                        <div v-if="!data.item.Param">
                            <i class="fas fa-times" style="color: #FF9494"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-check" style="color: #00B200"></i>
                        </div>     
                    </template>


                    <template slot="Testing" slot-scope="data">
                        <div v-if="!data.item.Testing">
                            <i class="fas fa-times" style="color: #FF9494"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-check" style="color: #00B200"></i>
                        </div>     
                    </template>

                    <template slot="GoLive" slot-scope="data">
                        <div v-if="!data.item.GoLive">
                            <i class="fas fa-times" style="color: #FF9494"></i>
                        </div>
                        <div v-else>
                            <i class="fas fa-check" style="color: #00B200"></i>
                        </div>     
                    </template>

                </b-table>
             </b-card>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import Datepicker from 'vuejs-datepicker'
import JsonExcel from 'vue-json-excel'

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
            sortBy: 'username',
            stickyHeader: true,
            sortDesc: false,
            currentPage: 1,
            currentPage: 0,
            perPage: 10,
            keyword: '',
            goLiveAfter: '',
            goLiveBefore: '',
            closedAfter: '',
            closedBefore: '',
            projectIds: [],
            idOptions: [],
            withoutDev: '',
            withoutDevOptions: ['Yes', 'No'],
            fields: {
                projectId: {
                    label: 'ID'
                },  
                name: {
                    label: 'Name'
                }, 
                'pm.name': {
                    label: 'Responsible'
                },
                convertedGoLive: {
                    label: 'Go Live'
                },
                status: {
                    label: 'Status'
                },
                phase: {
                  label: 'Phase'
                },
                type: {
                    label: 'Type'
                },
                complexity: {
                    label: 'Complexity'
                },
                CD: {
                    label: 'CD'
                },
                TFS: {
                    label: 'TFS'
                },
                SP: {
                    label: 'SP'
                },
                SRS: {
                    label: 'SRS'
                },
                Param: {
                    label: 'Param'
                },
                Testing: {
                    label: 'Testing'
                },
                GoLive: {
                    label: 'Go Live decision'
                },
            },
            excelFields: {
                'pamacsId': '_id',
                'ID': 'projectId',
                'Name': 'name',
                'Responsible': 'pm.name',
                'Go Live': 'convertedGoLive',
                'Status': 'status',
                'Phase': 'phase',
                'Type': 'type',
                'Complexity': 'complexity',
                'CD': 'CD',
                'TFS': 'TFS',
                'SP': 'SP',
                'SRS': 'SRS',
                'Param': 'Param',
                'Testing': 'Testing',
                'Go Live decision': 'GoLive'
            },            
            columns: [
                {
                    label: "pamacsId",
                    field: "_id"
                },
                {
                    label: "ID",
                    field: "projectId"
                },
                {
                    label: "Name",
                    field: "name"
                },
                {
                    label: "Responsible",
                    field: "pm.name"
                },
                {
                    label: "Go Live",
                    field: "convertedGoLive"
                },
                {
                    label: "Status",
                    field: "status"
                },
                {
                    label: "Phase",
                    field: "phase"
                },
                {
                    label: "Type",
                    field: "type"
                },
                {
                    label: "Complexity",
                    field: "complexity"
                },
                {
                    label: "CD",
                    field: "CD"
                },
                {
                    label: "TFS",
                    field: "TFS"
                },
                {
                    label: "SP",
                    field: "SP"
                },
                {
                    label: "SRS",
                    field: "SRS"
                },
                {
                    label: "Param",
                    field: "Param"
                },
                {
                    label: "Testing",
                    field: "Testing"
                },
                {
                    label: "Go Live decision",
                    field: "GoLive"
                }
            ]
        }
    },

    components: {
        Datepicker,
        JsonExcel,
        Multiselect
    },

    computed: {
      ...mapState(['loadState', 'documents']),
    },

    methods: {
        filterDocuments() {
            this.$store.dispatch('getMandatoryDocuments', {
                projectIds: this.projectIds,
                withoutDev: this.withoutDev,
                goLiveAfter: this.goLiveAfter,
                goLiveBefore: this.goLiveBefore,
                closedAfter: this.closedAfter,
                closedBefore: this.closedBefore
            });
        },
        addID (tag) {
            tag.split(',').map((item) => {
                this.idOptions.push(item.trim());
                this.projectIds.push(Number(item.trim()));
            });
        },
    },

    mounted() {
      //this.$store.dispatch('getMandatoryDocuments', {});
    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>
