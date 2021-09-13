<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection color="blue"/>
      <HeroSection />
      <Jobs :hideSelected="true"/>
      <Apply v-if="jobDecor.showGeneral && ( jobDecor.showGeneral === 'yes' || jobDecor.showGeneral === lang )"/>
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Job'
import Jobs from '../components/Jobs/List'
import Apply from '../components/Contact/Job';

import { mapState } from 'vuex';

export default {
  name: 'Coworker',
  components: {
    HeaderSection,
    HeroSection,
    Jobs,
    Apply
  },
  data() {
      return {
          id: this.$route.params.id
      };
  },
  computed: { 
      ...mapState(['lang','jobDecor'])
  },
  mounted() {
      if (!this.$store.state.jobDecor) {
        this.$store.dispatch('getJobsDecor');
      }

      this.$store.dispatch('getJob', this.id);
  }
}
</script>