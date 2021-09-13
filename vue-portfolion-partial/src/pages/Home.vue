<template>
  <div class="miami">
    <loading 
      :active.sync="mainLoading" 
      :opacity=".99"
      background-color="#A3CBE6"
      color="#52AE30"
      >
        <div class="semipolar-spinner">
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
          <div class="ring"></div>
        </div>
    </loading>
    <div class="all-area" v-if="hero">
      <HeaderSection />
      <HeroSection />
      <StatsSection />
      <StagesSection />
      <ArticleList :showAll="true" :showDecor="true"/>
      <QuotesList :highlight="'bg-red'" :dotColor="'dot-red'" :showButton="true" :showDecor="true"/>
      <CoworkerList :showDecor="true" :roleGrouped="true"/>
      <FaqSection />
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Home'
import StatsSection from '../components/Stats/Home'
import StagesSection from '../components/Stages/Stages';
import CoworkerList from '../components/Coworkers/List';
import ArticleList from '../components/Articles/List';
import QuotesList from '../components/Quotes/List';
import FaqSection from '../components/Faq/Faq';
    
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

import { mapState } from 'vuex';

export default {
    name: 'ThemeOne',
    components: {
        HeaderSection,
        HeroSection,
        StagesSection,
        CoworkerList,
        ArticleList,
        QuotesList,
        FaqSection,
        StatsSection,
        Loading
    },
    data() {
      return {
          heroLoading: false,
      }
    },
    computed: { 
        ...mapState(['lang', 'hero', 'mainLoading'])
    },
    mounted() {
        setTimeout(() => {
          this.$store.commit('setMainLoading', false);
        },1500)

        if (!this.$store.state.hero) {
            this.$store.dispatch('getHero');
        }

        // Remove article to not filter out from list
        this.$store.commit('setArticle', '');
        // Quotes should be reinit
        this.$store.commit('setQuotes', []);

        // Get data related to home page
        this.$store.dispatch('getArticlesGraph', {
          limit: 25,
          sort: "displayPriority:desc"
        });
        this.$store.dispatch('getCompaniesGraph', 0);
        this.$store.dispatch('getQuotesGraph');
    }
}
</script>

<style>

</style>