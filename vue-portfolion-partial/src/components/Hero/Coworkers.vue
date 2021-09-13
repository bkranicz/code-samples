<template>
    <section id="coworkers-hero" class="section coworkers-section d-flex bg-blue v-center">
        <div class="container-fluid coworkers-area">
            <div class="row">
                <div class="col-xl-8 col-lg-9 col-md-12 col-12 px-4 px-sm-0">
                    <div class="hero" v-if="coworkerDecor">
                        <h1 class="mb-2">{{ coworkerDecor.listTitle[lang] }}</h1>
                        <h3>{{ coworkerDecor.listSubtitle[lang] }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <kinesis-container class="coworkers-decor-1" event="scroll" :duration="2000">
            <kinesis-element tag="div" :strength="-60" type="translate" :originY="0" :maxX="0" axis="y" >
                <div>
                    <img src="/assets/img/dotted_circle_blue.svg" alt="">
                </div>
            </kinesis-element>
        </kinesis-container>
        <kinesis-container class="coworkers-decor-2" event="scroll" :duration="2000">
            <kinesis-element tag="div" :strength="50" :originY="0" type="translate" axis="y">
                <div>
                    <img src="/assets/img/peoplewhite.png" alt="Coworkers">
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
            ...mapState(['lang', 'coworkerDecor'])
        },
        mounted() {
            if (!this.$store.state.coworkerDecor) {
                this.$store.dispatch('getCoworkerDecor');
            }
        }
    }
</script>

<style>

</style>