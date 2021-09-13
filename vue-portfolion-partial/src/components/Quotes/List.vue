<template>
    <div v-if="(filteredQuotes && filteredQuotes.length > 0) && (filteredCompanies && filteredCompanies.length > 0)" class="ptb_100">
        <section id="quotes-decor" class="quotes-decor" v-if="quotesDecor">
            <div class="container-fluid ">
                <kinesis-container v-if="width > 1199 && showDecor" event="scroll" :duration="2000" style="position: absolute; right: 0; z-index: 0;">
                    <kinesis-element tag="div" :strength="-200" :originY="0" type="translate" axis="y">
                        <div >
                            <img src="/assets/img/dotted_circles_right.svg" alt="">
                        </div>
                    </kinesis-element>
                </kinesis-container>
                <div class="row ptb_50">
                    <div class="col-xl-8 col-12 px-4 p-xl-0" v-if="!useBaseTitle">
                        <h1 class="mb-2">{{ quotesDecor.homeTitle[lang] }}</h1>
                        <h3>{{ quotesDecor.homeSubtitle[lang] }}</h3>
                    </div>

                    <div class="col-xl-8 col-12 px-4 p-xl-0" v-if="useBaseTitle">
                        <h1>{{ base.companyTitle[lang] }}</h1>
                    </div>
                </div>
            </div>
        </section>
        <section id="quotes" class="quotes">
            <div class="container-fluid">
                <div class="row flex-column-reverse flex-xl-row">
                    <div class="col-xl-8 pb_100" :class="width > 1199 ? 'p-0' : 'p-0'">
                        <VueSlickCarousel v-bind="settings" @afterChange="quoteChange" @init="setFirstCompany" :class="dotColor">
                                <div class="quote-carousel bg-lightest-blue p-0" style="position:absolute;" v-for="q in filteredQuotes" :key="q._id">
                                    <router-link :to="'/companies/' + q.company._id" v-if="q.company && q.coworker">
                                        <div class="col-12 px-0 pt-0 pb-4">
                                            <img v-bind:src="baseUrl + q.company.hero.url" alt="Company" width="100%" class="main-img">
                                        </div>
                                        <div class="col-xl-10 offset-xl-1 p-0 quote-content">
                                            <h3 class="px-8 pb-2">{{ q[lang] }}</h3>
                                            <div class="px-8 author float-right py-4">
                                                <img v-bind:src="baseUrl + q.coworker.image.url" alt="Coworker">
                                                <span v-if="lang === 'hun'" class="ml-2">{{ q.coworker.lastName }} {{ q.coworker.firstName }}  <br><span class="role">{{ q.coworker.title[lang] }}</span></span> 
                                                <span v-if="lang === 'en'" class="ml-2">{{ q.coworker.firstName }} {{ q.coworker.lastName }}  <br><span class="role">{{ q.coworker.title[lang] }}</span></span> 
                                            </div>
                                        </div>
                                        <div class="see-more">
                                            <img height="25px" class="float-right" src="/assets/img/arrow_right_dark.svg" alt="Details">
                                        </div>
                                    </router-link>
                                </div>
                        </VueSlickCarousel>
                    </div>
                    <div class="col-xl-4 ">
                        <div class="row company-logo-list bg-dark-blue">
                            <div class="col-6 my-auto py-4 text-center" v-for="c in filteredCompanies" :key="c._id" :class="highlightedCompany === c._id ? highlight : 'bg-dark-blue'">
                                <router-link  :to="'/companies/' + c._id">
                                    <img v-bind:src="baseUrl + c.logo.url" alt="Company" width="100%">
                                </router-link>
                            </div>
                        </div>
                        <div class="row bg-dark-blue py-4" v-if="quotesDecor && showButton">
                            <div class="col text-center">
                                <router-link :to="quotesDecor.homeButton.url" class="btn bg-red">{{ quotesDecor.homeButton[lang] }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>


<script>
    import { mapState } from 'vuex';
    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    export default {
        props: ['highlight', 'dotColor', 'lifecycleId', 'showButton', 'useBaseTitle', 'showDecor'],
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                settings: {
                    "dots": true,
                    "dotsClass": "slick-dots custom-dot-class",
                    "infinite": true,
                    "speed": 1500,
                    "autoplaySpeed": 5000,
                    "slidesToShow": 1,
                    "slidesToScroll": 1,
                    "autoplay": true
                },
                width: window.innerWidth,
            };
        },
        components: {
            VueSlickCarousel
        },
        computed: { 
            ...mapState(['lang', 'companies', 'quotes', 'highlightedCompany', 'quotesDecor', 'base']),
            filteredQuotes() {
                var q = [];

                // Filter if needed
                for (var i = 0; i < this.quotes.length; i++) {
                    
                    if (this.lifecycleId && this.quotes[i].company.lifecycle._id === this.lifecycleId) {
                        q.push(this.quotes[i]);
                    } else if (!this.lifecycleId) {
                        q.push(this.quotes[i]);
                    }
                }

                // Sort by displayPriority
                var sorted = q.slice().sort((a, b) => b.displayPriority - a.displayPriority);
                
                // Return only the max number of elements
                return sorted.slice(0, process.env.VUE_APP_MAX_QUOTES);

            },
            filteredCompanies() {                
                var companiesWithQuotes = [];
                var c = [];

                this.filteredQuotes.forEach(q => {
                    companiesWithQuotes.push(q.company._id)
                });

                if (this.lifecycleId) {
                    for (var i = 0; i < this.companies.length; i++) {
                        if (this.companies[i].lifecycle._id === this.lifecycleId) {
                            c.push(this.companies[i]);
                        }
                    }
                } else {
                    c = this.companies;
                }

                c.sort(function (a, b) {
                    return (Number(companiesWithQuotes.includes(b._id))) - Number(companiesWithQuotes.includes(a._id))
                });

                
                return c.slice(0, process.env.VUE_APP_MAX_COMPANIES_IN_QUOTES);
            }
        },
        methods: {
            setFirstCompany() {
                var companyId = this.filteredQuotes[0].company._id;
                this.$store.commit('setHighlightedCompany', companyId);
            },

            quoteChange(slideIndex) {
                var companyId = this.filteredQuotes[slideIndex].company._id;
                this.$store.commit('setHighlightedCompany', companyId);
            }
        },
        mounted() {
            if (!this.$store.state.quotesDecor) {
                this.$store.dispatch('getQuotesDecor');
            }

            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });
        }
    }
</script>

<style>
.slick-dots {
    position: absolute;
    bottom: -25px;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: right;
}

.slick-dots li button:before {
    font-family: 'slick';
    font-size: 6px;
    line-height: 15px;
    position: absolute;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    text-align: center;
    background-color: #DADADA;
    color: transparent;
    border-radius: 50%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin-right: 2rem;
    margin-top: 2rem;
}


.dot-green .slick-dots li.slick-active button:before {
    background-color: #52AE30;
    color: transparent;
}

.dot-red .slick-dots li.slick-active button:before {
    background-color: #FF435A;
    color: transparent;
}

.dot-orange .slick-dots li.slick-active button:before {
    background-color: #FF6701;
    color: transparent;
}
</style>