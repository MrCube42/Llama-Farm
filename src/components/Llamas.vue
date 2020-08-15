<template>
  <v-card class="host">
    <v-list-item v-for="llama in llamas" :key="llama.id">
      <span>{{ llama.name }}</span>
      <v-btn @click="petLlama(llama)">Pet</v-btn>
      <v-btn @click="feedLlama(llama)">Feed</v-btn>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"

import { Llama } from "./Llama"
import { fetchLlamas } from "./LlamasService"

export default Vue.extend({
  data() {
    return {
      llamas: [] as Llama[],
    }
  },
  async created() {
    this.llamas = await fetchLlamas()
  },
  methods: {
    petLlama(llama: Llama) {
      console.log(`Good boy, ${llama.name}. *pet* *pet*`)
    },
    feedLlama(llama: Llama) {
      console.log(`Here is a carrot for you, ${llama.name}.`)
    },
  },
})
</script>

<style lang="scss" scoped>
.host {
  margin: 20px;
}
</style>
