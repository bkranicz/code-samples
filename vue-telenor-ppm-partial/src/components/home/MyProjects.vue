<template>
    <div>
        <div v-if="myProjects.length > 0">
            <b-table
                :items="myProjects"
                :fields="myProjectsTableFields"
                :striped="true"
                class="card-table"
                responsive>

                <template slot="projectId" slot-scope="data">
                    <a :href="'/#/project/' + data.item._id"><b>{{data.item.projectId}}</b></a>
                </template>

                <template slot="type" slot-scope="data">
                    <b-badge 
                        variant="outline-dark"> {{ data.item.type }}
                    </b-badge>
                </template>

                <template slot="status" slot-scope="data">
                    <b-badge 
                        pill variant="success" v-if="data.item.status ==='Active'">Active
                    </b-badge>
                    <b-badge 
                        pill variant="primary" v-if="data.item.status ==='Completed'">Completed
                    </b-badge>
                    <b-badge 
                        pill variant="secondary" v-if="data.item.status ==='Suspended'">Suspended
                    </b-badge>
                    <b-badge 
                        pill variant="danger" v-if="data.item.status ==='Deleted'">Deleted
                    </b-badge>
                    <b-badge 
                        pill variant="warning" v-if="data.item.status ==='Pending'">Pending
                    </b-badge>
                </template>

                <template slot="phase" slot-scope="data">
                    <b-badge 
                        variant="primary"> {{ data.item.phase }}
                    </b-badge>
                </template>

            </b-table>
        </div>
        <div v-else>
            <center>
                <h5>There are no active projects under your name</h5>
                <img src="../../assets/img/TREE.gif" alt="">  
            </center>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            myProjectsTableFields: {
                projectId: {
                    label: 'ID'
                },
                name: {
                    label: 'Name'
                },
                type: {
                    label: 'Type'
                },
                status: {
                    label: 'Status'
                },
                phase: {
                    label: 'Phase'
                }
            }
        }
    },
    
    computed: { 
        ...mapState(['myProjects']),
    },

    mounted() {
        this.$store.dispatch('myProjects', {
            fields: 'projectId name status phase type',
            statuses: ['Active', 'Suspended']
        });
    }

}

</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>

