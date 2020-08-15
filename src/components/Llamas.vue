<template>
  <ul>
    <li v-for="llama in llamas" :key="llama.id">{{ llama.name }}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue"

interface Llama {
  id: number
  name: string
}

export default Vue.extend({
  data() {
    return {
      llamas: [
        {
          id: 1,
          name: "D'Artagnan",
        },
        {
          id: 1,
          name: "Athos",
        },
        {
          id: 1,
          name: "Porthos",
        },
        {
          id: 1,
          name: "Aramis",
        },
      ] as Llama[],
    }
  },
})
</script>

<style lang="scss" scoped></style>
