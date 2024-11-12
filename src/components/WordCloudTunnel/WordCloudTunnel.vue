<script setup lang="ts">
import { toRefs } from 'vue'
import { useWordCloudTunnel } from './useWordCloudTunnel'

defineOptions({
  name: 'WordCloudTunnel',
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    color?: string | string[]
    fontSize?: string
    deeps?: number[]
    axisCount?: number
    randomAngleRangePerAxis?: number
    randomAxis?: boolean
    scaleStep?: number
    opacityStep?: number
    animationDuration?: number
  }>(),
  {
    color: '#000',
    fontSize: '32px',
    // first level always 1
    deeps: () => [6, 6, 12],
    axisCount: 6,
    randomAxis: true,
    scaleStep: 0.1,
    opacityStep: 0.2,
    animationDuration: 1000,
  }
)

const {
  color,
  fontSize,
  deeps,
  axisCount,
  randomAngleRangePerAxis,
  randomAxis,
  scaleStep,
  opacityStep,
} = toRefs(props)

const { containerEl, datas, append, itemStyle } = useWordCloudTunnel(
  color,
  deeps,
  axisCount,
  randomAngleRangePerAxis,
  randomAxis,
  scaleStep,
  opacityStep
)

defineExpose({
  append,
})
</script>

<template>
  <div
    ref="containerEl"
    class="wordcloudtunnel"
    :style="{
      '--wct-default-size': fontSize,
      '--wct-animation-duration': `${animationDuration}ms`,
    }"
  >
    <div
      :key="item.id"
      v-for="(item, index) in datas"
      class="word-item"
      :style="itemStyle(item, index)"
    >
      <div class="word">
        <slot v-if="$slots.default" v-bind="item"></slot>
        <div v-else class="default">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wordcloudtunnel {
  position: relative;
  width: 100%;
  height: 100%;

  .word-item {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all var(--wct-animation-duration);
    width: 0;
    height: 0;

    .word {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;

      .default {
        padding: 8px 32px;
        font-size: var(--wct-default-size);
      }
    }
  }
}
</style>
<style lang="scss">
.wordcloudtunnel {
  @keyframes fadeIn {
    0% {
      opacity: 0;
      scale: 1.5;
    }
    100% {
      opacity: 1;
      scale: 1;
    }
  }
}
</style>
