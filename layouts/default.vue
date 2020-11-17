<template>
  <v-app id="app">
    <nuxt/>
  </v-app>
</template>

<script>
export default {
  mounted(){
    //polifix for persisent scrollbar
   let eHtml = document.getElementsByTagName('html')[0]
   eHtml.style.overflowY = 'hidden'
  }
}
</script>
<style lang="scss" scoped>
html{
  overflow-y: auto;
}
</style>
