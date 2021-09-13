<template>
    <div v-if="coworkers && roleGroups" class="coworkers-all">
        <div v-for="(g, index) in Object.keys(coworkersGroups)" :key="g._id">
             <section :class="[index % 2 === 0 ? 'bg-lightest-blue' : 'bg-white']">
                 <div class="container-fluid">
                     <div class="row">
                         <div class="col px-4 px-sm-0 pt_50">
                             <h1>{{ coworkersGroups[g][lang] }}</h1>
                         </div>
                     </div>
                     <div class="row ptb_50" v-if="width > 1199" >
                        <div v-for="(c, index) in coworkersGroups[g].coworkers" :key="c._id" class="col-xl-3 p-0" :class="colClasses[index % colClasses.length]">
                            <card :coworker="c" :color="hoverClasses[index % hoverClasses.length]"/>
                        </div>
                    </div>
                    <div v-else>
                        <span v-for="(c, index) in coworkersGroups[g].coworkers" :key="c._id">
                            <mobile-card :coworker="c" :color="bgClasses[index % bgClasses.length]" :leftOriented="index % 2 === 0"/>
                        </span>
                    </div>
                 </div>
             </section>
        </div>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import Card from './Card';
    import MobileCard from './MobileCard';

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                role: '',
                width: window.innerWidth,
                colClasses: ['', '', 'offset-xl-right-3', 'offset-xl-3', '', ''],
                hoverClasses: ['bg-transparent-blue', 'bg-transparent-green', 'bg-transparent-blue', 'bg-transparent-blue', 'bg-transparent-green', 'bg-transparent-blue'],
                bgClasses: ['bg-green', 'bg-light-blue', 'bg-dark-blue', 'bg-classic-blue']
            };
        },
        components: { 
            'card': Card,
            'mobile-card': MobileCard
        },
        computed: { 
            ...mapState(['lang', 'coworkers', 'roleGroups']),
            coworkersGroups() {
                var groups = {};

                for (var i = 0; i < this.roleGroups.length; i++) {
                    groups[this.roleGroups[i].en] = {
                        en: this.roleGroups[i].en,
                        hun: this.roleGroups[i].hun,
                        coworkers: []
                    }

                    var groupList = [];

                    for (var j = 0; j < this.coworkers.length; j++) {
                        if (this.roleGroups[i].en === this.coworkers[j].role_group.en) {
                            groupList.push(this.coworkers[j])
                            
                        }
                    }

                    let sorted = groupList.slice().sort((a, b) => b.displayPriority - a.displayPriority);

                    groups[this.roleGroups[i].en].coworkers = sorted;

                }

                return groups;
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });

            if (!this.$store.state.roleGroups || this.$store.state.roleGroups.length === 0) {
                this.$store.dispatch('getRoleGroups');
            }

            if (!this.$store.state.coworkers || this.$store.state.coworkers.length === 0) {
                this.$store.dispatch('getCoworkersGraph');
            }

        }
    }
</script>