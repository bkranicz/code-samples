<template>
    <div v-if="articles && articles.length > 0" class="ptb_50">
        <section v-if="articlesDecor" class="articles-decor">
            <div class="container-fluid">
                <kinesis-container v-if="width > 1199 && showDecor" event="scroll" :duration="2000" style="position: absolute; left: 0; margin-top: -100px; z-index: 0;">
                    <kinesis-element tag="div" :strength="200" :originY="0" type="translate" axis="y">
                        <div >
                            <img src="/assets/img/dotted_circles_left.svg" alt="">
                        </div>
                    </kinesis-element>
                </kinesis-container>
                <div class="row ptb_50" >
                    <div class="col-xl-8 col-12 px-4 p-xl-0" v-if="!useBaseTitle">
                        <h1>{{ articlesDecor.homeTitle[lang] }}</h1>
                        <h3>{{ articlesDecor.homeSubtitle[lang] }}</h3>
                    </div>
                    <div class="col-xl-8 col-12 px-4 p-xl-0" v-if="useBaseTitle">
                        <h1>{{ base.storyTitle[lang] }}</h1>
                    </div>
                </div>
            </div>
        </section>
        <section id="articles" class="section articles-area d-flex">
            <div class="container-fluid" v-if="width < 1200">
                <div class="row mb-4">
                    <div v-for="(a, index) in articles" :key="a._id" class="col-12 mb-3">
                        <card :article="a" :showImage="index % 2 == 0" :color="bgClasses[index % bgClasses.length]"/>
                    </div>
                </div>
                <div class="row" v-if="showAll">
                    <div class="col-12">
                        <router-link :to="articlesDecor.homeButton.url" class="btn bg-red float-right my-4">{{ articlesDecor.homeButton[lang] }}</router-link>
                    </div>
                </div>
            </div>
            <div class="container-fluid" v-else>
                <div class="row mb-4">
                    <div class="col-xl-8 pl-0" v-if="articles[0]">
                        <square-card :article="articles[0]" color="bg-dark-blue" :showImage="true" :showText="true" :isLarge="true"/>
                    </div>
                    <div class="col-xl-4 align-content-bottom" v-if="articles[1]">
                        <div class="row">
                            <div class="col-12 mb-4">
                                <square-card :article="articles[1]" color="bg-green" :showImage="false" :showText="true" :isLarge="false"/>
                            </div>
                            <div class="col-12 " v-if="articles[2]">
                                <square-card :article="articles[2]" color="bg-classic-blue" :showImage="false" :showText="true" :isLarge="false"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-4 mb-4 pl-0" v-if="articles[3]">
                        <square-card :article="articles[3]" color="bg-green" :showImage="true" :showText="true" :isLarge="false"/>
                    </div>
                    <div v-if=" articles[4]" class="col-xl-4 mb-4 pr-0 article article-full-pic">
                        <router-link :to="'/articles/' + articles[4]._id">
                            <div class="article-img-container">
                                <img class="hero-img" v-bind:src="baseUrl + articles[4].hero.url" alt="Article">
                            </div>
                        </router-link>
                    </div>
                    <div class="col-xl-4 mb-4 pl-xl-0" v-if="articles[4]">
                        <square-card :article="articles[4]" color="bg-dark-blue" :showImage="false" :showText="true" :isLarge="false"/>
                    </div>
                </div>
                <div class="row" v-if="articlesDecor && showAll">
                    <div class="col-12">
                        <router-link :to="articlesDecor.homeButton.url" class="btn bg-red float-right my-4">{{ articlesDecor.homeButton[lang] }}</router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';
    import Card from './Card';
    import SquareCard from './SquareCard';

    export default {
        props: ['showAll', 'useBaseTitle', 'showDecor'],
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                width: window.innerWidth,
                bgClasses: ['bg-green', 'bg-light-blue', 'bg-dark-blue', 'bg-classic-blue'],
                showImages: [true, true, false, false],
            };
        },
        components: {
            'card': Card,
            'square-card': SquareCard
        },
        computed: { 
            ...mapState(['lang', 'articles', 'articlesDecor', 'base']),
        },
        filters: {
            formatDate: function(date) {
                return moment(date).format('MMM. DD. YYYY.');
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });

            if (!this.$store.state.articlesDecor) {
                this.$store.dispatch('getArticlesDecor')
            }
        }
    }
</script>