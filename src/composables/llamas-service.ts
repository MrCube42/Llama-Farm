import { Llama } from "@/components/Llama"
import { fetchLlamas } from "@/components/LlamasService"
import { onMounted, Ref, ref } from "@vue/composition-api"

export function useLlamasService() {
  const llamas: Ref<Llama[]> = ref([])

  onMounted(async () => {
    llamas.value = await fetchLlamas()
  })

  return {
    llamas,
  }
}
