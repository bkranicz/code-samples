<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection/>
      <HeroSection />
      <List :hideSelected="false"/>
      <Apply v-if="jobDecor.showGeneral && ( jobDecor.showGeneral === 'yes' || jobDecor.showGeneral === lang )"/>
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Jobs'
import List from '../components/Jobs/List';
import Apply from '../components/Contact/Job';

import { mapState } from 'vuex';

export default {
  name: 'Coworker',
  components: {
    HeaderSection,
    HeroSection,
    List,
    Apply
  },
  computed: { 
      ...mapState(['lang','jobDecor'])
  },
  data() {
      return {
          id: this.$route.params.id
      };
  },
  mounted() {
      if (!this.$store.state.jobDecor) {
        this.$store.dispatch('getJobsDecor');
      }
  }
}
</script>