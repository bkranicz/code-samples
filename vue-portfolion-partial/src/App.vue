<template>
  <div id="app">
    <vue-page-transition name="fade-in-up">
      <router-view :key="$route.fullPath"></router-view>
    </vue-page-transition>
    <div class="miami">
      <div class="all-area">
        <FooterSection />
      </div>
    </div>
  </div>
</template>

<script>
  import FooterSection from './components/Footer/Footer'

  export default {
    name: 'App',
    components: {
    FooterSection
    }
  }
</script>

<style>

</style>