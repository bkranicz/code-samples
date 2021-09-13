<template>
    <router-link :to="'/coworkers/' + coworker._id">
        <div class="box" v-bind:style="{ backgroundImage: 'url(' + baseUrl + coworker.image.url + ')' }">
            <div>
                <div class="bottom-left px-4 py-3" :class="color">
                    <div class="box-content">
                        <div>
                            <h3 v-if="lang==='en'">{{coworker.firstName}} {{coworker.lastName}}</h3>
                            <h3 v-if="lang==='hun'"><span v-if="c.rank">{{ coworker.rank }}</span> {{coworker.lastName}} {{coworker.firstName}}</h3>
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
            </div>
        </div>
    </router-link>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: ['coworker', 'color'],
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