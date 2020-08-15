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
import { Llama } from "./Llama"
import { fetchLlamas } from "./LlamasService"
import {
  ref,
  defineComponent,
  onMounted,
  Ref,
  computed,
} from "@vue/composition-api"

export default defineComponent({
  setup() {
    const llamas: Ref<Llama[]> = ref([])
    const searchText = ref("")

    onMounted(async () => {
      llamas.value = await fetchLlamas()
    })

    const filteredLlamas = computed(() => {
      if (searchText.value !== "") {
        return llamas.value.filter(llama =>
          llama.name.toLowerCase().includes(searchText.value.toLowerCase()),
        )
      } else {
        return llamas.value
      }
    })

    return {
      searchText,
      filteredLlamas,
    }
  },
  data() {
    return {
      selectedLlama: undefined as undefined | Llama,
      llamaPosition: 50,
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown)
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
