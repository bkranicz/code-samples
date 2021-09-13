<template>
  <div id="app">
    <app-layout></app-layout>
  </div>
</template>

<style src="@/vendor/styles/bootstrap.scss" lang="scss"></style>
<style src="@/vendor/styles/appwork.scss" lang="scss"></style>
<style src="@/vendor/styles/theme-corporate.scss" lang="scss"></style>
<style src="@/vendor/styles/colors.scss" lang="scss"></style>
<style src="@/vendor/styles/uikit.scss" lang="scss"></style>
<style src="./style.scss" lang="scss"></style>

<script>
import Layout2 from '@/layout/Layout2'

export default {
  name: 'app',
  components: {
    'app-layout': Layout2
  },
  metaInfo: {
    title: 'Index',
    titleTemplate: '%s - Vue Starter'
  },
  updated () {
    // Remove loading state
    setTimeout(() => document.body.classList.remove('app-loading'), 1)
  }
}
</script>
