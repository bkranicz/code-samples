<template>
    <div id="home" class="overflow">
        <div class="row">
            <div class="col">
                <h4 class="font-weight-bold py-3 mb-4">
                    <span class="text-muted font-weight-light">
                        <span class="lnr lnr-home"></span> / Time Management /</span> 
                        <span v-if="schema === 'resman'">
                            Time Planning
                        </span>
                        <span v-else-if="schema === 'timesheet'">
                            Timesheet
                        </span>
                    <span class="float-right"></span>
                </h4>
            </div>
            <div class="col" v-if="schema === 'timesheet'">            
                <span class="float-right">
                    <a 
                        href="/#/time-management/timesheet/previous"
                        v-if="month==='current' && previousMonthOpen">
                        <i class="fas fa-pen"></i>
                        Click here to edit the <b><u>previous</u></b> month. <br>
                    </a>
                    <a 
                        href="/#/time-management/timesheet/current"
                        v-if="month !== 'current'">
                        <i class="fas fa-pen"></i>
                        Click here to edit the <b><u>current</u></b> month. <br>
                    </a>
                    <a 
                        href="/#/time-management/timesheet/custom"
                        v-if="month !== 'custom' && timeSheetMonth">
                        <i class="fas fa-pen"></i>
                        {{customMonth}} is open for editing
                    </a>
                </span>
            </div>
            </div>
            <b-card>
                <div class="row">
                    <div class="col-10">
                        <b-form inline >
                            <b-form-group class="projectSelect">
                                <!-- disable undefined handling:  @input="projectChange" -->
                                <multiselect 
                                    :options="projects" 
                                    :custom-label="prettyProjectName"
                                    :searchable="true"
                                    :show-labels="false"
                                    :allow-empty="false"
                                    placeholder="Select project"
                                    v-model="project"
                                    open-direction="above"
                                    style="width: 250px; max-width:250px;"
                                    class="projectSelect"
                                    :max-height="150"
                                />
                            </b-form-group>
                            <b-form-group class="ml-2">
                                <!-- :disabled="systemIsDisabled" -->
                                <multiselect 
                                    :options="systems" 
                                    :searchable="true"
                                    :show-labels="false"
                                    :allow-empty="false"
                                    :custom-label="prettySystemName"
                                    placeholder="Select system"
                                    v-model="system"
                                    @input="onChange"
                                    open-direction="above"
                                    style="width: 170px; max-width:170px;"
                                    class="systemSelect"
                                    :max-height="150"
                                />
                            </b-form-group>
                            <b-btn 
                                class="ml-2"
                                variant="outline-primary" 
                                size="md"
                                @click="addProject"
                                ><i class="fas fa-plus"></i> Add
                            </b-btn>
                        </b-form>
                    </div>
                    <div class="col-2">
                        <div class="float-sm-right">
                            <b-btn variant="primary" 
                                size="md"
                                @click="submit"
                                ><i class="fas fa-paper-plane"></i> Save
                            </b-btn>
                        </div>
                    </div>
                </div>
                <br>
 
                <b-table
                    hover 
                    :items="timeData"
                    :fields="header"
                    id="timeTable"
                >

                <template v-for="(weekId, index) in weekIds" :slot="'HEAD_weeks[' + index + '].' + schema" slot-scope="data">
                    {{ data.label }}
                    <b-btn 
                        v-if="index < weekIds.length -1"
                        :key="index"
                        variant="outline-secondary icon-btn btn borderless" 
                        v-b-tooltip.hover title="Copy to next week"
                        @click="copyWeek(index)"
                    ><i class="fas fa-file-import"></i></b-btn>
                </template>

                <template v-for="(weekId, index) in weekIds" :slot="'weeks[' + index + '].' + schema" slot-scope="data">
                    <div class="row" :key="index">
                        <b-form-input 
                            v-model="data.item.weeks[index][schema]" 
                            type="number" min="0" max="150" 
                            style='width:5em' 
                            :placeholder="String(data.item.weeks[index][counterSchema])"
                            :class="getClass(data.item.weeks[index][schema], data.item.weeks[index].locked)"
                            :disabled="data.item.weeks[index].locked"
                            @change="autosave"
                        ></b-form-input>
                        <b-tooltip target="locked">Disabled tooltip</b-tooltip>
                        <b-btn 
                            v-if="index===0"
                            variant="outline-secondary icon-btn btn-sm borderless" 
                            v-b-tooltip.hover title="Copy through"
                            @click="copyValue(data.item.projectId, data.item.system, data.item.weeks[index][schema])"
                        ><i class="fas fa-angle-double-right"></i></b-btn>
                    </div>
                </template>

                <template slot="remove" slot-scope="data">
                    <b-btn 
                        variant="outline-danger icon-btn btn borderless" 
                        v-b-tooltip.hover title="Remove"
                        @click="showAlert(data.item.projectId, data.item.system)"
                    ><i class="fas fa-times"></i></b-btn>
                </template>

                <template slot="bottom-row">
                    <td></td>
                    <td></td>
                    <td>Total:</td>
                    <td v-for="(weekId, index) in weekIds" :key="index"
                        :class="[colSums(index) <= 60 ? 'validSummary' : 'invalidSummary']">
                        {{colSums(index) + ' h'}}
                    </td>
                </template> 

                </b-table>

            </b-card>

        </div>
