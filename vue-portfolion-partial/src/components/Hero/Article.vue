<template>
    <div>
        <section id="coworker" class="section hero-section coworker-area d-flex ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-9 pr-0 hero-container d-flex align-items-end">
                        <img class="hero-bg" :src="baseUrl + article.hero.url" alt="Coworker" v-if="article">
                        <div class="row hero-content">
                            <div class="col-xl-10 px-4 px-sm-0  mb-4" v-if="article">
                                <h1 class="mb-2">{{ article.title[lang]}}</h1>
                                <div class="mb-4">
                                    <span v-if="article.author && lang === 'en'" class="author mr-4">{{ article.author.firstName }} {{ article.author.lastName }}</span>
                                    <span v-if="article.author && lang === 'hun'" class="author mr-4">{{ article.author.lastName }} {{ article.author.firstName }}</span>
                                    <span class="date">{{ article.updatedAt | formatDate }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 pl-0 mx-auto summary-col">
                        <sidebar :sidebar="article" />
                    </div>
                </div>
            </div>
        </section>
        <section class="section d-flex" v-if="article">
            <div class="container-fluid">
                <div class="row ptb_50 ">
                    <div class="col-xl-8 px-4 px-sm-0  description" >
                        <description :description="article.description[lang]" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
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
            ...mapState(['lang', 'base', 'article']),
            imageUrl() {
                var url = '';

                if (this.article && this.article.hero) {
                    url = this.baseUrl + this.article.hero.url;
                }

                return url;
            }
        },
        metaInfo() {
            return {
                title: "Portfolion",
                meta: [
                    { property: 'og:image', content: this.imageUrl }
                ]
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });
        },
        filters: {
            formatDate: function(date) {
                return moment(date).format('MMM. DD. YYYY.');
            }
        }
    }
</script>