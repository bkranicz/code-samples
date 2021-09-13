<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection />
      <HeroSection />
      <Coworkers />
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Coworkers'
import Coworkers from '../components/Coworkers/All'

export default {
  name: 'Article',
  components: {
    HeaderSection,
    HeroSection,
    Coworkers
  },
  mounted() {
      //this.$store.dispatch('getArticle', this.id);
  }
}
</script>