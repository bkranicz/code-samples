<template>
    <div>
        <section id="coworker" class="section hero-section coworker-area d-flex ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-9 pr-0 hero-container d-flex align-items-end">
                        <img class="hero-bg" :src="baseUrl + coworker.image.url" alt="Coworker" v-if="coworker">
                        <div class="row hero-content">
                            <div class="col-xl-10 px-4 px-sm-0  mb-4" v-if="coworker">
                                <h1 class="mb-2" v-if="lang === 'en'">{{coworker.firstName}} {{coworker.lastName}}</h1>
                                <h1 class="mb-2" v-if="lang === 'hun'"><span v-if="coworker.rank">{{ coworker.rank }}</span> {{coworker.lastName}} {{coworker.firstName}}</h1>
                                <h3 class="mb-4">{{ coworker.title[lang] }}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 pl-0 mx-auto summary-col">
                        <sidebar :sidebar="coworker" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section d-flex" v-if="coworker">
            <div class="container-fluid">
                <div class="row ptb_50">
                    <div class="col-xl-8 px-4 px-sm-0 description" >
                        <description :description="coworker['description_' + lang]"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Sidebar from './Sidebar';
    import Description from './Description';

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                id: this.$route.params.id,
                width: window.innerWidth
            };
        },
        components: {
            'description': Description,
            'sidebar': Sidebar
        },
        computed: { 
            ...mapState(['lang', 'base', 'coworker'])
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });
        }
    }
</script>