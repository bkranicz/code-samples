<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection />
      <HeroSection />
      <Companies />
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne';
import HeroSection from '../components/Hero/Companies';
import Companies from '../components/Companies/List';

export default {
  name: 'Article',
  components: {
    HeaderSection,
    HeroSection,
    Companies
  },
  mounted() {
    this.$store.dispatch('getCompaniesGraph', 0);
    
    if (!this.$store.state.lifecycles || this.$store.state.lifecycles.length === 0 ) {
      this.$store.dispatch('getLifecycles');
    }
  }
}
</script>