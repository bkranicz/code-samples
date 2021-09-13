<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection color="blue"/>
      <HeroSection />
      <Articles :showAll="false" :useBaseTitle="true" />
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne'
import HeroSection from '../components/Hero/Article'
import Articles from '../components/Articles/List'

export default {
  name: 'Article',
  components: {
    HeaderSection,
    HeroSection,
    Articles
  },
  data() {
      return {
          id: this.$route.params.id
      };
  },
  mounted() {
      this.$store.dispatch('getArticle', this.id);
  }
}
</script>