</template>


<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Multiselect from 'vue-multiselect'
import _ from 'lodash'; 
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
            project: '',
            system: '',
            time: '',
            sortBy: 'projectId',
            sortDesc: false,
            systemIsDisabled: false
        }
    },
    components: {
        Multiselect
    },
    computed: {
        ...mapState(['timeSheetMonth', 'projects', 'weekIds', 'weekBeginnings', 'systems']),

        schema() {
            return this.$route.params.schema;
        },

        counterSchema() {
            if (this.schema === 'timesheet') {
                return 'resman';
            } else {
                return 'timesheet';
            }
        },

        month() {
            return this.$route.params.month;
        },

        customMonth() {
            return moment(this.timeSheetMonth).format('MMMM YYYY')
        },

        previousMonthOpen() {
            var monthStart = moment().startOf('month');
            var today = moment()

            if (Math.abs(monthStart.diff(today, 'days')) < 8) {
                var isOpen =  true;
            } else {
                var isOpen = false;
            }
            
            return isOpen;
        },

        timeData() {
            return this.time = JSON.parse(JSON.stringify(this.$store.state.timeData))
        },

        header() {
            var header = {
                projectId: {
                    label: 'ID'
                }, 
                name: {
                    label: 'Name',
                    'class': 'maxWidth'
                }, 
                system: {
                    label: 'System'
                }
            }

            for (var i = 0; i < this.weekBeginnings.length; i++) {
                var weekReference = "weeks[" + i + "]." + this.schema;

                header[weekReference] = {
                    label: this.weekBeginnings[i]
                }
            }

            header["remove"] = {
                label: ''
            }

            return header;
        }
    },

    methods: {
        addProject() {
            if (this.system && this.project) {

                // Check if user has the same project id and system combination
                for (var i = 0; i < this.timeData.length; i++) {
                    var row = this.timeData[i];
                    if (this.project.projectId === row.projectId && this.system.name === row.system ) {
                        toast({type: 'warning', title: "This combination already exists"})
                        return;
                    } 
                }

                var newRow = {
                    href: this.project._id,
                    projectId: this.project.projectId,
                    name: this.project.name,
                    system: this.system.name,
                    strategy: this.project.strategy,
                    weeks: []
                }

                for (var j = 0; j < this.weekIds.length; j++) {
                    newRow.weeks.push({
                        weekId: this.weekIds[j],
                        resman: "",
                        timesheet: ""
                    })
                }
                
                this.timeData.push(newRow);
                
            } else {
                toast({type: 'warning', title: "Select a project and system"})
                return;
            }
        },

        submit() {
            this.$store.dispatch('setTimeData', this.timeData)
        },

        prettyProjectName({ projectId, name }) {
            return `${projectId} ${name}`
        },

        prettySystemName({ name, description }) {
            if (description) {
                return `${name} - ${description}`
            } else {
                return `${name}`
            }
            
        },

        colSums(weekIndex) {
            return this.time.reduce((total, obj) => Number(obj.weeks[weekIndex][this.schema]) + total, 0)
        },

        copyWeek(sourceWeekId) {
            for (var i = 0; i < this.timeData.length; i++) {
                var row = this.timeData[i];

                if (!row.weeks[sourceWeekId + 1].locked && !row.weeks[sourceWeekId].locked) {
                    row.weeks[sourceWeekId + 1][this.schema] = row.weeks[sourceWeekId][this.schema];
                }
            } 

            this.autosave();
        },

        copyValue(projectId, system, value) {
            for (var i = 0; i < this.timeData.length; i++) {
                var row = this.timeData[i];
                if (row.projectId === projectId && row.system === system) {
                    for (var j = 0; j < this.weekIds.length; j++) {
                        if (!row.weeks[j].locked) {
                            row.weeks[j][this.schema] = value;
                        }
                    }
                }
            }

            this.autosave(); 
        },

        showAlert(projectId, system) {
            this.$swal({
                title: 'Are you sure you want to remove this project?',
                text: 'The values will be removed both from the timesheet and the time plan',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.value === true) {
                    for(var i = 0; i < this.timeData.length; i++) {
                        if (this.timeData[i].projectId === projectId && this.timeData[i].system === system) {
                            this.timeData.splice(i, 1);
                            this.$store.dispatch('deleteTimeData', {
                                projectId: projectId,
                                system: system,
                                startWeekId: this.weekIds[0],
                                endWeekId: this.weekIds[this.weekIds.length - 1]
                            })
                            break;
                        }
                    }
                } 
            });
        },

        projectChange(value) {
            if (this.project && this.project.withoutDev === true) {
                this.system = {
                    name: 'Undefined',
                    description: 'Undefined'
                }

                this.systemIsDisabled = true;
            } else {
                this.systemIsDisabled = false;
            }
        },

        getClass(value, locked) {
            var style;
            if (!value || value == '' || value == 0) {
                style = '';
            } else if (value > 0 && value <= 50) {
                style = 'validValue'
            } else {
                style = 'invalidValue'
            }

            if (locked) {
                style += ' locked'
            }

            return style;
        }
    },

    mounted() {
        this.$store.dispatch('loadProjects', {
            fields: 'projectId name strategy withoutDev',
            statuses: ['Active']
        });

        this.$store.dispatch('getTimeData', {
            schema: this.$route.params.schema,
            month: this.$route.params.month
        });

        this.$store.dispatch('getSystems');

        this.$store.dispatch('getTimeSheetMonth');
    },

    created: function () {
        this.autosave = _.debounce(this.submit, 1500)
    }
}

</script>

<style>
.maxWidth {
    max-width: 150px;
}
.validValue {
    background-color:#02BC77;
    color: white;
    font-weight: bold;
}
.invalidValue {
    background-color: #ff6961 !important;
    color: white;
    font-weight: bold;
}
#timeTable thead th {
  text-align: center !important;
  vertical-align: middle !important;
}

.invalidSummary {
    color: #ff6961 !important;
    font-weight: bold;
}

.validSummary {
    color:#02BC77;
    font-weight: bold;
}

.projectSelect .multiselect .multiselect__content-wrapper {
    width: 600px !important;
}

.systemSelect .multiselect__content-wrapper {
    width: 300px !important;
}

#timeTable .form-control:disabled, .form-control[readonly] {
    background-color: #f1f1f2;
    background-image: url(/img/lock_icon.png);
    background-size: contain;
    background-repeat: no-repeat;
    opacity: .7;
    background-position: center;
    background-size: 30%;
}

</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
