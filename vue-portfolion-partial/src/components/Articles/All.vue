<template>
    <div class="ptb_100">
        <section id="articles" class="section articles-area d-flex">
            <div class="container-fluid">
                <div class="row mb-4">
                    <div class="col px-4">
                        <span class="lifecycle mr-2 mr-xl-4" @click="setLifecycle('all')" v-if="lang==='en'" :class="[selectedLifecycle === 'all' ? 'lifecycle-active' : '']">All</span>
                        <span class="lifecycle mr-2 mr-xl-4" @click="setLifecycle('all')" v-if="lang==='hun'" :class="[selectedLifecycle === 'all' ? 'lifecycle-active' : '']">Összes</span>
                        <span class="lifecycle mr-2 mr-xl-4" @click="setLifecycle(l)" v-for="l in lifecycles" :key="l._id" :class="[selectedLifecycle === l.en ? 'lifecycle-active' : '']">
                            {{ l[lang] }}
                        </span>
                    </div>
                </div>
                <div class="row mb-4" v-if="articles && articles.length > 0">
                    <div v-for="(a, index) in articles" :key="a._id" class="col-xl-6 mb-3">
                        <card :article="a" :color="bgClasses[index % bgClasses.length]" :showImage="getImageVisibility(index)" />
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

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                width: window.innerWidth,
                bgClasses: ['bg-green', 'bg-light-blue', 'bg-dark-blue', 'bg-classic-blue'],
                showImages: [true, true, false, false],
                selectedLifecycle: 'all'
            };
        },
        components: {
            'card': Card
        },
        computed: { 
            ...mapState(['lang', 'articles', 'lifecycles', 'areas']),
        },
        filters: {
            formatDate: function(date) {
                return moment(date).format('MMM. DD. YYYY.');
            }
        },
        methods: {
            getImageVisibility(index) {
                if (this.width < 1200 && index % 2 === 0) {
                    return true;
                } else if (this.width >=1200 && this.showImages[index % this.showImages.length]) {
                    return true;
                } else {
                    return false;
                }
            },
            setLifecycle(l) {
                if (l === 'all') {
                    this.selectedLifecycle = 'all';
                    this.$store.dispatch('getArticlesGraph', {
                        limit: 0,
                        sort: "pubDate:desc"
                    });
                    this.addParamsToLocation({});

                } else {
                    this.selectedLifecycle = l.en;
                    this.$store.dispatch('getArticlesByLifecycle', l._id);
                    this.addParamsToLocation({lifecycle: l.en});
                }
            },
            addParamsToLocation(params) {
                history.pushState(
                    {},
                    null,
                    this.$route.path +
                    '?' +
                    Object.keys(params)
                        .map(key => {
                        return (
                            encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                        )
                        })
                        .join('&')
                )
            },
            checkParams() {
                if (this.$route.query.lifecycle) {
                    for (var i = 0; i < this.lifecycles.length; i++) {
                        if (this.$route.query.lifecycle === this.lifecycles[i].en) {
                            this.setLifecycle(this.lifecycles[i]);
                        }
                    }

                } else if (this.$route.query.area) {
                    for (var j = 0; j < this.areas.length; j++) {
                        if (this.$route.query.area === this.areas[j].en) {
                            this.$store.dispatch('getArticlesByArea', this.areas[j]._id);
                            this.selectedLifecycle = '';
                            this.addParamsToLocation({area: this.areas[j].en});
                        }
                    }
                
                } else {
                    this.setLifecycle('all');
                }
            }
        },
        watch: {
            '$route.query.area': function() {
                this.checkParams()
            }
        },
        mounted() {
            this.$store.commit('setArticle', '');

            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });

            this.checkParams();            
        }
    }
</script>