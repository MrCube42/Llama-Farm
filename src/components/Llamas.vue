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
        <v-btn @click="walkTheLlama(llama)">Feed</v-btn>
      </v-list-item>
    </v-card>
    <div class="walking-area">
      <span class="llama" :style="{ left: llamaPosition + '%' }">🦙</span>
    </div>
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
      selectedLlama: undefined as undefined | Llama,
      llamaPosition: 50,
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown)
  },
  async created() {
    this.llamas = await fetchLlamas()
    this.filteredLlamas = this.llamas
  },
  methods: {
    handleKeydown(key: KeyboardEvent) {
      if (key.key === "ArrowLeft") {
        if (this.llamaPosition > 0) {
          this.llamaPosition--
        }
      } else if (key.key === "ArrowRight") {
        if (this.llamaPosition < 100) {
          this.llamaPosition++
        }
      }
    },
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
    walkTheLlama(llama: Llama) {
      this.selectedLlama = llama
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
.walking-area {
  width: 100%;
  position: relative;
}
.llama {
  position: absolute;
  font-size: 50px;
}
</style>
