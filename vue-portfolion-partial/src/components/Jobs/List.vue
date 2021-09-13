<template>
    <div class="ptb_100" v-if="filteredJobs && filteredJobs.length > 0">
        <section id="articles" class="section articles-area d-flex">
            <div class="container-fluid">
                <div class="row">
                    <div v-for="(j, index) in filteredJobs" :key="j._id" class="col-xl-6 mb-3">
                        <router-link :to="'/jobs/' + j._id">
                            <div class="card text-white article-mobile-card" :class="bgClasses[index % bgClasses.length]">
                                <img  class="card-img main-img shadow-image" v-bind:src="baseUrl + j.hero.url" alt="Job">
                                <div class="article-list-card">
                                    <div class="card-img-overlay w-100 p-4">
                                        <div class="mobile-card-content">
                                            <div class="mb-1">
                                                <h3> {{ j.title[lang] }} </h3>
                                            </div>
                                            <div class="mb-1">
                                                <span  class="tag mr-2">
                                                    {{ j.functions[lang] }}
                                                </span>
                                            </div>
                                            <div>
                                                <span class="date"><span class="fw-8">{{ j.deadline | formatDate }}</span> {{ jobDecor.deadlineTitle[lang] }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="article-details">
                                        <img height="25px" class="float-right" src="/assets/img/arrow_right.svg" alt="Details">             
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';

    export default {
        props: ['hideSelected'],
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                width: window.innerWidth,
                bgClasses: ['bg-dark-blue'],
                showImages: [true, true, false, false],
                selectedLifecycle: 'all'
            };
        },
        computed: { 
            ...mapState(['lang', 'jobs', 'jobDecor']),
            filteredJobs() {
                var filteredJobs = [];

                if (this.hideSelected) {
                    for (var i = 0; i < this.jobs.length; i++) {
                        if (!(this.$store.state.job && this.$store.state.job._id === this.jobs[i]._id)) {
                            filteredJobs.push(this.jobs[i])
                        }
                    }
                } else {
                    filteredJobs = this.jobs;
                }

                return filteredJobs;
            }
        },
        filters: {
            formatDate: function(date) {
                return moment(date).format('YYYY. MM. DD.');
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });          

            if (!this.$store.state.jobs || !this.$store.state.jobs.length != 0) {
                this.$store.dispatch('getJobs');
            }
        }
    }
</script>