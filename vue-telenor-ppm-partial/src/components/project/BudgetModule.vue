<template>
    <div id="home">
            <div class="row">
                <div class="col">
                    <datepicker 
                        style="width: 150px"
                        :minimumView="'year'" 
                        :maximumView="'year'" 
                        :initialView="'year'"
                        :bootstrapStyling="true"
                        :calendar-button="true"
                        :format="yearFormatter"
                        calendar-button-icon="ion ion-md-calendar"
                        class="float-left"
                        v-model="budgetYear">
                    </datepicker>
                </div>
                <div class="col">
                    <div class="float-right">
                        <!-- <JsonExcel
                            class   = "btn btn-outline-primary float-right"
                            style   = "width: 150px; max-width:150px;"
                            :data   = "budgetDetails"
                            :fields = "budgetExcelFields"
                            type    = "xls"
                            name    = "pamacs_budget_export.xls">
                            <i class="fas fa-file-excel"></i> Download details
                        </JsonExcel> -->
                        <vue-excel-xlsx
                            class = "btn btn-outline-primary float-right"
                            style = "width: 150px; max-width:150px;"
                            :data="budgetDetails"
                            :columns="columns"
                            :filename="'pamacs_budget'"
                            :sheetname="'budget'"
                            >
                            <i class="fas fa-file-excel"></i> Download details
                        </vue-excel-xlsx>
                    </div>
                </div>
            </div>

            <br>

            <div class="row">
                <div class="col-md-12 col-lg-6">
                    <b-card no-body class="mb-4">
                    <b-card-header class="border-0 pb-0">Total actual:</b-card-header>
                    <b-card-body class="text-center text-success text-xlarge py-3">{{ totalAmount | hufFormat }} HUF</b-card-body>
                    <b-card-footer class="border-0 small pt-0">
                        <div class="float-right text-success">
                        <small class="ion ion-ios-cash"></small> 
                        </div>
                        <span class="text-muted">In the closed financial quarters</span>
                    </b-card-footer>
                    </b-card>
                </div>
                <div class="col-md-12 col-lg-6">
                    <b-card no-body class="mb-4">
                    <b-card-header class="border-0 pb-0">Remaining forecast:</b-card-header>
                    <b-card-body class="text-center text-primary text-xlarge py-3">{{ remainingForecast | hufFormat }} HUF</b-card-body>
                    <b-card-footer class="border-0 small pt-0">
                        <div class="float-right text-primary">
                        <small class="ion ion-ios-trending-up"></small> 
                        </div>
                        <span class="text-muted">From the current financial quarter</span>
                    </b-card-footer>
                    </b-card>
                </div>
            </div>


            <div class="table-responsive">                             
                <table class="table table-bordered table-hover" id="budgetTable">
                    <div v-for="(category, index) in budgetCategories" :key="index">
                        <thead v-if="index===0">
                            <tr>
                                <th></th>
                                <th></th>
                                <th style="white-space:nowrap;">Q1</th>
                                <th style="white-space:nowrap;">Q2</th>
                                <th style="white-space:nowrap;">Q3</th>
                                <th style="white-space:nowrap;">Q4</th>
                                <th style="white-space:nowrap;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="3">{{ category.name }}</td>
                                <td>Forecast</td>
                                <td>
                                    <b-input
                                        v-if="editMode && budgetWrite && selectedYear >= currentYear"
                                        placeholder="0"
                                        style="text-align: right;"
                                        type="number" min="0"
                                        @change="autosave"
                                        v-model="budgetData[category.key]['forecast']['Q1']">
                                    </b-input>
                                    <div v-else :class='budgetClass(budgetData[category.key]["forecast"]["Q1"])' style="text-align: right;">
                                        {{ budgetData[category.key]['forecast']['Q1'] | hufFormat }}
                                    </div>
                                </td>
                                <td>
                                    <b-input
                                        v-if="editMode && budgetWrite && selectedYear >= currentYear"
                                        placeholder="0"
                                        style="text-align: right;"
                                        type="number" min="0"
                                        @change="autosave"
                                        v-model="budgetData[category.key]['forecast']['Q2']">
                                    </b-input>
                                    <div v-else :class='budgetClass(budgetData[category.key]["forecast"]["Q2"])' style="text-align: right;">
                                        {{ budgetData[category.key]['forecast']['Q2'] | hufFormat }}
                                    </div>
                                </td>
                                <td>
                                    <b-input
                                        v-if="editMode && budgetWrite && selectedYear >= currentYear"
                                        placeholder="0"
                                        style="text-align: right;"
                                        type="number" min="0"
                                        @change="autosave"
                                        v-model="budgetData[category.key]['forecast']['Q3']">
                                    </b-input>
                                    <div v-else :class='budgetClass(budgetData[category.key]["forecast"]["Q3"])' style="text-align: right;">
                                        {{ budgetData[category.key]['forecast']['Q3'] | hufFormat }}
                                    </div>
                                </td>
                                <td>
                                    <b-input
                                        v-if="editMode && budgetWrite && selectedYear >= currentYear"
                                        placeholder="0"
                                        style="text-align: right;"
                                        type="number" min="0"
                                        @change="autosave"
                                        v-model="budgetData[category.key]['forecast']['Q4']">
                                    </b-input>
                                    <div v-else :class='budgetClass(budgetData[category.key]["forecast"]["Q4"])' style="text-align: right;">
                                        {{ budgetData[category.key]['forecast']['Q4'] | hufFormat }}
                                    </div>
                                </td>
                                <td style="font-weight: bold; text-align: right;" class="bg-light">
                                     {{ rowSums(budgetData[category.key]['forecast'] )}}
                                </td>
                            </tr>
                            <tr>
                                <td>Obligo</td>
                                <td 
                                    :class='budgetClass(budgetData[category.key]["obligo"]["Q1"])' style="text-align: right;">
                                    {{ budgetData[category.key]["obligo"]["Q1"]  | hufFormat }}
                                </td>
                                <td
                                    :class='budgetClass(budgetData[category.key]["obligo"]["Q2"])' style="text-align: right;">
                                    {{ budgetData[category.key]["obligo"]["Q2"]  | hufFormat }}
                                </td>
                                <td
                                    :class='budgetClass(budgetData[category.key]["obligo"]["Q3"])' style="text-align: right;">
                                    {{ budgetData[category.key]["obligo"]["Q3"]  | hufFormat }}
                                </td>
                                <td
                                    :class='budgetClass(budgetData[category.key]["obligo"]["Q4"])' style="text-align: right;">
                                    {{ budgetData[category.key]["obligo"]["Q4"]  | hufFormat }}
                                </td>
                                <td style="font-weight: bold; text-align: right" class="bg-light">{{ budgetData[category.key]["obligo"]["sum"] | hufFormat }}</td>
                            </tr>
                            <tr>
                                <td>Actual</td>
                                <td
                                    :class='budgetClass(budgetData[category.key]["actual"]["Q1"])' style="text-align: right;">
                                    {{ budgetData[category.key]["actual"]["Q1"]  | hufFormat }}
                                </td>
                                <td
                                    :class='budgetClass(budgetData[category.key]["actual"]["Q2"])' style="text-align: right;">
                                    {{ budgetData[category.key]["actual"]["Q2"]  | hufFormat }}
                                </td>
                                <td
                                    :class='budgetClass(budgetData[category.key]["actual"]["Q3"])' style="text-align: right;">
                                    {{ budgetData[category.key]["actual"]["Q3"]  | hufFormat }}
                                </td>
                                <td
                                    :class='budgetClass(budgetData[category.key]["actual"]["Q4"])' style="text-align: right;">
                                    {{ budgetData[category.key]["actual"]["Q4"]  | hufFormat }}
                                </td>
                                <td style="font-weight: bold; text-align: right" class="bg-light">{{ budgetData[category.key]["actual"]["sum"] | hufFormat }}</td>
                            </tr>
                        </tbody>
                    </div>
                    <div class="mt-4">
                        <tbody class="bg-light">
                            <tr tbody-tr-class="rowClass">
                                <td rowspan="3">Total</td>
                                <td>Forecast</td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ colSums("Q1") }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ colSums("Q2") }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ colSums("Q3") }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ colSums("Q4") }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ colSums("all") }}
                                </td>
                            </tr>
                            <tr>
                                <td>Obligo</td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.obligo["Q1"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.obligo["Q2"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.obligo["Q3"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.obligo["Q4"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.obligo["sum"] | hufFormat }}
                                </td>
                            </tr>
                            <tr>
                                <td>Actual</td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.actual["Q1"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.actual["Q2"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.actual["Q3"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.actual["Q4"] | hufFormat }}
                                </td>
                                <td style="text-align: right; font-weight: bold;">
                                    {{ budgetData.TOTAL.actual["sum"] | hufFormat }}
                                </td>
                            </tr>
                        </tbody>
                    </div>
                </table>
                <br>
                <b-table
                    :items="vendorBudget"
                    :fields="vendorBudgetFields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :striped="true"
                    class="card-table mt-4"
                    id="budget-sum-table"
                    responsive>
                    
                    <template slot="amount" slot-scope="data">
                        {{ data.item.amount | hufFormat }}
                    </template>

                </b-table>
            </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Datepicker from 'vuejs-datepicker';
import JsonExcel from 'vue-json-excel';
import moment from 'moment';

export default {
    data() {
        return {
            currentYear: moment().format('YYYY'),
            budgetYear: new Date(),
            forecast: {
            },
            budgetFields: {
                projectId: {
                    label: 'ID'
                },
                pst: {
                    label: 'PST'
                },
                costCenter: {
                    label: 'Cost Center'
                },
                type: {
                    label: 'Type'
                },
                name: {
                    label: 'Name'
                },
                vendorCode: {
                    label: 'Vendor code'
                },
                vendorName: {
                    label: 'Vendor'
                },
                poNumber: {
                    label: 'PO'
                },
                itemNumber: {
                    label: 'Item'
                },
                certNumber: {
                    label: 'Certification number'
                },
                certItemNumber: {
                    label: 'Certification Item'
                },
                obligo: {
                    label: 'Obligo'
                },
                actual: {
                    label: 'Actual'
                },
                deliveryDate: {
                    label: 'Delivery Date'
                },
                bookingDate: {
                    label: 'Booking Date'
                },
                completionDate: {
                    label: 'Completion Date'
                }
            },
            budgetCategories: [
                {
                    name: "Development",
                    key: "DEV" 
                },
                {
                    name: "Testing",
                    key: "TEST" 
                },
                {
                    name: "External Resource",
                    key: "EXT" 
                },
                {
                    name: "Internal Resource",
                    key: "PERS" 
                },
                {
                    name: "SW licence",
                    key: "SW" 
                },
                {
                    name: "Hardware",
                    key: "HW" 
                }
            ],
            budgetExcelFields: {
                'ID': 'projectId',
                'PST': 'pst',
                'Cost Center': 'costCenter',
                'Type': 'type',
                'Name': 'name',
                'Vendor Code': 'vendorCode',
                'Vendor Name': 'vendorName',
                'PO Number': 'poNumber',
                'Item Number': 'itemNumber',
                'Certification Number': 'certNumber',
                'Certification Item': 'certItemNumber',
                'Obligo': 'obligo',
                'Actual': 'actual',
                'Delivery Date': 'deliveryDate',
                'Booking Date': 'bookingDate',
                'Completion Date': 'completionDate'
            },
            columns: [
                {
                    label: "ID",
                    field: "projectId"
                },
                {
                    label: "PST",
                    field: "pst"
                },
                {
                    label: "Cost Center",
                    field: "costCenter"
                },
                {
                    label: "Type",
                    field: "type"
                },
                {
                    label: "Name",
                    field: "name"
                },
                {
                    label: "Vendor Code",
                    field: "vendorCode"
                },
                {
                    label: "Vendor Name",
                    field: "vendorName"
                },
                {
                    label: "PO Number",
                    field: "poNumber"
                },
                {
                    label: "Item Number",
                    field: "itemNumber"
                },
                {
                    label: "Certification Number",
                    field: "certNumber"
                },
                {
                    label: "Certification Item",
                    field: "certItemNumber"
                },
                {
                    label: "Obligo",
                    field: "obligo"
                },
                {
                    label: "Actual",
                    field: "actual"
                },
                {
                    label: "Deliver Date",
                    field: "deliveryDate",
                    dataFormat: this.dateFormat
                },
                {
                    label: "Booking Date",
                    field: "bookingDate",
                    dataFormat: this.dateFormat
                },
                {
                    label: "Completion Date",
                    field: "completionDate",
                    dataFormat: this.dateFormat
                }
            ],
            vendorBudgetFields: {
                vendor: {
                    label: 'Vendor',
                    sortable: true
                },
                amount: {
                    label: 'Amount (Actual + Obligo) ',
                    sortable: true,
                    tdClass: 'float-right',
                    thClass: 'float-right'
                }
            },
            sortBy: 'vendor',
            sortDesc: false,
        }
    },
    components: {
        Datepicker,
        JsonExcel
    },
    computed: {
        ...mapState(['editPermission', 'editMode', 'budgetData', 'budgetDetails', 'vendorBudget', 'budgetView', 'budgetWrite', 'totalAmount', 'totalForecast', 'futureActual', 'project']),
        selectedYear() {
            return moment(this.budgetYear).format('YYYY');
        },
        remainingForecast() {
            var remaining = this.totalForecast - this.futureActual;
            return remaining;
        }
    },
    filters: {
        hufFormat (value) {
            if (!value) {
                return 0;
            } else {
                return new Intl.NumberFormat('hu-HU').format(value);
            }
        }
    },
    methods: {
        rowSums(forecastData) {
            var sum = Number(forecastData["Q1"]) + Number(forecastData["Q2"]) + Number(forecastData["Q3"]) + Number(forecastData["Q4"])
            return new Intl.NumberFormat('hu-HU').format(sum);
        },

        colSums(quarter) {
            var sum = 0;

            for (var i = 0; i < this.budgetCategories.length; i++) {
                if (quarter === "all") {
                    sum += Number(this.budgetData[this.budgetCategories[i].key].forecast.Q1) + Number(this.budgetData[this.budgetCategories[i].key].forecast.Q2) + Number(this.budgetData[this.budgetCategories[i].key].forecast.Q3) + Number(this.budgetData[this.budgetCategories[i].key].forecast.Q4);
                } else {
                    sum += Number(this.budgetData[this.budgetCategories[i].key].forecast[quarter]);
                }
            }

            return new Intl.NumberFormat('hu-HU').format(sum);
        },

        yearFormatter(date) {
            return moment(date).format('YYYY');
        },

        budgetClass(value) {
            var style;
            if (!value || value == '' || value == 0) {
                style = 'zeroValue';
            } else {
                style = 'hasValue'
            }

            return style;
        },

        saveForecast() {
            var year = moment(this.budgetYear).format('YYYY');

            if (year >= this.currentYear) {
                this.$store.dispatch('saveForecast', {
                    projectId: this.project.projectId,
                    year: year,
                    budgetData: this.budgetData
                });
            }
        },

        dateFormat(value){
            if (value) {
                return moment(value).format('YYYY-MM-DD');
            } else {
                return null;
            }
        }
    },
    watch: {
        budgetYear: function (year, oldYear) {
            this.$store.dispatch('getProjectBudget', {
                projectId: this.project.projectId,
                year: this.budgetYear
            })
        }
    },

    created: function () {
        this.autosave = _.debounce(this.saveForecast, 1000)
    }
}
</script>

<style>
#budgetTable td {
    width: 100px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: auto;
    padding-bottom: auto;
}

#budgetTable th {
    white-space: nowrap;
}

.zeroValue {
    color: grey;
}

#budget-sum-table {
    width: auto !important;
}
</style>