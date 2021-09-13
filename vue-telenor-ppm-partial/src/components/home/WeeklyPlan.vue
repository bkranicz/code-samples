<template>
    <div>
        <div v-if="weekData.length > 0">
            <b-table
                :items="weekData"
                :fields="weeklyPlanTableFields"
                :striped="true"
                class="card-table"
                id="weekly-plan-table"
                responsive>

            <template slot="_id.projectId" slot-scope="data">
                <a :href="'/#/project/' + data.item.href"><b>{{data.item._id.projectId}}</b></a>
            </template>

            <template slot="resman" slot-scope="data">
                <div v-if="!data.item.resman">
                    <i class="fas fa-times" style="color: #FF9494"></i>
                </div>
                <div v-else>
                    {{data.item.resman + ' h'}}
                </div>                            
            </template>

            <template slot="timesheet" slot-scope="data">
                <div v-if="!data.item.timesheet">
                    <i class="fas fa-times" style="color: #FF9494"></i>
                </div>
                <div v-else>
                    {{data.item.timesheet + ' h'}}
                </div> 
            </template>

            </b-table>
            
        </div>
        <div v-else>
            <center>
                <h5>You don't have any data to show</h5>
                <img src="../../assets/img/ASTRO_UNS.gif" alt="">  
            </center>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            weeklyPlanTableFields: {
                '_id.projectId': {
                    label: 'ID'
                },
                name: {
                    label: 'Name'
                },
                resman: {
                    label: 'Plan'
                },
                timesheet: {
                    label: 'Actual'
                }
            }
        }
    },

    computed: {
        ...mapState(['weekData']),
    },

    mounted() {
        this.$store.dispatch('getWeekData');
    }
}

</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>

