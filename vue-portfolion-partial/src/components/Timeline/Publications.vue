<template>
    <div>
        <section id="disclosures" class="section faq-area timeline-area publications-area d-flex bg-lightest-blue" v-if="publications && publications.length > 0">
            <div class="container-fluid my-4">
                <div class="row">
                    <div class="col">
                        <h1 v-if="lang === 'hun'" class="pb_50">Közzétételek</h1>
                        <h1 v-if="lang === 'en'" class="pb_50">Disclosures</h1>
                    </div>
                </div>
                <div class="row pb_50">
                    <div class="col-12 py-4">
                        <div class="panel-group wrap" id="accordion" role="tablist" aria-multiselectable="true">
                            <div class="panel" v-for="(g, i) in grouped" :key="i">
                                <div class="panel-heading" role="tab" v-bind:id="i">
                                    <h4 class="panel-title">
                                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" v-bind:href="'#collapse_' + i" aria-expanded="false" v-bind:aria-controls="'collapse_'+ i">
                                            {{ g.date }}
                                        </a>
                                    </h4>
                                </div>
                                <div v-bind:id="'collapse_' + i" class="panel-collapse collapse" role="tabpanel" v-bind:aria-labelledby="i">
                                    <div class="panel-body">
                                        <div class="mb-3" v-for="e in g.publications" :key="e._id">
                                           <a target="_blank" :href="baseUrl + e.file.url">
                                               {{ e.title[lang] }} - <span v-if="lang === 'hun'" class="text-green">Letöltés</span> <span v-if="lang === 'en'" class="text-green">Download</span>
                                            </a> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<style lang="css" scoped>
    #disclosures .panel-title a {
        font-size: 36px;
        font-weight: 600;
    }

    #disclosures .panel-body a {
        font-size: 24px;
        font-weight: 600;
        color: #1b1a1e !important;
    }

    #disclosures .panel-body a:hover {
        color: #74BE59 !important;
    }

    #accordion .panel-heading .collapsed:before { 
        font-size: 32px;
        top: 18px;
        right: 10px;
    }

    #accordion .panel-heading a:before {
        font-size: 32px;
        top: 18px;
        right: 10px;
    }
</style>

<script>
    import { mapState } from 'vuex';
    import moment from 'moment';

    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI
            };
        },
        computed: { 
            ...mapState(['lang', 'publications']),
            grouped() {
                var grouped = this.publications.reduce((acc, val) => {
                    const date = val.date.substr(0,4)

                    const item = acc.find((item) => item.date.substr(0,4) === date );

                    if (!item) acc.push({ date: val.date.substr(0,4), publications: [val] });

                    else item.publications.push(val);

                    return acc;

                }, []);

                return grouped.sort((a, b) => b.date.localeCompare(a.date));
            },
            orderedEvents() {
                return this.publications.slice().sort((a, b) => new Date(a.date) + new Date(b.date))
            }
        },
        filters: {
            getYear: function(date) {
                return moment(date).format('YYYY');
            },
            getMonth: function(date) {
                return moment(date).format('MMM');
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });
        }
    }
</script>