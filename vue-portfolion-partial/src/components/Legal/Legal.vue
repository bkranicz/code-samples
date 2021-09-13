<template>
    <section id="legal" class="section legal-area d-flex bg-lightest-blue" v-if="legal">
        <div class="container-fluid my-4">
            <div class="row">
                <div class="col">
                    <h1>{{ legal.title[lang] }}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <vue-markdown :key="lang">{{ legal.content[lang] }}</vue-markdown>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    import VueMarkdown from 'vue-markdown'

    export default {
        components: {
            VueMarkdown
        },
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI
            };
        },
        computed: { 
            ...mapState(['lang', 'legal'])
        }
    }
</script>

<style lang="css">
    .legal-area {
        padding-top: 170px;
        padding-bottom: 100px;
    }
    .legal-area h1 {
        font-family: Squad;
        font-weight: 800;
        font-size: 60px;
        line-height: 79px;
        color: #082744;
    }
    .legal-area h3 {
        padding-top: 30px !important;
        font-size: 40px;
        color: #082744;
    }
    .legal-area h4 {
        font-size: 24px;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #082744;
    }
    .legal-area p {
        font-size: 18px;
        color: #082744;
    }
    .legal-area ul {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .legal-area ol {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .legal-area li {
        font-size: 18px;
        color: #082744;
        margin-left: 10px;
        list-style-type: circle;
    }
</style>