<template>
    <router-link :to="'/articles/' + article._id">
        <div class="card text-white article-mobile-card" :class="color">
            <img v-if="showImage" class="card-img main-img shadow-image" v-bind:src="baseUrl + article.hero.url" alt="Article">
            <div class="article-list-card">
                <div class="card-img-overlay w-100 p-4">
                <div class="mb-1">
                    <span v-if="article.author && lang === 'en'" class="author mr-4">{{ article.author.firstName }} {{ article.author.lastName }}</span>
                    <span v-if="article.author && lang === 'hun'" class="author mr-4">{{ article.author.lastName }} {{ article.author.firstName }}</span>
                    <span class="date">{{ article.pubDate | formatDate }}</span>
                </div>
                <div class="mb-1">
                    <h3> {{ article.title[lang] }} </h3>
                </div>
                <div class="mb-1">
                    <span v-for="c in article.companies" :key="c._id" class="tag mr-2">
                        <router-link :to="'/companies/' + c._id">
                            {{ c.name }}
                        </router-link>
                    </span>
                    <span v-for="l in article.lifecycles" :key="l._id" class="tag mr-2">
                        <router-link :to="{ path: '/articles', query: { lifecycle: l.en }}">
                            {{ l[lang] }}
                        </router-link>
                    </span>
                    <span v-for="a in article.areas" :key="a._id" class="tag mr-2">
                        <router-link :to="{ path: '/articles', query: { area: a.en }}">
                            {{ a[lang] }}
                        </router-link>
                    </span>
                </div>
                <div>
                    <img height="25px" class="float-right" src="/assets/img/arrow_right.svg" alt="Details">             
                </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: ['article', 'color', 'showImage'],
    data() {
        return {
            baseUrl: process.env.VUE_APP_STRAPI_URI
        };
    },
    computed: { 
        ...mapState(['lang']),
    },
}
</script>