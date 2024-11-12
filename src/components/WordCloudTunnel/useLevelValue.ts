import { computed, Ref } from 'vue'
import { MAX_LEVEL } from './contants'

export function useLevelValue(
  deeps: Ref<number[]>,
  axisCount: Ref<number>,
  randomAnglePerAxis: Ref<number | undefined>
) {
  const levels = computed(function () {
    return [1, ...deeps.value.slice(0, MAX_LEVEL)]
  })

  const levelsPreSum = computed(function () {
    const l = levels.value
    const len = l.length
    const preSum: number[] = new Array(len).fill(0)
    for (let i = 0; i < len; i++) {
      let sum = 0
      for (let j = 0; j < i + 1; j++) {
        sum += l[j]
      }
      preSum[i] = sum
    }

    // const val = {
    //   0: 1,   // level0: 1
    //   1: 2,   // level1: 1+2
    //   2: 4,   // level2: 1+2+4
    //   3: 10,  // level3: 1+2+4+10
    // }
    // return [1, 3, 7, 17]
    return preSum
  })

  const itemMaxCount = computed(() => {
    // max show item count
    return levelsPreSum.value[levelsPreSum.value.length - 1] ?? 0
  })

  const axisPerRadius = computed(() => (Math.PI * 2) / axisCount.value)

  const randomAngleRangePerAxis = computed(() => randomAnglePerAxis.value ?? 360 / axisCount.value)
  const randomRadiusPerAxis = computed(() => (randomAngleRangePerAxis.value / 360) * Math.PI * 2)

  return { levelsPreSum, itemMaxCount, axisPerRadius, randomRadiusPerAxis }
}
