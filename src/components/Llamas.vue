<template>
  <div class="host">
    <v-toolbar dense floating>
      <v-text-field
        hide-details
        prepend-icon="🔎"
        single-line
        @input="updateSearchText"
        v-model="searchText"
      ></v-text-field>
    </v-toolbar>
    <v-card class="host">
      <v-list-item v-for="llama in filteredLlamas" :key="llama.id">
        <v-btn @click="walkTheLlama(llama)">Walk this Llama</v-btn>
        <span>{{ llama.name }}</span>
      </v-list-item>
    </v-card>
    <div class="walking-area">
      <span
        class="llama"
        :style="{
          left: llamaPosition + '%',
          transform: llamaDirection === 'right' ? 'scaleX(-1)' : 'scaleX(1)',
        }"
        >🦙</span
      >
    </div>
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
      selectedLlama: undefined as undefined | Llama,
    }
  },
  methods: {
    walkTheLlama(llama: Llama) {
      console.log(`Good boy, ${llama.name}. *pet* *pet*`)
      this.selectedLlama = llama
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
}
</style>
