<template>
    <div id="home">
      <div>
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light"> 
            <span class="lnr lnr-home"></span> / Admin / </span>Control Panel
        </h4>
        <hr class="border-light container-m--x my-4">
      </div>
      <div>
        <h5>Reload all users to local database:</h5>
        <ladda-btn 
            :loading="userRefreshInProgress" 
            @click.native="refreshUsers" 
            data-style="slide-right" 
            class="btn btn-primary">
            <i class="fas fa-users-cog"></i> Refresh Users
        </ladda-btn>
        <hr class="border-light container-m--x my-4">
      </div>
      <div>
        <h5>Generate timesheet extract manually</h5>
            <vue-monthly-picker
                style="max-width: 250px;"
                :clearOption="true"
                dateFormat="YYYY-MM"
                v-model="extractDate">
            </vue-monthly-picker>
        <br>
        <ladda-btn 
            :loading="extractInProgress" 
            @click.native="generateExtract" 
            data-style="slide-right" 
            class="btn btn-primary">
            <i class="fas fa-file-export"></i> Generate Extract
        </ladda-btn>
        
        <hr class="border-light container-m--x my-4">
      </div>

      <div>
        <h5>Open previous month in timesheet</h5>
            <vue-monthly-picker
                style="max-width: 250px;"
                :clearOption="true"
                dateFormat="YYYY-MM"
                :value="timeSheetMonth"
                v-model="previousMonth">
            </vue-monthly-picker>
        <br>
        <b-btn 
            variant="primary" 
            size="md" 
            @click="openTimesheet">
            <i class="fas fa-lock-open"></i> Open timesheet
        </b-btn>
        <hr class="border-light container-m--x my-4">
      </div>

      <div>
          <h5>Set holidays and special working days (YYYY-MM-DD format)</h5>
            <h6>Holidays:</h6>
            <multiselect 
                :options="holidays"
                v-model="currentHolidays"
                :searchable="true"
                :show-labels="false"
                :allow-empty="true"
                placeholder="Select holidays"
                id="currentHolidays"
                :multiple="true" 
                :taggable="true" 
                class="multiselect-primary" 
                @tag="addTag"
            />
            <br>
            <h6>Working Days:</h6>
            <multiselect 
                :options="workingdays"
                v-model="currentWorkingdays"
                :searchable="true"
                :allow-empty="true"
                placeholder="Select working days"
                id="currentWorkingdays"
                :multiple="true" 
                :taggable="true" 
                class="multiselect-primary" 
                @tag="addTag"
            />
            <br>
            <b-btn 
                variant="primary" 
                size="md" 
                @click="setSpecialDays">
                <i class="far fa-calendar-check"></i> Set dates
            </b-btn>
          <hr class="border-light container-m--x my-4">
      </div>

      <div>
            <h5>Reload IT systems from SAP</h5>
            <b-btn 
                variant="primary" 
                size="md" 
                @click="updateSystems">
                <i class="fas fa-server"></i> Refresh Systems
            </b-btn>
            <hr class="border-light container-m--x my-4">
      </div>
      <div>
            <h5>Reload budget data from SAP extract</h5>
            <b-btn 
                variant="primary" 
                size="md" 
                @click="updateBudget">
                <i class="fas fa-coins"></i> Refresh budget
            </b-btn>
            <hr class="border-light container-m--x my-4">
      </div>
    </div>
</template>


<script>
import Vue from 'vue';
import LaddaBtn from '@/vendor/libs/ladda/Ladda'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'
import VueMonthlyPicker from 'vue-monthly-picker'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.component('date-picker', DatePicker)

export default {
    components: {
        LaddaBtn,
        Datepicker,
        Multiselect,
        VueMonthlyPicker,
        DatePicker
    },
    data() {
        return {
            extractDate: '',
            previousMonth: '',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            currentHolidays: [],
            currentWorkingdays: []
        }
    },
    computed: {
        ...mapState(['extractInProgress', 'userRefreshInProgress']),
        timeSheetMonth() {
            return this.previousMonth = JSON.parse(JSON.stringify(this.$store.state.timeSheetMonth));
        },
        holidays() {
            return this.currentHolidays = JSON.parse(JSON.stringify(this.$store.state.holidays));
        }, 
        workingdays() {
            return this.currentWorkingdays = JSON.parse(JSON.stringify(this.$store.state.workingdays));
        } 
    },
    methods: {
        refreshUsers() {
            this.$store.dispatch('refreshUsers');
        },

        generateExtract() {
            var month = moment().format('YYYY-MM');

            if (this.extractDate) {
                month = moment(this.extractDate).format('YYYY-MM');
            }
            
            this.$store.dispatch('generateTimesheetExtract', {
                month: month
            })
        },

        openTimesheet() {
            var month = null;

            if (this.previousMonth) {
                month = moment(this.previousMonth).format('YYYY-MM')
            }

            this.$store.dispatch('openTimeSheet', {
                month: month
            })
        },

        setSpecialDays() {
            this.$store.dispatch('setSpecialDays', {
                holidays: this.currentHolidays,
                workingdays: this.currentWorkingdays
            })
        },

        updateSystems() {
            this.$store.dispatch('importSystems');
        },

        updateBudget() {
            this.$store.dispatch('updateBudget')
        },

        addTag(tag, parameter) {
            this[parameter].push(tag)
        }
    },

    mounted() {
        this.$store.dispatch('getTimeSheetMonth');
        this.$store.dispatch('getSpecialDays');
    }
}

</script>
<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style scoped>


</style>
