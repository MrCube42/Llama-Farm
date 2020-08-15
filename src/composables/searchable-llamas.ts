import { Llama } from "@/components/Llama"
import { fetchLlamas } from "@/components/LlamasService"
import { computed, onMounted, Ref, ref } from "@vue/composition-api"

export function useSearchableLlamas() {
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
}
