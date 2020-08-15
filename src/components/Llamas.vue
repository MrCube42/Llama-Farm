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
    <v-card class="llamas">
      <v-list-item v-for="llama in filteredLlamas" :key="llama.id">
        <v-btn @click="feedLlama(llama)">🥕 {{ llama.name }}</v-btn>
      </v-list-item>
    </v-card>
    <div class="walking-area">
      <span
        class="llama"
        :style="{
          left: llamaPosition + '%',
          transform: llamaDirection === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
        }"
        >🚶‍♂️〰🦙</span
      >
    </div>
    <v-snackbar v-model="snackbar" color="info" :top="true">
      {{ snackBarText }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Llama } from "./Llama"
import { useSearchableLlamas } from "@/composables/searchable-llamas"
import { useWalkableLlama } from "@/composables/walkable-llama"
import { defineComponent } from "@vue/composition-api"

export default defineComponent({
  setup() {
    const { searchText, filteredLlamas } = useSearchableLlamas()
    const { llamaPosition, llamaDirection } = useWalkableLlama()

    return {
      searchText,
      filteredLlamas,
      llamaPosition,
      llamaDirection,
    }
  },
  data() {
    return {
      snackbar: false,
      snackBarText: "",
    }
  },
  methods: {
    feedLlama(llama: Llama) {
      this.snackBarText = `Good boy, ${llama.name}. *pet* *pet* *feeding with carrot*`
      this.snackbar = true
    },
  },
})
</script>

<style lang="scss" scoped>
.host {
  margin: 20px;
  width: 50%;
}

.llamas {
  margin: 20px;
  display: flex;
  flex-direction: column;
}
.walking-area {
  width: 100%;
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
</style>
