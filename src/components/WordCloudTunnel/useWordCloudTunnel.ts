import { CSSProperties, reactive, Ref, shallowReactive } from 'vue'
import { DataType } from './types'
import { HALFPI } from './contants'
import { useColor } from './useColor'
import { useContainer } from './useContainer'
import { useLevelValue } from './useLevelValue'

/**
 * 计算沿当前角度，从矩形中心到边界的距离
 * @param angle
 * @param rectangle
 */
function distanceFromCenterToBorderOfRectangle(
  angle: number,
  rectangle: {
    halfW: number
    halfH: number
    splitAngle: number
  }
) {
  let absAngle = Math.abs(angle)

  if (absAngle > Math.PI) {
    absAngle = absAngle % Math.PI
  }

  const { halfW, halfH, splitAngle } = rectangle

  let directionLength = halfW
  if (absAngle === 0) {
    // 水平
    directionLength = halfW
  } else if (absAngle < splitAngle) {
    // 水平到矩形对角线
    directionLength = halfW / Math.cos(absAngle)
  } else if (absAngle < HALFPI) {
    // 矩形对角线到90°
    directionLength = halfH / Math.cos(HALFPI - absAngle)
  } else if (absAngle < Math.PI - splitAngle) {
    // 90°到另外一个对角线的位置（180°+对角线）
    directionLength = halfH / Math.cos(absAngle - HALFPI)
  } else if (absAngle < Math.PI) {
    // 另外一个对角线的位置到180°
    directionLength = halfW / Math.cos(Math.PI - absAngle)
  } else {
    // 180°
    directionLength = halfW
  }

  return directionLength
}

export function useWordCloudTunnel(
  color: Ref<string | string[]>,
  deeps: Ref<number[]>,
  axisCount: Ref<number>,
  randomAnglePerAxis: Ref<number | undefined>,
  randomAxis: Ref<boolean>,
  scaleStep: Ref<number>,
  opacityStep: Ref<number>
) {
  const datas = reactive([] as DataType[])

  const { randomColor } = useColor(color)
  const { containerEl, containerHalfW, containerHalfH, containerSplitAngle } = useContainer()
  const { levelsPreSum, itemMaxCount, axisPerRadius, randomRadiusPerAxis } = useLevelValue(
    deeps,
    axisCount,
    randomAnglePerAxis
  )

  let start = 0
  function selectAAxis() {
    if (randomAxis.value) {
      return Math.floor(Math.random() * axisCount.value)
    }
    return start++ % axisCount.value
  }

  function append(data: { id: string; text: string } & Record<string, any>) {
    // 当前轴左右随机一个值
    const axisRandomRadius =
      Math.random() * randomRadiusPerAxis.value * 2 - randomRadiusPerAxis.value

    const axis = selectAAxis()
    const angle = axisPerRadius.value * axis + axisRandomRadius

    const directionLength = distanceFromCenterToBorderOfRectangle(angle, {
      halfW: containerHalfW.value,
      halfH: containerHalfH.value,
      splitAngle: containerSplitAngle.value,
    })

    const item: DataType = Object.assign(data, {
      level: -1,
      color: randomColor(),
      _w: shallowReactive({
        xWeight: Math.cos(angle),
        yWeight: Math.sin(angle),
        directionLength: directionLength,
      }),
    })
    datas.push(item)
    while (datas.length > itemMaxCount.value) {
      datas.shift()
    }
  }

  function itemStyle(item: DataType, index: number) {
    const levelIndex = datas.length - index - 1

    let stepDistance = 0

    /**
     * 这里使用 y = Math.sqrt(a * x) 函数，实现每一步递减步长操作。
     * 因为越靠近中间，字越拥挤。所以刚开始步子大一些，后面步子越来越小。
     * 其中 a = itemMaxCount.value，以保证最后一步刚好走出去
     */
    const currStep = Math.sqrt(itemMaxCount.value * levelIndex)
    const nextStep = Math.sqrt(itemMaxCount.value * (levelIndex + 1))

    const stepWeight = (nextStep - currStep) * Math.random() + currStep
    stepDistance = (stepWeight / itemMaxCount.value) * item._w.directionLength

    let scale = 1
    let opacity = 1

    const len = levelsPreSum.value.length
    for (let j = 0; j < len; j++) {
      const preSum = levelsPreSum.value[j]
      if (levelIndex < preSum) {
        item.level = levelIndex
        scale = 1 - scaleStep.value * j
        opacity = 1 - opacityStep.value * j
        break
      }
    }

    const style: CSSProperties = {}
    if (levelIndex === 0) {
      style.transform = `translate(-50%, -50%)`
      style.animation = `fadeIn ease 1s`
    } else {
      const deltaX = stepDistance * item._w.xWeight
      const deltaY = stepDistance * item._w.yWeight
      style.transform = `translate(calc(-50% - ${deltaX}px), calc(-50% - ${deltaY}px)) scale(${scale})`
    }

    style.color = item.color
    style.opacity = opacity

    return style
  }

  return {
    containerEl,
    datas,
    append,
    itemStyle,
  }
}
