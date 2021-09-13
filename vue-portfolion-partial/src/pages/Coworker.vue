<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection color="blue"/>
      <HeroSection />
      <Quotes :useBaseTitle="true" :dotColor="'dot-green'" />
      <Articles :useBaseTitle="true"/>
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Coworker'
import Articles from '../components/Articles/List'
import Quotes from '../components/Quotes/List'

export default {
  name: 'Coworker',
  components: {
    HeaderSection,
    HeroSection,
    Articles,
    Quotes
  },
  data() {
      return {
          id: this.$route.params.id
      };
  },
  mounted() {
      this.$store.dispatch('getCoworker', this.id);
  }
}
</script>