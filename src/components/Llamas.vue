<template>
  <div class="host">
    <h1 style="text-align: center">🌞 Welcome to the Llama farm 🦙🥕</h1>
    <v-toolbar dense>
      <v-text-field
        hide-details
        prepend-icon="🔎"
        single-line
        placeholder="Find a llama by name"
        v-model="searchText"
      ></v-text-field>
    </v-toolbar>
    <v-card class="llamas">
      <div v-if="filteredLlamas.length > 0">Choose a llama to walk with...</div>
      <v-list-item v-for="llama in filteredLlamas" :key="llama.id">
        <v-btn @click="walkTheLlama(llama)">
          <span :style="{ color: llama.leashColor, 'font-size': '30px' }"
            >〰</span
          >{{ llama.name }}</v-btn
        >
      </v-list-item>
      <div v-if="filteredLlamas.length < 1" class="no-match">
        🤷‍♀️🤷‍♂️ No llama with this name
      </div>
    </v-card>
    <div class="walking-area">
      <span
        v-if="selectedLlama !== undefined"
        class="llama"
        :style="{
          left: llamaPosition + 'px',
          transform: llamaDirection === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
        }"
        >🚶‍♂️<span :style="{ color: selectedLlama.leashColor }">〰</span>🦙</span
      >
    </div>
    <v-snackbar v-model="snackbar" color="info" :top="true">{{
      snackBarText
    }}</v-snackbar>
  </div>
</template>

<script lang="ts">
import { Llama } from "./Llama"

import { defineComponent } from "@vue/composition-api"
import { useSearchableLlamas } from "@/composables"

export default defineComponent({
  setup() {
    const { searchText, filteredLlamas } = useSearchableLlamas()

    return {
      searchText,
      filteredLlamas,
    }
  },
  data() {
    return {
      llamas: [] as Llama[],
      snackbar: false,
      snackBarText: "",
      selectedLlama: undefined as undefined | Llama,
      llamaPosition: 0,
      llamaDirection: "left" as "left" | "right",
    }
  },
  async mounted() {
    window.addEventListener("keydown", this.handleKeydown)
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown)
  },
  methods: {
    walkTheLlama(llama: Llama) {
      this.snackBarText = `Good boy, ${llama.name}. *pet* *pet* *feeding with carrot*`
      this.snackbar = true
      this.selectedLlama = llama
    },
    handleKeydown(event: KeyboardEvent) {
      const availableWidth = 620
      const stepSize = availableWidth / 100
      if (event.key === "ArrowLeft") {
        if (this.llamaPosition > 0) {
          this.llamaPosition -= stepSize
          this.llamaDirection = "left"
        }
      } else if (event.key === "ArrowRight") {
        if (this.llamaPosition < availableWidth) {
          this.llamaPosition += stepSize
          this.llamaDirection = "right"
        }
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.llamas {
  min-height: 250px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.walking-area {
  align-self: center;
  border-left: 10px dotted darkgreen;
  border-right: 10px dotted darkgreen;
  margin-top: 50px;
  width: 800px;
  height: 25px;
  position: relative;
  background: lightgreen;
}

.llama {
  position: absolute;
  font-size: 50px;
  bottom: 0;
  transform-origin: 50% 0;
  transform: scaleX(-1);
  margin-right: -25px;
  white-space: nowrap;
}

.no-match {
  align-self: center;
}
</style>
