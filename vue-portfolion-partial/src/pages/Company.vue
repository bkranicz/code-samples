<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection color="blue"/>
      <HeroSection />
      <Timeline />
      <Articles :showAll="false" :useBaseTitle="true"/>
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Company'
import Timeline from '../components/Timeline/List';
import Articles from '../components/Articles/List'

export default {
  name: 'Coworker',
  components: {
    HeaderSection,
    HeroSection,
    Timeline,
    Articles
  },
  data() {
      return {
          id: this.$route.params.id
      };
  },
  mounted() {
      this.$store.dispatch('getCompanyGraph', this.id);
  }
}
</script>