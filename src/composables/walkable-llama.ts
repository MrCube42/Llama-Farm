import { onMounted, onUnmounted, ref } from "@vue/composition-api"

export function useWalkableLlama() {
  const llamaPosition = ref(50)
  const llamaDirection = ref("left")

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      if (llamaPosition.value > 0) {
        llamaPosition.value--
        llamaDirection.value = "left"
      }
    } else if (event.key === "ArrowRight") {
      if (llamaPosition.value < 100) {
        llamaPosition.value++
        llamaDirection.value = "right"
      }
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown)
  })

  return { llamaPosition, llamaDirection }
}
