<template>
    <div v-if="projectClone.hasOwnProperty('projectId')">
        <div id="header" v-observe-visibility="visibilityChanged">
        <h3 class="font-weight-bold mb-2">
            <div v-if="!editMode">
                {{projectClone.name}} <span class="text-muted">({{projectClone.projectId}})</span>
            </div>
            <div v-else>
                <input
                    class="fix"
                    type="text"
                    v-bind:class="{'invalid': requiredFields && !this.projectClone.name}"
                    v-model="projectClone.name"
                />   
                <span class="text-muted">({{projectClone.projectId}})</span>
            </div>
            <span class="float-right">
                <div v-if="!editMode">
                    <b-btn 
                        v-if="editPermission"
                        variant="primary" 
                        size="sm"
                        @click="editProject()"
                        ><i class="ion ion-md-create"></i> Edit
                    </b-btn>
                </div>
                <div v-else>
                    <b-btn variant="outline-secondary" 
                        size="sm"
                        @click="showAlert()"
                        ><i class="ion ion-md-close"></i> Cancel
                    </b-btn>&nbsp;

                    <b-btn variant="success" 
                        size="sm"
                        @click="updateProject()"
                        ><i class="ion ion-md-checkmark"></i> Save
                    </b-btn>&nbsp;
                </div>
            </span>
        </h3>
        <div class="text-muted small">
            <i class="ion ion-md-time text-primary"></i>
            <span>Created: {{projectClone.created | timeFormatter}}</span>
            <span>(Updated: {{projectClone.updated | timeFormatter}})</span>
        </div>
        </div>
        <div v-if="!isVisible" class="container-m--x fixedElement shadow bg-white rounded">
            <div class="row d-flex align-items-center container-p-x py-4">
                <h5 class="font-weight-bold mb-2">
                    <span v-if="!editMode" class="float-right">
                        {{projectClone.name}} <span class="text-muted">({{projectClone.projectId}})</span>
                        &nbsp;
                        <b-btn 
                            v-if="editPermission"
                            variant="primary" 
                            size="xs"
                            @click="editProject()"
                            ><i class="ion ion-md-create"></i> Edit
                        </b-btn>
                    </span>
                    <span v-else>
                        <input
                            class="fix"
                            style="height:30px;"
                            type="text"
                            v-bind:class="{'invalid': requiredFields && !this.projectClone.name}"
                            v-model="projectClone.name"
                        />  
                        <span class="text-muted">({{projectClone.projectId}})</span>
                        &nbsp;
                        <b-btn variant="outline-secondary" 
                            size="sm"
                            @click="showAlert()"
                            ><i class="ion ion-md-close"></i> Cancel
                        </b-btn>&nbsp;

                        <b-btn variant="success" 
                            size="sm"
                            @click="updateProject()"
                            ><i class="ion ion-md-checkmark"></i> Save
                        </b-btn>&nbsp;
                    </span>
                </h5>
            </div>
        </div>
        <br>
        
        <hr class="border-light container-m--x my-0">
        <div class="overflow row no-gutters row-bordered row-border-light container-m--x">
            <div class="col-sm-6 col-md-3 col-lg-6 col-xl-3">
                <div class="d-flex align-items-center container-p-x py-4">
                <div class="lnr lnr-heart-pulse display-4 text-primary"></div>
                <div class="ml-3">
                    <div class="text-muted small">Status</div>
                    <div v-if="!editMode || (editMode && currentUser.role !== 'Pamacs_admin' && projectClone.status === 'Pending' )" class="text-medium">{{projectClone.status}}</div>
                    <div v-else>
                        <multiselect 
                            v-model="projectClone.status" 
                            :options="parameters.status" 
                            :searchable="true"
                            :show-labels="false"
                            :allow-empty="false"
                        />
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3 col-lg-6 col-xl-3">
                <div class="d-flex align-items-center container-p-x py-4">
                <div class="lnr lnr-rocket display-4 text-primary"></div>
                <div class="ml-3">
                    <div class="text-muted small">Phase</div>
                    <div v-if="!editMode" class="text-medium">{{projectClone.phase}}</div>
                    <div v-else>
                        <multiselect 
                            v-model="projectClone.phase" 
                            :options="parameters.phase" 
                            :searchable="true"
                            :show-labels="false"
                            :allow-empty="false"
                        />    
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3 col-lg-6 col-xl-3">
                <div class="d-flex align-items-center container-p-x py-4">
                <div class="lnr lnr-tag display-4 text-primary"></div>
                <div class="ml-3">
                    <div class="text-muted small">Type</div>
                    <div v-if="!editMode" class="text-medium">{{projectClone.type}}</div>
                    <div v-else>
                        <multiselect 
                            v-model="projectClone.type" 
                            :options="parameters.type" 
                            :searchable="true"
                            :show-labels="false"
                            :allow-empty="false"
                        />
                    </div>
                </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-3 col-lg-6 col-xl-3">
                <div class="d-flex align-items-center container-p-x py-4">
                <div class="lnr lnr-user display-4 text-primary"></div>
                <div class="ml-3">
                    <div class="text-muted small">Responsible</div>
                    <div v-if="editMode && editResponsible">
                        <multiselect 
                            v-model="projectClone.pm" 
                            :options="users"
                            :searchable="true"
                            :show-labels="false"
                            :allow-empty="false"
                            label="name"
                        />
                    </div>
                    <div v-else class="text-medium">{{projectClone.pm.name}}</div>
                </div>
                </div>
            </div>
        </div>
        <hr class="border-light container-m--x my-0">
        <br>
        <div class="row">
            <div class="col-md-8 col-lg-8 col-sm-12">
                <b-card class="shadow-sm p-3 mb-5 bg-white rounded">
                    <h5><i class="fas fa-sliders-h"></i> General</h5>
                    <div v-if="!editMode">
                        <p>{{ projectClone.description }}</p>
                    </div>
                    <div v-else>
                        <b-textarea 
                            v-bind:class="{'invalid': requiredFields && !this.projectClone.description}"
                            v-model="projectClone.description"
                            rows="4" 
                            placeholder="Describe the project.."
                        />
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-6 col-lg-6 col-sm-12">
                            <b-list-group :flush="true">
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Client:</div>
                                    <div v-if="!editMode">{{projectClone.client}}</div>
                                    <div v-else>
                                        <multiselect 
                                            v-model="projectClone.client"
                                            :options="parameters.client" 
                                            :searchable="true"
                                            :show-labels="false"
                                            :allow-empty="false"
                                        />
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item v-if="!editMode && projectClone.link.length > 5" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Project Folder:</div> 
                                    <input type="hidden" id="folderUrl" :value="projectClone.link">
                                    <div>
                                    <a :href="projectClone.link" target="_blank">Open <i class="ion ion-md-open"></i></a>
                                    <a class="ml-1" href="javascript:void(0);" @click="copyFolderLink" >Copy <i class="ion ion-ios-link"></i></a>
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item v-else-if="editMode" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Project Folder:</div> 
                                    <div>
                                       <b-input v-model="projectClone.link"/> 
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Driver:</div>
                                    <div>{{projectClone.strategy}}</div>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Audit Required:</div>
                                    <div v-if="!editMode">
                                        <div v-if="projectClone.audit===true">Yes</div>
                                        <div v-else>No</div>
                                    </div>
                                    <div v-else>
                                        <b-form-checkbox
                                            v-model="projectClone.audit"
                                            value=true
                                            unchecked-value=false
                                        ></b-form-checkbox>
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Without development: </div>
                                    <div v-if="!editMode">
                                        <div v-if="projectClone.withoutDev===true">Yes</div>
                                        <div v-else>No</div>
                                    </div>
                                    <div v-else>
                                        <b-form-checkbox
                                            v-model="projectClone.withoutDev"
                                            value=true
                                            unchecked-value=false
                                        ></b-form-checkbox>
                                    </div>
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                        <div class="col-md-6 col-lg-6 col-sm-12">
                            <b-list-group :flush="true">

                                <b-list-group-item v-if="!editMode && projectClone.resmanType != 'Undefined'" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Resource Bucket:</div> {{projectClone.resmanType}}
                                </b-list-group-item>
                                <b-list-group-item v-else-if="editMode" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Resource Bucket:</div> 
                                    <div>
                                        <multiselect 
                                            v-model="projectClone.resmanType" 
                                            :options="parameters.resourceBucket" 
                                            :show-labels="false"
                                            :allow-empty="false"
                                        />
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item v-if="!editMode && projectClone.complexity != 'Undefined'" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">IT impact:</div> {{projectClone.complexity}}
                                </b-list-group-item>
                                <b-list-group-item v-else-if="editMode" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">IT impact:</div> 
                                    <div>
                                        <multiselect 
                                            v-model="projectClone.complexity" 
                                            :options="parameters.complexity" 
                                            :show-labels="false"
                                            :allow-empty="false"
                                        />
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item v-if="!editMode && (projectClone.tncoImpact != 'Undefined' || !projectClone.tncoImpact)" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">TnCO impact:</div> {{projectClone.tncoImpact}}
                                </b-list-group-item>
                                <b-list-group-item v-else-if="editMode" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">TnCO impact:</div> 
                                    <div>
                                        <multiselect 
                                            v-model="projectClone.tncoImpact" 
                                            :options="parameters.tncoImpact" 
                                            :show-labels="false"
                                            :allow-empty="false"
                                        />
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item v-if="!editMode && projectClone.priority != 'Undefined'" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Priority:</div> {{projectClone.priority}}
                                </b-list-group-item>
                                <b-list-group-item v-else-if="editMode" class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Priority:</div> 
                                    <div>
                                        <multiselect 
                                            v-model="projectClone.priority" 
                                            :options="parameters.priority" 
                                            :show-labels="false"
                                            :allow-empty="false"
                                        />
                                    </div>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <div class="text-muted">Related portfolios:</div>
                                    <div v-if="!editMode && projectClone.portfolios">{{ projectClone.portfolios.join(", ") }}</div>
                                    <div v-else>
                                        <multiselect 
                                            v-model="projectClone.portfolios" 
                                            :options="parameters.portfolios" 
                                            :multiple="true"  
                                            :show-labels="false"
                                            :close-on-select="false"
                                            :hide-selected="true" 
                                            class="multiselect-primary" 
                                            placeholder="Add portfolio"
                                            v-bind:class="{'invalid': requiredFields && !this.projectClone.portfolios.length > 0}"
                                        />
                                    </div>
                                </b-list-group-item>

                            </b-list-group>
                        </div>
                    </div>
                </b-card>

                    <b-tabs class="nav-tabs-top" v-model="tabIndex">
                        <b-tab active>
                            <template slot="title">
                                <i class="ion ion-md-people"></i> Members 
                            </template>
                            <b-card-body>
                                <b-form inline v-if="editMode">
                                        <b-form-group >
                                            <multiselect 
                                            v-model="employee" 
                                            placeholder="Select employee"
                                            :show-labels="false"
                                            :clear-on-select="false"
                                            :options="users" 
                                            label="name"
                                            />
                                        </b-form-group>
                                        &nbsp;&nbsp;
                                        <b-form-group >
                                            <multiselect 
                                            v-model="title" 
                                            :show-labels="false"
                                            :allow-empty="false"
                                            :options="parameters.memberTitle" 
                                            />
                                        </b-form-group>
                                        &nbsp;&nbsp;
                                        <b-form-group>
                                            <multiselect 
                                            v-model="permission" 
                                            :show-labels="false"
                                            :allow-empty="false"
                                            :options="parameters.memberPermission"  
                                            />
                                        </b-form-group>
                                        &nbsp;&nbsp;
                                        <b-btn variant="outline-primary" 
                                            size="md"
                                            @click="addMember()"
                                            ><i class="ion ion-md-person-add"></i> Add
                                        </b-btn>
                                </b-form>

                                <div v-if="editMode">
                                    <b-table 
                                        striped 
                                        responsive 
                                        hover 
                                        :items="projectClone.members" 
                                        :fields="membersFields">

                                        <template slot="title" slot-scope="data">
                                            <multiselect 
                                                v-model="data.item.title" 
                                                :show-labels="false"
                                                :allow-empty="false"
                                                :options="parameters.memberTitle" 
                                            />
                                        </template>

                                        <template slot="permission" slot-scope="data">
                                            <multiselect 
                                                v-model="data.item.permission" 
                                                :show-labels="false"
                                                :allow-empty="false"
                                                :options="parameters.memberPermission" 
                                            />
                                        </template>

                                        <template slot="delete" slot-scope="row">
                                            <b-btn 
                                                variant="outline-danger icon-btn btn-lg borderless"
                                                @click="deleteMember(row.index)"
                                                v-b-tooltip.hover title="Remove employee"
                                            ><span class="ion ion-md-close"></span></b-btn>
                                        </template>
                                    </b-table>
                                </div>
                                <div v-else-if="!editMode">
                                    <div v-if="projectClone.members && projectClone.members.length > 0">
                                        <b-table 
                                            striped 
                                            hover 
                                            :items="projectClone.members" 
                                            :fields="membersFields"
                                            responsive>

                                            <template slot="permission" slot-scope="data">
                                                <b-badge 
                                                    pill variant="danger" v-if="data.item.permission ==='Write'">Write
                                                </b-badge>
                                                <b-badge 
                                                    pill variant="primary" v-if="data.item.permission ==='Read'">Read
                                                </b-badge>
                                            </template>
                                        </b-table>
                                    </div>
                                    <div v-else>
                                        <center>
                                            <h1><i class="fas fa-user-slash"></i></h1>
                                            No employees to show
                                        </center>
                                    </div>
                                </div>
                            </b-card-body>
                        </b-tab>    

                        <b-tab>
                            <template slot="title">
                                <i class="ion ion-md-document"></i> Documents 
                            </template>
                            <b-card-body>
                                <div v-if="editMode">
                                    <b-form inline>
                                        <b-form-group >
                                            <multiselect 
                                            v-model="docType" 
                                            placeholder="Select document type"
                                            :show-labels="false"
                                            :clear-on-select="false"
                                            :options="parameters.docTypes" 
                                            />
                                        </b-form-group>
                                        &nbsp;&nbsp;
                                            <b-input v-model="docLink" placeholder="Document link"/> 
                                        &nbsp;&nbsp;
                                        <b-btn variant="outline-primary" 
                                            size="md"
                                            @click="addDocument()"
                                            ><i class="fas fa-file-medical"></i> Add
                                        </b-btn>
                                    </b-form>
                                </div>

                                <div v-if="editMode">
                                    <b-table 
                                        striped 
                                        hover 
                                        responsive
                                        :items="projectClone.docs" 
                                        :fields="docFields">

                                        <template slot="docType" slot-scope="data">
                                            <multiselect 
                                                v-model="data.item.docType" 
                                                :show-labels="false"
                                                :allow-empty="false"
                                                :options="parameters.docTypes" 
                                            />
                                        </template>

                                        <template slot="link" slot-scope="data">
                                            <b-input v-model="data.item.link"/> 
                                        </template>

                                        <template slot="delete" slot-scope="row">
                                            <b-btn 
                                                variant="outline-danger icon-btn btn-lg borderless"
                                                @click="deleteDocument(row.index)"
                                                v-b-tooltip.hover title="Remove document"
                                            ><span class="ion ion-md-close"></span></b-btn>
                                        </template>
                                    </b-table>
                                </div>
                                <div v-else-if="!editMode">
                                    <div v-if="projectClone.docs && projectClone.docs.length > 0">
                                        <div class="file-manager-container" :class="`file-manager-col-view`">
                                            <div class="file-item" v-for="(doc, index) in this.projectClone.docs" :key="index" >
                                                <a :href="doc.link" target="_blank">
                                                    <i class="file-item-icon text-secondary far fa-file-alt" ></i>
                                                    <div class="file-item-name">{{doc.docType}}</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <center>
                                            <h1><i class="fas fa-folder-minus"></i></h1>
                                            No documents to show
                                        </center>
                                    </div>
                                </div>
                            </b-card-body>
                        </b-tab>

                        <!-- Time data tab -->
                        <b-tab>
                            <template slot="title">
                                <i class="fas fa-user-clock"></i> Time data
                            </template>
                            <b-card-body>
                                <time-data></time-data>
                            </b-card-body>
                         </b-tab>

                         <!-- Budget tab -->
                        <b-tab @click="getBudgetData" v-if="budgetView">
                            <template slot="title">
                                <i class="fas fa-dollar-sign"></i> Budget
                            </template>
                            <b-card-body>
                                <budget-module ref="budget"></budget-module>
                            </b-card-body>
                         </b-tab> 

                    </b-tabs>  
            </div>
            <div class="col-md-4 col-lg-4 col-sm-12">
                <b-card class="shadow-sm p-3 mb-5 bg-white rounded" id="calendarCard" style="overflow-x: scroll">
                    <h5><i class="far fa-calendar-alt"></i> Timeline</h5>
                    <ul v-if="!editMode" class="steps is-vertical has-content-centered">
                        <li v-for="milestone in this.milestones" :key="milestone.key" class="steps-segment has-gaps ">
                            <span 
                                v-bind:class="{'steps-marker is-info': projectClone[milestone.key], 'steps-marker is-secondary': !projectClone[milestone.key]}">
                                <span v-if="projectClone[milestone.key]" class="icon">
                                <i class="far fa-calendar-check"></i>
                                </span>
                                <span v-else class="icon">
                                <i class="ion ion-md-close"></i>
                                </span>
                            </span>
                            <div class="steps-content">
                            <p class="is-size-4"><span class="text-muted">{{milestone.label}}: </span>{{projectClone[milestone.key] | dateFormatter}}</p>
                            </div>
                        </li>
                    </ul>
                    <div v-else>
                        <b-form-group v-for="milestone in milestones" :key="milestone.key" :label="milestone.label" class="minWidthInput">
                            <datepicker
                            v-bind:class="{'invalid': requiredGoLive && milestone.key === 'goLive' && !projectClone.goLive}"
                            v-model="projectClone[milestone.key]"
                            :bootstrapStyling="true"
                            :monday-first="true"
                            :full-month-name="true"
                            placeholder="Select date"
                            :calendar-button="true"
                            calendar-button-icon="ion ion-md-calendar"
                            :clear-button="true" />
                        </b-form-group>
                    </div>
                </b-card>

                <b-card no-body class="mb-4">
                    <b-card-header header-tag="h6" class="with-elements">
                        <div class="card-header-title"><i class="fas fa-comments"></i> Comments</div>
                    </b-card-header>
                    <perfect-scrollbar style="height: 300px">
                        <b-card-body>
                            <div v-if="projectClone.comments && projectClone.comments.length > 0">
                                <div class="rounded ui-bordered p-3 mb-3" 
                                    v-for="(comment, index) in projectClone.comments" :key="index">
                                    {{comment.comment}} 
                                    <b-btn 
                                        v-if="editMode && editPermission"
                                        variant="outline-danger icon-btn btn-sm borderless"
                                        class="float-right"
                                        @click="deleteComment(index)"
                                        v-b-tooltip.hover title="Remove comment"
                                        ><span class="ion ion-md-close"></span>
                                    </b-btn>
                                    <div class="media align-items-center mt-3">
                                        <div class="text-muted media-body"><span><i class="lnr lnr-user text-primary"></i> {{comment.employee}}</span></div>
                                        <div class="text-muted small text-nowrap"><span><i class="ion ion-md-time text-primary"></i> {{comment.date | timeFormatter}}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="full-center">
                                <center>
                                    <h1><i class="fas fa-comment-slash"></i></h1>
                                    <p>No comments to show</p>
                                </center>
                            </div>
                        </b-card-body>
                    </perfect-scrollbar>
                    <div v-if="editMode">
                        <b-card-footer>
                            <b-input-group>
                                <b-input 
                                    placeholder="Type your message" 
                                    v-model="comment"
                                    @keyup.enter.native="addNewComment()"/>
                                <b-btn 
                                    slot="append" 
                                    variant="primary" 
                                    @click="addNewComment()">
                                <i class="ion ion-md-send"></i></b-btn>
                            </b-input-group>
                        </b-card-footer>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import moment from 'moment'
