<template>
    <div class="row mb-0">
        <div class="col-6 p-0" :class="leftOriented ? '' : 'order-2'">
            <div class="mobile-box" v-bind:style="{ backgroundImage: 'url(' + baseUrl + coworker.image.url + ')' }"></div>
        </div>
        <div class="col-6 p-0" :class="color">
            <router-link :to="'/coworkers/' + coworker._id">
                <div class="mobile-box">
                    <div class="bottom-left p-3">
                        <div>
                            <h3 v-if="lang==='en'">{{coworker.firstName}} {{coworker.lastName}}</h3>
                            <h3 v-if="lang==='hun'"><span v-if="coworker.rank">{{ coworker.rank }}</span> {{coworker.lastName}} {{coworker.firstName}}</h3>
                        </div>
                        <div class="mb-2">
                            <span class="job-title mr-2">{{ coworker.title[lang] }}</span>
                        </div>
                        <div>
                            <span v-for="l in coworker.lifecycles" :key="l._id" class="tag mr-2">
                                <router-link :to="{ path: 'articles', query: { lifecycle: l.en }}">
                                    {{ l[lang] }}
                                </router-link>
                            </span>
                            <span class="tag"><wbr></span>
                        </div>
                        <div>
                            <img height="25px" class="float-right" src="assets/img/arrow_right.svg" alt="Details">
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: ['coworker', 'color', 'leftOriented'],
    data() {
        return {
            baseUrl: process.env.VUE_APP_STRAPI_URI
        };
    },
    computed: { 
        ...mapState(['lang']),
    }
}
</script>