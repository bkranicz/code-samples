<template>
    <div>
        <div v-for="(g, index) in Object.keys(companiesGroups)" :key="g._id">
            <section v-if="companiesGroups[g].companies.length > 0" class="section d-flex companies-list-area ptb_100" :class="bgClasses[index % bgClasses.length]">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col pt_25 px-4 px-sm-0">
                            <h1>{{ companiesGroups[g][lang] }}</h1>
                        </div>
                    </div>
                    <div class="row ptb_50 companies-list">
                        <div class="col-xl-3 col-6 my-auto p-4 text-center pb_25" v-for="c in companiesGroups[g].companies" :key="c._id">
                            <router-link :to="'/companies/' + c._id">
                                <img :src="baseUrl + c.logo.url" alt="">
                            </router-link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            baseUrl: process.env.VUE_APP_STRAPI_URI,
            bgClasses: ['bg-dark-blue',  'bg-classic-blue', 'bg-dark-blue', 'bg-dark-gray']
        };
    },
    computed: { 
        ...mapState(['lang', 'companies', 'lifecycles']),
        companiesGroups() {
            var groups = {};
            
            for (var i = 0; i < this.lifecycles.length; i++) {
                // skip if hidden
                if (this.lifecycles[i]._id === process.env.VUE_APP_HIDDEN_ID) {
                    continue;
                }

                groups[this.lifecycles[i].en] = {
                    en: this.lifecycles[i].en,
                    hun: this.lifecycles[i].hun,
                    companies: []
                }

                var c = [];

                for (var j = 0; j < this.companies.length; j++) {
                    if (this.lifecycles[i].en === this.companies[j].lifecycle.en) {
                        c.push(this.companies[j]);
                    }
                }

                let sorted = c.slice().sort((a, b) => b.displayPriority - a.displayPriority);

                groups[this.lifecycles[i].en].companies = sorted;
            }

            return groups;
        }
    }
}
</script>