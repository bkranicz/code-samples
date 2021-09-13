<template>
    <div>
        <section id="coworker" class="section coworker-area d-flex ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-9 pr-0 hero-container d-flex align-items-end">
                        <img class="hero-bg" :src="baseUrl + job.hero.url" alt="Company" v-if="job">
                        <div class="row hero-content">
                            <div class="col-xl-10 px-4 px-sm-0  mb-4">
                                <h1 class="mb-2">{{job.title[lang]}}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 pl-0 mx-auto summary-col">
                        <div class="summary py-8" :class="width < 1199 ? 'px-4' : 'pl-8'" v-if="job">
                            <div class="mb-4">
                                <h3 class="mt-4 mb-2">{{ jobDecor.deadlineTitle[lang] }}</h3>
                                <p class="mb-2"> {{ job.deadline | formatDate }} </p>
                            </div>
                            <div class="mb-4">
                                <h3 class="mt-4 mb-2">{{ jobDecor.levelTitle[lang] }}</h3>
                                <p class="mb-2"> {{ job.level[lang] }} </p>
                            </div>
                            <div class="mb-4">
                                <h3 class="mt-4 mb-2">{{ jobDecor.typeTitle[lang] }}</h3>
                                <p class="mb-2"> {{ job.type[lang] }} </p>
                            </div>
                            <div class="mb-4">
                                <h3 class="mt-4 mb-2">{{ jobDecor.functionsTitle[lang] }}</h3>
                                <p class="mb-2"> {{ job.functions[lang] }} </p>
                            </div>
                            <div class="text-center">
                                <a id="bookPitch" class="btn bg-red bookPitchBtn my-4"  :href="'mailto:' + jobDecor.applyBtn.url" >{{ jobDecor.applyBtn[lang] }}</a>
                            </div>
                            <kinesis-container class="image-text-right-center" event="scroll" :duration="2000">
                                <kinesis-element tag="div" :strength="150" axis="y"  :originY="0" type="translate" >
                                    <div>
                                        <img src="/assets/img/blue_circle.svg" alt="">
                                    </div>
                                </kinesis-element>
                            </kinesis-container>
                        </div>
                        <div v-else class="summary py-8" :class="width < 1199 ? 'px-4' : 'pl-8'">
                            <div class=" ph-item">
                                <div class="ph-col-12">
                                    <div class="ph-row my-4">
                                        <div class="ph-col-12 big mb-2"></div>
                                        <div class="ph-col-8 "></div>
                                        <div class="ph-col-8 "></div>
                                    </div>
                                    <div class="ph-row my-4">
                                        <div class="ph-col-12 big mb-2"></div>
                                        <div class="ph-col-8 "></div>
                                        <div class="ph-col-8 "></div>
                                    </div>
                                    <div class="ph-row my-4">
                                        <div class="ph-col-12 big mb-2"></div>
                                        <div class="ph-col-8 "></div>
                                        <div class="ph-col-8 "></div>
                                    </div>
                                    <div class="ph-row my-4">
                                        <div class="ph-col-12 big mb-2"></div>
                                        <div class="ph-col-8 "></div>
                                        <div class="ph-col-8 "></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section d-flex" v-if="job.description">
            <div class="container-fluid">
                <div class="row ptb_50">
                    <div class="col-xl-8 px-4 px-sm-0 description">
                        <markdown-it-vue class="md-body" :content="job.description[lang]" :options="options" />
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
    import moment from 'moment';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                id: this.$route.params.id,
                width: window.innerWidth,
                options: {
                    markdownIt: {
                        linkify: false
                    },
                    linkAttributes: {
                        attrs: {
                        target: '_blank',
                        rel: 'noopener'
                        }
                    }
                }
            };
        },
        computed: { 
            ...mapState(['lang', 'base', 'job', 'jobDecor'])
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
        }
    }
</script>

<style>
    @import './../../../node_modules/markdown-it-vue/dist/markdown-it-vue.css';

    .markdown-body blockquote {
        border: none !important;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 20px;
        padding-right: 20px;
        margin-left: -30px;
        background-image: url("/assets/img/quote.svg");
        background-repeat: no-repeat;
        background-position: 1% 3%;
    }

    .markdown-body blockquote p {
        margin-top: 20px !important;
        padding: 30px;
        font-size: 18px;
        background-color: #E8F3FC !important;
    }

    .markdown-body ul li {
        list-style: disc !important;
    }

    .markdown-body h1, .markdown-body h2 {
        border-bottom: none !important;
    }

    .anchor {
        display: none;
    }
</style>