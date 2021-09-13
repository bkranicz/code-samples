<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection />
      <HeroSection />
      <Articles v-if="lifecycles.length > 0 && areas.length > 0"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Articles'
import Articles from '../components/Articles/All';

export default {
  name: 'Article',
  components: {
    HeaderSection,
    HeroSection,
    Articles
  },
  computed: { 
      ...mapState(['lifecycles', 'areas']),
  },
  mounted() {
    if (!this.$store.state.lifecycles || this.$store.state.lifecycles.length === 0 ) {
      this.$store.dispatch('getLifecycles');
    }

    if (!this.$store.state.areas || this.$store.state.areas.length === 0 ) {
      this.$store.dispatch('getAreas');
    }
  }
}
</script>