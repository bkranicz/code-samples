<template>
    <section id="home" class="section buy-out-area d-flex bg-light-blue">
        <div class="container-fluid">
            <div class="row flex-column-reverse flex-xl-row">
                <div class="col-xl-6">
                    <img src="/assets/img/docker.png" class="buyout-hero-img" alt="Buy Out Stage">
                </div>
                <div class="col-xl-6 align-self-center content px-4 px-sm-0" v-if="buyOut">
                    <h1 class="mb-4">{{ buyOut.title[lang] }}</h1>
                    <h3>{{ buyOut.subtitle[lang] }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                hover: false,
            };
        },
        computed: { 
            ...mapState(['lang', 'buyOut'])
        },
        mounted() {
            this.$store.dispatch('getBuyOut');
        }
    }
</script>

<style>

</style>