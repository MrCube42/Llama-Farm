<template>
  <ul>
    <li v-for="llama in llamas" :key="llama.id">
      <span>{{ llama.name }}</span>
      <button @click="petLlama(llama)">Pet</button>
      <button @click="feedLlama(llama)">Feed</button>
    </li>
  </ul>
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
.li {
  display: flex;
  flex-direction: row;
}
</style>
