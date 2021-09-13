<template>
    <div>
        <section class="coworker-decor" v-if="coworkerDecor">
            <div class="container-fluid bg-white">
                <div class="row flex-column-reverse flex-xl-row coworker-list-decor">
                    <div class="col-xl-8 mt-auto px-4 p-xl-0">
                        <h1>{{ coworkerDecor.homeTitle[lang] }}</h1>
                        <p class="pb_25">{{ coworkerDecor.homeSubtitle[lang] }}</p>
                        <div class="mt-4 pt-2 roleGroups" v-if="roleGrouped">
                            <span 
                                v-for="r in roleGroups" 
                                :key="r._id" 
                                class="position-group mr-2 mr-xl-4"
                                @click="setRole(r[lang])"
                                v-bind:class="{'position-group-active':(r[lang] === role)}">
                                {{ r[lang] }}
                            </span>
                        </div>
                    </div>
                </div>
                <kinesis-container event="scroll" class="coworkers-hand" v-if="showDecor">
                    <kinesis-element tag="div" :strength="-150" :originY="0" originalX="0" type="translate" axis="y">
                        <div class="">
                            <img src="/assets/img/peopleblue.png" alt="">
                        </div>
                    </kinesis-element>
                </kinesis-container>
            </div>
        </section>
        <section id="coworkers" class="section d-flex bg-lightest-blue" :class="width < 1200 ? '' : 'pt_25 pb_100'">
            <div class="container-fluid">
                <div v-if="width < 1200">
                    <span v-for="(c, index) in filteredCoworkers" :key="c._id">
                        <mobile-card :coworker="c" :color="bgClasses[index % bgClasses.length]" :leftOriented="index % 2 === 0"/>
                    </span>
                     <div class="row mb-0">
                        <div class="col-6 p-0" :class="filteredCoworkers.length % 2 === 0 ? 'offset-6' : ''" v-if="coworkerDecor">
                            <router-link :to="coworkerDecor.homeButton.url">
                                <div class="mobile-box bg-blue">
                                    <div class="bottom-left p-3">
                                        <div>
                                            <h3>{{ coworkerDecor.homeButton[lang] }} ({{coworkers.length}})</h3>
                                        </div>
                                        <div>
                                            <img height="25px" class="float-right" src="assets/img/arrow_right.svg" alt="Details">
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row">
                        <div v-for="(c, index) in filteredCoworkers" :key="c._id" class="col-xl-3 p-0" :class="(index+1) === filteredCoworkers.length ? '' : colClasses[index % colClasses.length]">
                            <card :coworker="c" :color="hoverClasses[index % hoverClasses.length]"/>
                        </div>
                        <div class="col-xl-3 p-0" v-if="coworkerDecor">
                            <router-link  :to="coworkerDecor.homeButton.url">
                                <div class="box bg-blue">
                                    <div class="bottom-left px-4 py-3">
                                        <div class="box-content">
                                            <div>
                                                <h3>{{ coworkerDecor.homeButton[lang] }} ({{coworkers.length}})</h3>
                                            </div>
                                            <div>
                                                <img height="25px" class="float-right" src="assets/img/arrow_right.svg" alt="Details">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="row coworker-list" v-if="showDecor">
                    <div class="col-xl-9">
                        <kinesis-container class="" event="scroll" v-if="width > 1199">
                            <kinesis-element tag="div" :strength="7"  :originY="0"  type="rotate" axis="y">
                                <div>
                                    <img src="/assets/img/coworker_circle.svg" alt="" class="coworker-decor-image-2">
                                </div>
                            </kinesis-element>
                        </kinesis-container>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import Card from './Card';
    import MobileCard from './MobileCard';

    export default {
        props: ['roleGrouped', 'lifecycleGrouped', 'showDecor', 'lifecycleId'],
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
            ...mapState(['lang', 'coworkers', 'roleGroups', 'coworkerDecor']),
            filteredCoworkers() {
                var workers = [];

                if (this.roleGrouped) {
                    for (var i = 0; i < this.coworkers.length; i++) {
                        if (this.coworkers[i].role_group[this.lang] === this.role) {
                            workers.push(this.coworkers[i]);
                        }
                    }
                } else if (this.lifecycleGrouped) {
                    for (var j = 0; j < this.coworkers.length; j++) {
                        for (var k = 0; k < this.coworkers[j].lifecycles.length; k++) {
                            if (this.coworkers[j].lifecycles[k]._id === this.lifecycleId) {
                                workers.push(this.coworkers[j]);
                            }
                        }
                    }
                }

                let sorted = workers.slice().sort((a, b) => b.displayPriority - a.displayPriority);

                return sorted;
            }
        },
        methods: {
            setRole(role) {
                this.role = role;
            }
        },
        watch: {
            roleGroups: {
                deep: true,
                handler: function (newVal) {
                    this.role = newVal[0][this.lang]
                }
            },
            lang: {
                deep: true,
                 handler: function (newVal, oldVal) {
                    for (var i = 0; i < this.roleGroups.length; i++) {
                        if (this.roleGroups[i][oldVal] === this.role) {
                                this.role = this.roleGroups[i][newVal]
                        }
                    }
                }
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });

            if (!this.$store.state.roleGroups || this.$store.state.roleGroups.length === 0) {
                this.$store.dispatch('getRoleGroups');
            } else {
                this.role = this.roleGroups[0][this.lang]
            }
            
            if (!this.$store.state.coworkerDecor) {
                this.$store.dispatch('getCoworkerDecor');
            }

            if (!this.$store.state.coworkers || this.$store.state.coworkers.length === 0) {
                this.$store.dispatch('getCoworkersGraph');
            }
        }
    }
</script>