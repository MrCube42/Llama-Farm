<template>
  <div class="host">
    <v-toolbar dense floating>
      <v-text-field
        hide-details
        prepend-icon="🔎"
        single-line
        v-model="searchText"
      ></v-text-field>
    </v-toolbar>
    <v-card class="host">
      <v-list-item v-for="llama in filteredLlamas" :key="llama.id">
        <span>{{ llama.name }}</span>
        <v-btn @click="petLlama(llama)">Pet</v-btn>
        <v-btn @click="feedLlama(llama)">Feed</v-btn>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

import { Llama } from "./Llama"
import { fetchLlamas } from "./LlamasService"

export default Vue.extend({
  data() {
    return {
      llamas: [] as Llama[],
      filteredLlamas: [] as Llama[],
      searchText: "",
    }
  },
  async created() {
    this.llamas = await fetchLlamas()
    this.filteredLlamas = this.llamas
  },
  methods: {
    filterLlamas(nameToSearchFor: string) {
      this.filteredLlamas = this.llamas.filter(llama =>
        llama.name.toLowerCase().includes(nameToSearchFor.toLowerCase()),
      )
    },
    clearFilter() {
      this.filteredLlamas = this.llamas
    },
    petLlama(llama: Llama) {
      console.log(`Good boy, ${llama.name}. *pet* *pet*`)
    },
    feedLlama(llama: Llama) {
      console.log(`Here is a carrot for you, ${llama.name}.`)
    },
  },
  watch: {
    searchText: function(userInput: string) {
      if (userInput !== "") {
        this.filterLlamas(userInput)
      } else {
        this.clearFilter()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.host {
  margin: 20px;
}
</style>
