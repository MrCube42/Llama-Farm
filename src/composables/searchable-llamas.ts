import { Llama } from "@/components/Llama"
import { computed, ref, Ref } from "@vue/composition-api"

export function useSearchableLlamas(props: { llamas: Ref<Llama[]> }) {
  const { llamas } = props
  const searchText = ref("")

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
}
