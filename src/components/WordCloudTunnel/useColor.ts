import { computed, CSSProperties, nextTick, onMounted, reactive, Ref, ref } from 'vue'

export function useColor(color: Ref<string | string[]>) {
  function randomColor() {
    const c = color.value
    if (Array.isArray(c)) {
      const index = Math.floor(Math.random() * c.length)
      return c[index]
    }
    return c
  }

  return {
    randomColor,
  }
}
