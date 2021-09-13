<template>
    <section id="home" class="section early-stage-area d-flex bg-dark-blue">
        <div class="container-fluid">
            <div class="es-rocket">
                <img class="" src="assets/img/es3.png" alt="">
            </div>
            <div class="row flex-column-reverse flex-xl-row align-items-end">
                <div class="col-xl-4 col-12 d-none d-xl-block" style="z-index:5">
                    <div class="es-decor-image">
                        <img src="/assets/img/paperplane.png" alt="">
                    </div>
                </div>
                <div class="col-xl-7 col-12 px-4" style="z-index:2">
                    <div class="es-intro p-xl-4" v-if="earlyStage">
                        <h1 class="mb-2"> {{ earlyStage.heroTitle[lang] }} </h1>
                        <h3 class="mb-4">{{ earlyStage.heroSubtitle[lang] }}</h3>
                        <a href="javascript:void(0)" v-scroll-to="'#bookPitch'" class="my-4 apply-btn btn bg-orange float-right">{{ earlyStage.heroButton[lang] }}</a>
                    </div>
                    <div class="row mt-4 company-logos-marquee">
                        <div class="col-12 mb-4" v-if="filteredCompanies.length > 0">
                             <marquee-text :key="changed" :duration="25" :repeat="3" v-on:mouseover="hover = true" v-on:mouseleave="hover = false" :paused="hover">
                                 <span class="company-marquee mx-4" v-for="c in filteredCompanies" :key="c._id">
                                    <router-link :to="'/companies/' + c._id">
                                        <img :src="baseUrl + c.logo.url" alt="">
                                    </router-link>
                                 </span>
                            </marquee-text> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    import MarqueeText from 'vue-marquee-text-component'

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                earlyId: process.env.VUE_APP_EARLY_ID,
                hover: true,
                changed: 1
            };
        },
        components: {
            MarqueeText
        },
        computed: { 
            ...mapState(['lang', 'earlyStage', 'companies']),
            filteredCompanies() {
                var c = [];
                for (var i = 0; i < this.companies.length; i++) {
                    if (this.companies[i].lifecycle._id === process.env.VUE_APP_EARLY_ID) {
                        c.push(this.companies[i])
                    }
                }

                return c;
            }
        },
        watch: {
            companies: function () {
                this.changed++;
            }
        },
        mounted() {
            this.$store.dispatch('getEarlyStage');

            setTimeout(() => this.hover = false, 1500);
        }
    }
</script>

<style>

</style>