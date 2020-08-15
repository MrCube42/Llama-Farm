<template>
  <v-app>
    <v-main>
      <Llamas />
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

  data: () => ({
    //
  }),
})
</script>
