<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection color="blue"/>
      <HeroSection />
      <StatsSection :stats="earlyStage" color="text-orange"/>
      <About :about="earlyStage"/>
      <Quotes :highlight="'bg-orange'" :dotColor="'dot-orange'" :lifecycleId="lifecycleId" :showButton="false"/>
      <Coworkers :lifecycleId="lifecycleId" :showDecor="false" :lifecycleGrouped="true"/>
      <Apply />
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/EarlyStage'
import StatsSection from '../components/Stats/Stats';
import About from '../components/About/About';
import Quotes from '../components/Quotes/List';
import Coworkers from '../components/Coworkers/List';
import Apply from '../components/Contact/Apply';

import { mapState } from 'vuex';

export default {
  name: 'Early Stage',
  components: {
    HeaderSection,
    HeroSection,
    StatsSection,
    About,
    Quotes,
    Coworkers,
    Apply
  },
  data() {
    return {
      lifecycleId: process.env.VUE_APP_EARLY_ID
    }
  },
  computed: { 
    ...mapState(['earlyStage'])
  },
  mounted() {
    this.$store.dispatch('getCompaniesGraph', 0);

    if (!this.$store.state.quotes || this.$store.state.quotes.length === 0) {
      this.$store.dispatch('getQuotesGraph');
    }
  }
}
</script>