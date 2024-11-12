import { computed, nextTick, onMounted, reactive, ref } from 'vue'

export function useContainer() {
  const containerEl = ref<HTMLElement>()

  const containerSize = reactive({
    w: 0,
    h: 0,
  })
  const containerHalfW = computed(() => containerSize.w / 2)
  const containerHalfH = computed(() => containerSize.h / 2)

  // 矩形对角线角度
  const containerSplitAngle = computed(() => Math.atan(containerSize.h / containerSize.w))

  onMounted(function () {
    nextTick(() => {
      containerSize.w = containerEl.value?.clientWidth || 0
      containerSize.h = containerEl.value?.clientHeight || 0
    })
    containerSize.w = containerEl.value?.clientWidth || 0
    containerSize.h = containerEl.value?.clientHeight || 0
  })

  return {
    containerEl,
    containerSize,
    containerHalfW,
    containerHalfH,
    containerSplitAngle,
  }
}
