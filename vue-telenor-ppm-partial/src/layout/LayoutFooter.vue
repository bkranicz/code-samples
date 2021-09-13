<template>
  <nav class="layout-footer footer bg-lighter" :class="getLayoutFooterBg()">
    <div class="container-fluid container-p-x pb-3">
      Made with <span style="color: #e25555;">&#9829;</span> by TnHU ITDD
    </div>
  </nav>
</template>

<script>
export default {
  name: 'app-layout-footer',

  methods: {
    getLayoutFooterBg () {
      return `bg-${this.layoutFooterBg}`
    }
  }
}
</script>
