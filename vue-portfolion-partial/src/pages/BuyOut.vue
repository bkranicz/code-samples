<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection/>
      <HeroSection />
      <StatsSection :stats="buyOut" color="text-green"/>
      <About :about="buyOut" color="green" />
      <Quotes :highlight="'bg-green'" :dotColor="'dot-green'" :lifecycleId="lifecycleId" :showButton="false"/>
      <Coworkers :lifecycleId="lifecycleId" :showDecor="false" :lifecycleGrouped="true"/>
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne';
import HeroSection from '../components/Hero/BuyOut';
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
      lifecycleId: process.env.VUE_APP_BUYOUT_ID
    }
  },
  computed: { 
    ...mapState(['buyOut'])
  }
}
</script>