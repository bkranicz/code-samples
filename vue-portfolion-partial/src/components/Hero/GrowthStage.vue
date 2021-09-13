<template>
    <section id="home" class="section growth-stage-area d-flex bg-red">
        <div class="container-fluid">
            <div class="gs-circle d-none d-xl-block">
                <img src="/assets/img/dotted_white_circle.svg" alt="">
            </div>
            <div class="gs-bg-image" style="z-index: 3">
                <div class="bg-image">
                    <img src="/assets/img/orange_circle_bg.svg" alt="Background">
                </div>
            </div>
            <div class="gs-hero-image" style="z-index: 5;">
                <img class="hero-image" src="/assets/img/repulok.png" alt="Buyout">
            </div> 
            <div class="row flex-column-reverse flex-xl-row align-items-end">
                <div class="col-xl-7 offset-xl-5 col-12 px-4 px-sm-0" style="z-index:2">
                    <div class="gs-intro" v-if="growthStage">
                        <h1 class="mb-2"> {{ growthStage.title[lang] }} </h1>
                        <h3>{{ growthStage.subtitle[lang] }}</h3>
                    </div>
                    <div class="row mt-4 company-logos-marquee" >
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
                hover: true,
                changed: 1
            };
        },
        components: {
            MarqueeText
        },
        computed: { 
            ...mapState(['lang', 'growthStage', 'companies']),
            filteredCompanies() {
                var c = [];
                for (var i = 0; i < this.companies.length; i++) {
                    if (this.companies[i].lifecycle._id === process.env.VUE_APP_GROWTH_ID) {
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
            this.$store.dispatch('getGrowthStage');

            setTimeout(() => this.hover = false, 1500);

        }
    }
</script>

<style>

</style>