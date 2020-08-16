<template>
  <v-app class="app">
    <v-main>
      <Llamas class="llamas" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import Llamas from "./components/Llamas.vue"

export default Vue.extend({
  name: "App",

  components: {
    Llamas,
  },
})
</script>

<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;
  background: lightblue;
  padding: 20px;
  overflow: hidden;

  display: flex;
  align-items: center;
}

.llamas {
  width: 50%;
}
</style>
