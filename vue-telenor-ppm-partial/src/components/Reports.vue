<template>
    <div id="home">
      
    <h4 class="font-weight-bold py-3 mb-4">
        <span class="text-muted font-weight-light"> <span class="lnr lnr-home"></span> / </span> Reports
    </h4>

    <hr class="border-light container-m--x my-0">
    <div class="row row-bordered my-4">
      <div class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <a href="javascript:void(0)" class="card card-hover text-dark my-2">
          <b-card-body class="text-center" v-b-modal.paramsModal>
            <div class="lnr lnr-database display-3 text-primary"></div>
            <h6 class="m-0 mt-3">Projects</h6>
          </b-card-body>
        </a>
      </div>
      <div class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <a href="javascript:void(0)" class="card card-hover text-dark my-2">
          <b-card-body class="text-center" v-b-modal.timeModal>
            <div class="lnr lnr-calendar-full display-3 text-primary"></div>
            <h5 class="m-0 mt-3">Time management</h5>
          </b-card-body>
        </a>
      </div>
<!--       <div class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <a href="javascript:void(0)" class="card card-hover text-dark my-2">
          <b-card-body class="text-center" v-b-modal.historyModal.modal-xl>
            <div class="lnr lnr-history display-3 text-primary"></div>
            <h5 class="m-0 mt-3">History</h5>
          </b-card-body>
        </a>
      </div> -->
      <div class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <a href="javascript:void(0)" class="card card-hover text-dark my-2">
          <b-card-body class="text-center" v-b-modal.statusPhaseModal.modal-xl>
            <div class="lnr lnr-heart-pulse display-3 text-primary"></div>
            <h5 class="m-0 mt-3">Status & Phase changes</h5>
          </b-card-body>
        </a>
      </div>
      <div class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <a href="javascript:void(0)" class="card card-hover text-dark my-2">
          <b-card-body class="text-center" v-b-modal.membersModal>
            <div class="lnr lnr-users display-3 text-primary"></div>
            <h5 class="m-0 mt-3">Project members</h5>
          </b-card-body>
        </a>
      </div>
    </div>
    <hr class="border-light container-m--x my-0">
    <div class="row row-bordered my-4">

      <div class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <a href="javascript:void(0)" class="card card-hover text-dark my-2">
          <b-card-body class="text-center" v-b-modal.documentsModal>
            <div class="lnr lnr-file-empty display-3 text-primary"></div>
            <h5 class="m-0 mt-3">Documents</h5>
          </b-card-body>
        </a>
      </div>
      <div class="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3">
        <a href="javascript:void(0)" class="card card-hover text-dark my-2">
          <b-card-body class="text-center" v-b-modal.userAdminModal>
            <div class="lnr lnr-funnel display-3 text-primary"></div>
            <h5 class="m-0 mt-3">User admin</h5>
          </b-card-body>
        </a>
      </div>
    </div>

    <hr class="border-light container-m--x my-0">
    <br><br>

    <div v-if="reportData && reportData.length > 0">
        <b-card no-body class="shadow p-3 mb-5 bg-white rounded">
            <div class="float-right">
            <JsonExcel
                class   = "btn btn-outline-primary float-right"
                style   = "width: 150px; max-width:150px;"
                :data   = "reportData"
                :fields = "reportExcelFields"
                type    = "xls"
                name    = "pamacs_export.xls">
                <i class="fas fa-file-excel"></i> Download Excel
            </JsonExcel>
            </div>
            <br>
            <b-table
                striped
                responsive
                :fields="reportFields"
                :items="reportData">

              <template slot="portfolios" slot-scope="data">
                {{data.item.portfolios.join(", ")}}
              </template>

              <template slot="docs.link" slot-scope="data">
                <a :href="data.item.docs.link" target="_blank">Open <i class="ion ion-md-open"></i></a>
              </template>

            </b-table>
        </b-card>
    </div>
    <div v-else-if="reportData && reportData.length === 0">
      <b-card no-body class="shadow p-3 mb-5 bg-white rounded">
        <center>
            <h4>No data found</h4>
            <img src="../assets/img/order_unsucess.gif" alt="Not found">
        </center>
      </b-card>
    </div>

   <project-report></project-report>
   <time-report></time-report>
   <history-report></history-report>
   <status-phase-report></status-phase-report>
   <member-report></member-report>
   <document-report></document-report>
   <user-admin-report></user-admin-report>

    </div>
</template>


<script>
import { mapState } from 'vuex';
import JsonExcel from 'vue-json-excel';
import Project from './report/Project';
import Time from './report/Time';
import History from './report/History';
import StatusPhase from './report/StatusPhase';
import Members from './report/Members';
import Documents from './report/Documents';
import UserAdmin from './report/UserAdmin';

export default {
    data() {
        return {
        }
    },
    components: {
        JsonExcel,
        'project-report': Project,
        'time-report': Time,
        'history-report': History,
        'status-phase-report': StatusPhase,
        'member-report': Members,
        'document-report': Documents,
        'user-admin-report': UserAdmin
    },
    computed: {
        ...mapState(['loadState', 'currentUser', 'reportData', 'reportFields', 'reportExcelFields']),
    },
    methods: {

    },
    mounted() {
      this.$store.dispatch('getParameters');
      this.$store.dispatch('getExternalUsers');
      this.$store.dispatch('getSystems');
      this.$store.commit('updateReport', {
        data: '',
        fields: {},
        excelFields: {}
      })
    } 
}

</script>