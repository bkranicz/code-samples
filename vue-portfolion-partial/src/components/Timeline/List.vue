<template>
    <div>
        <section id="timeline" class="section timeline-area d-flex bg-lightest-blue ptb_50" v-if="company.events && company.events.length > 0">
            <div class="container-fluid my-4">
                <div class="row pb_75" v-for="(e, index) in orderedEvents" :key="e._id">
                    <div class="col-xl-9 p-xl-0" :class="index % 2 === 0 ? '' : 'offset-1'">
                        <div class="timeline-card p-4">
                            <h3 class="timeline-date-large">{{ e.date | getYear }}. <span class="timeline-date-small">{{ e.date | getMonth }}</span></h3>
                            <p class="timeline-event">{{ e.title[lang] }} <span class="timeline-desc"> - {{ e.description[lang] }} <a class="ml-2 text-green" v-if="e.link" target="_blank" :href="e.link.url">{{ e.link[lang] }}</a></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

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
            ...mapState(['lang', 'company']),
            orderedEvents() {
                return this.company.events.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
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