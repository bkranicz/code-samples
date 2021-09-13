<template>
    <section id="articles-hero" class="section coworkers-section d-flex bg-blue v-center">
        <div class="container-fluid articles-area">
            <div class="row">
                <div class="col-xl-8 col-lg-9 col-md-12 col-12 px-4 px-sm-0">
                    <div class="hero" v-if="articlesDecor">
                        <h1 class="mb-2">{{ articlesDecor.listTitle[lang] }}</h1>
                        <h3>{{ articlesDecor.listSubtitle[lang] }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <kinesis-container class="articles-decor-1" event="scroll" :duration="2000">
            <kinesis-element tag="div" :strength="-50" type="translate" :originY="0" :maxX="0" axis="y" >
                <div>
                    <img src="/assets/img/dotted_circle_green.svg" alt="">
                </div>
            </kinesis-element>
        </kinesis-container>
        <kinesis-container class="articles-decor-2" event="scroll" :duration="2000">
            <kinesis-element tag="div" :strength="50" :originY="0" type="translate" axis="y">
                <div>
                    <img src="/assets/img/articles-decor-2.png" alt="">
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
            ...mapState(['lang', 'articlesDecor'])
        },
        mounted() {
            if (!this.$store.state.articlesDecor) {
                this.$store.dispatch('getArticlesDecor');
            }
        }
    }
</script>

<style>

</style>