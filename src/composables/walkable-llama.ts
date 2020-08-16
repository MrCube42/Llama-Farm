import { onMounted, onUnmounted, ref } from "@vue/composition-api"

export function useWalkableLlama(props: {
  availableWidth: number
  initialPosition?: number
}) {
  const { availableWidth } = props
  const initialPosition = props.initialPosition ?? availableWidth / 2
  const stepSize = availableWidth / 100
  const llamaPosition = ref(initialPosition)
  const llamaDirection = ref("left")

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      if (llamaPosition.value > 0) {
        llamaPosition.value -= stepSize
        llamaDirection.value = "left"
      }
    } else if (event.key === "ArrowRight") {
      if (llamaPosition.value < availableWidth) {
        llamaPosition.value += stepSize
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
