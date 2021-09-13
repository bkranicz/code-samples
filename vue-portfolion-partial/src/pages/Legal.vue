<template>
  <div class="miami">
    <div class="all-area">
      <HeaderSection color="blue"/>
      <Legal />
    </div>
  </div>
</template>

<script>
import HeaderSection from '../components/Header/HeaderOne';
import Legal from '../components/Legal/Legal';


export default {
  name: 'Coworker',
  components: {
    HeaderSection,
    Legal
  },
  mounted() {
      this.$store.dispatch('getLegal');
  }
}
</script>