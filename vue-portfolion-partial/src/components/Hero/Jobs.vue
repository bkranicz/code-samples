<template>
    <section id="articles-hero" class="section coworkers-section d-flex bg-dark-blue v-center">
        <div class="container-fluid articles-area">
            <div class="row">
                <div class="col-xl-8 col-lg-9 col-md-12 col-12 px-4 px-sm-0">
                    <div class="hero" v-if="jobDecor">
                        <h1 class="mb-2">{{ jobDecor.title[lang] }}</h1>
                        <h3>{{ jobDecor.subtitle[lang] }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <kinesis-container class="articles-decor-1" event="scroll" :duration="2000">
            <kinesis-element tag="div" :strength="-50" type="translate" :originY="0" :maxX="0" axis="y" >
                <div>
                    <img src="/assets/img/job_circle_decor.svg" alt="">
                </div>
            </kinesis-element>
        </kinesis-container>
        <kinesis-container class="articles-decor-2" event="scroll" :duration="2000">
            <kinesis-element tag="div" :strength="50" :originY="0" type="translate" axis="y">
                <div>
                    <img src="/assets/img/herojobscrosses.png" alt="Jobs">
                </div>
            </kinesis-element>
        </kinesis-container>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI
            };
        },
        computed: { 
            ...mapState(['lang', 'jobDecor'])
        }
    }
</script>

<style>

</style>