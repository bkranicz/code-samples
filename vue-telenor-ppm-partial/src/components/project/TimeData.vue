<template>
    <div>
        <div class="row justify-content-between">
            <div class="col-sm-12 col-md-6 col-lg-3 demo-inline-spacing" >
                <vue-monthly-picker
                    id="timeMonthInput"
                    style="width: 100px; !important"
                    :clearOption="false"
                    dateFormat="YYYY-MM"
                    v-model="timeMonth">
                </vue-monthly-picker>
            </div>
            <div v-if="reportData && reportData.length > 0" class="col-sm-12 col-md-6 col-lg-3">
<!--                 <JsonExcel
                    class   = "btn btn-outline-primary float-right"
                    style   = "width: 150px; max-width:150px;"
                    :data   = "reportData"
                    :fields = "timeMonthExcelFields"
                    type    = "xls"
                    name    = "pamacs_export.xls">
                    <i class="fas fa-file-excel"></i> Excel download
                </JsonExcel> -->
                <vue-excel-xlsx
                    class = "btn btn-outline-primary float-right"
                    style = "width: 150px; max-width:150px;"
                    :data="reportData"
                    :columns="columns"
                    :filename="'pamacs_time_data'"
                    :sheetname="'Time Data'"
                    >
                    <i class="fas fa-file-excel"></i> Download details
                </vue-excel-xlsx>
            </div>
        </div>
        
        <div v-if="!reportData || reportData.length === 0">
            <center>
                <h1><i class="far fa-calendar-times"></i></h1>
                No time data to show
            </center>
        </div>
        <div v-else>
            <br>
            <b-table 
                striped 
                hover 
                responsive
                :items="reportData" 
                :fields="timeDataFields">

                <template slot="monthlyResman" slot-scope="data">
                    {{data.item.monthlyResman + ' h'}}
                </template>

                <template slot="monthlyTimesheet" slot-scope="data">
                    {{data.item.monthlyTimesheet + ' h'}}
                </template>

            </b-table>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import VueMonthlyPicker from 'vue-monthly-picker';
import JsonExcel from 'vue-json-excel';
import moment from 'moment';

export default {
    data() {
        return {
            id: this.$route.params.id,
            timeMonth: moment(),
            timeDataFields: {
                name: {
                    sortable: true
                },
                group: {
                    sortable: true
                },
                position: {
                    sortable: true
                },
                monthlyResman: {
                    label: 'Plan',
                    sortable: true
                },
                monthlyTimesheet: {
                    label: 'Timesheet',
                    sortable: true
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
              'Plan (H)': {
                  field: 'monthlyResman',
                  callback: (value) => {
                      return value.replace(".", ",");
                  }
              },
            },
            columns: [
                {
                    label: "Employee",
                    field: "name"
                },
                {
                    label: "Employee alias",
                    field: "_id"
                },
                {
                    label: "Group",
                    field: "group"
                },
                {
                    label: "Position",
                    field: "position"
                },
                {
                    label: "Timesheet (H)",
                    field: "monthlyTimesheet",
                    dataFormat: this.numberFormat
                },
                {
                    label: "Plan (H)",
                    field: "monthlyResman",
                    dataFormat: this.numberFormat
                }
            ]
        }
    },
    computed: {
        ...mapState(['reportData']),
    },
    components: {
        JsonExcel,
        VueMonthlyPicker
    },
    methods: {
        refreshTimeData() {
            this.$store.dispatch('reportTimeMonth', {
                options: {
                    pamacsId: this.id,
                    selectedMonth: moment(this.timeMonth).format('YYYY-MM')
                },
                fields: this.timeDataFields,
                excelFields: this.timeMonthExcelFields
            })
        },
        numberFormat(value) {
            if (value) {
                return value.replace(".", ",");
            } else {
                return null;
            }
        }
    },
    watch: {
        timeMonth: function (newMonth) {
            this.refreshTimeData()
        }
    },
    mounted() {
        this.$store.dispatch('reportTimeMonth', {
            options: {
                pamacsId: this.id,
                selectedMonth: moment(this.timeMonth).format('YYYY-MM')
            },
            fields: this.timeDataFields,
            excelFields: this.timeMonthExcelFields
        })
    }
}

</script>

<style scoped>
.vue-monthly-picker .input {
    width: 100px !important;
    max-width: 100px !important;
}
</style>

