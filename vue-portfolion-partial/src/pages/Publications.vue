<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection color="blue"/>
      <Publications />
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne';
import Publications from '../components/Timeline/Publications';


export default {
  name: 'Coworker',
  components: {
    HeaderSection,
    Publications
  },
  mounted() {
      this.$store.dispatch('getPublications');
  }
}
</script>