import Multiselect from 'vue-multiselect'
import BFormInput from 'bootstrap-vue/es/components/form-input/form-input'
import Datepicker from 'vuejs-datepicker'
import PerfectScrollbar from '@/vendor/libs/perfect-scrollbar/PerfectScrollbar'
import BudgetModule from './project/BudgetModule.vue';
import TimeData from './project/TimeData';
require('@/vendor/styles/steps.css')

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
            id: this.$route.params.id,
            tabIndex: 0,
            isVisible: true,
            projectForm: '',
            comment: '',
            docLink: '',
            docType: '',
            employee: '',
            title: 'Member',
            permission: 'Read',
            forceRecomputeCounter: 0,
            requiredFields: false,
            requiredGoLive: false,
            membersFields: {
                name: {
                    label: 'Employee'
                },
                title: {
                    label: 'Title'
                },
                permission: {
                    label: 'Permission'
                },
                delete: {
                    label: ''
                }
            },
            docFields: {
                docType: {
                    label: 'Document Type'
                },
                link: {
                    label: 'Link'
                },
                delete: {
                    label: 'Delete'
                }
            },
            milestones: [
                {key: 'D1', label: 'D1'},
                {key: 'D2', label: 'D2'},
                {key: 'goLive', label: 'Go Live'},
                {key: 'D4', label: 'D4'},
                {key: 'D5', label: 'D5'},
            ]
        }
    },
    components: {
        'budget-module': BudgetModule,
        'time-data': TimeData,
        PerfectScrollbar,
        Multiselect,
        Datepicker
    },
    computed: {
        ...mapState(['editPermission', 'editMode', 'editResponsible', 'parameters', 'loadState','users', 'timeData', 'budgetData', 'budgetDetails', 'budgetView', 'budgetWrite', 'currentUser']),
        projectClone() {
            this.forceRecomputeCounter;
            var pr = JSON.parse(JSON.stringify(this.$store.state.project))
            this.projectForm = pr; 
            return pr;
        }
    },
    methods: {
        editProject() {
            this.$store.commit('setProjectEdit', true);

            if (!this.users || this.users.length === 0) {
                this.$store.dispatch('getExternalUsers')
            }
        },
        isResponsibleEditable() {
            
        },
        visibilityChanged (isVisible, entry) {
            this.isVisible = isVisible;
        },
        updateProject() {
            if (!this.projectClone.name || !this.projectClone.description || !this.projectClone.portfolios || this.projectClone.portfolios.length === 0) {
                this.requiredFields = true;
            } else {
                this.requiredFields = false;

                //Check if go live date is necessary
                if (this.projectClone.portfolios.includes('DD') && (this.projectClone.type === 'IT Care' || this.projectClone.type === 'Project') && !this.projectClone.withoutDev) {
                    var notifiedPhases = ['Launch', 'Close-out', 'Closed']
                    if ((notifiedPhases.includes(this.projectClone.phase) || this.projectClone.status === 'Completed') && !this.projectClone.goLive) {
                        this.requiredGoLive = true;
                        return;
                    }
                }

                this.$store.dispatch('updateProject', this.projectClone);
            }
        },
        addMember() {
            if (this.employee !== '') {
                for (var i = 0; i < this.projectClone.members.length; i++) {
                    if (this.projectClone.members[i].username === this.employee.username) {
                        toast({type: 'warning', title: "This employee is already on the list"})
                        return;
                    }
                }
                
                this.projectClone.members.push({
                    'name': this.employee.name,
                    'username': this.employee.username,
                    'title': this.title,
                    'permission': this.permission
                })
                
                this.employee = ''
            } 
        },
        deleteMember(index) {
            this.projectClone.members.splice(index, 1);
        },
        addDocument() {
            if (this.docLink !== '') {
                this.projectClone.docs.push({
                    'docType': this.docType,
                    'link': this.docLink
                })

                this.docLink = ''
            }
        },
        deleteDocument(index) {
            this.projectClone.docs.splice(index, 1);
        },
        
        addNewComment() {
            if (this.comment !== '') {
                this.projectClone.comments.push({
                    'employee': this.currentUser.name,
                    'comment': this.comment,
                    'date': new Date()
                })
                this.comment = ''
                this.scrollToEnd()
            }
        },

        deleteComment(index) {
            this.projectClone.comments.splice(index, 1);
        },

        getBudgetData() {
            this.$store.dispatch('getProjectBudget', {
                projectId: this.projectForm.projectId
            })
        },

        scrollToEnd() {
            setTimeout(() => {
            const container = this.$el.querySelector('.ps');
            container.scrollTop = container.scrollHeight;
            }, 0);
        },

        copyFolderLink () {
          let testingCodeToCopy = document.querySelector('#folderUrl')
          testingCodeToCopy.setAttribute('type', 'text')
          testingCodeToCopy.select()

          try {
            var copy = document.execCommand('copy');
            toast({type: 'success', title: "Copied to clipboard"})
          } catch (err) {
            console.log(err);
          }

          /* unselect the range */
          testingCodeToCopy.setAttribute('type', 'hidden')
          window.getSelection().removeAllRanges()
        },

        showAlert() {
            this.$swal({
                title: 'Are you sure to leave?',
                text: 'Your changes will not be saved',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if(result.value === true) {
                    //force recomputattion of the projectClone computed property
                    this.forceRecomputeCounter++;
                    this.$store.commit('setProjectEdit', false);
                } 
            });
        }
    }, 
    mounted() {
        this.$store.commit('setProjectEdit', false);
        this.$store.dispatch('loadProject', this.id); 
        this.$store.dispatch('getParameters');
    },
    filters: {
        dateFormatter: function(date) {
            if (date) {
                return moment(date).format('YYYY - MMM - DD');
            } else {
                return 'Not specified'
            }
        },
        timeFormatter: function(time) {    
            return moment(time).format('YYYY-MM-DD hh:mm')
        }
    }
}
</script>

<style src="@/vendor/styles/pages/file-manager.scss" lang="scss"></style>
<style scoped>
.full-center {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
.fixedElement {
    background-color: #ffffff;
    color: black;
    opacity: 1;
    position:fixed;
    top:0;
    width:100%;
    height: 70px;
    z-index:100;
}

.invalid { 
  border: 1px solid #d9534f;
}

.overflow {
    overflow: visible !important;
}

.minWidthInput {
    min-width: 300px !important;
}
.minWidthInput .fieldset{
    min-width: 300px !important;
}

</style>

