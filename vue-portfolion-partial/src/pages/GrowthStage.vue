<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection />
      <HeroSection />
      <StatsSection :stats="growthStage" color="text-red"/>
      <About :about="growthStage"/>
      <Quotes :highlight="'bg-red'" :dotColor="'dot-red'" :lifecycleId="lifecycleId" :showButton="false"/>
      <Coworkers :lifecycleId="lifecycleId" :showDecor="false" :lifecycleGrouped="true"/>
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne';
import HeroSection from '../components/Hero/GrowthStage';
import StatsSection from '../components/Stats/Stats';
import About from '../components/About/About';
import Quotes from '../components/Quotes/List';
import Coworkers from '../components/Coworkers/List';

import { mapState } from 'vuex';

export default {
  name: 'Early Stage',
  components: {
    HeaderSection,
    HeroSection,
    StatsSection,
    About,
    Quotes,
    Coworkers
  },
  data() {
    return {
      lifecycleId: process.env.VUE_APP_GROWTH_ID
    }
  },
  computed: { 
    ...mapState(['growthStage'])
  },
  mounted() {
    this.$store.dispatch('getCompaniesGraph', 0);

    if (!this.$store.state.quotes || this.$store.state.quotes.length === 0) {
      this.$store.dispatch('getQuotesGraph');
    }
  }
}
</script>