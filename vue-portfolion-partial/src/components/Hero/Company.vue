<template>
    <div>
        <section id="coworker" class="section coworker-area d-flex ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-9 pr-0 hero-container d-flex align-items-end">
                        <img class="hero-bg" :src="baseUrl + company.hero.url" alt="Company" v-if="company">
                        <div class="row hero-content">
                            <div class="col-xl-10 px-4 px-sm-0  mb-4" v-if="company">
                                <h1 class="mb-2">{{company.name}}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 pl-0 mx-auto summary-col">
                        <sidebar :sidebar="company" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section d-flex" v-if="company.description">
            <div class="container-fluid">
                <div class="row ptb_50">
                    <div class="col-xl-8 px-4 px-sm-0 description">
                        <description :description="company.description[lang]" />
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import Description from './Description';
    import Sidebar from './Sidebar';

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                id: this.$route.params.id,
                width: window.innerWidth
            };
        },
        components: {
            'sidebar': Sidebar,
            'description': Description
        },
        computed: { 
            ...mapState(['lang', 'base', 'company']),
            orderedCoworkers() {
                let sorted = [];

                if (this.company.coworkers.length > 0) {
                    sorted = this.company.coworkers.slice().sort((a, b) => b.displayPriority - a.displayPriority);
                }

                return sorted;
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });
        }
    }
</script>