<script setup lang="ts">
import { CSSProperties, onMounted, onUnmounted, ref } from 'vue'
import { WordCloudTunnel } from '../src/main'

const el = ref<InstanceType<typeof WordCloudTunnel>>()
const el2 = ref<InstanceType<typeof WordCloudTunnel>>()
const el3 = ref<InstanceType<typeof WordCloudTunnel>>()
const el4 = ref<InstanceType<typeof WordCloudTunnel>>()

const words = [
  'lay',
  'bait',
  'introduction',
  'as',
  'digress',
  'court',
  'extract',
  'calf',
  'bowel',
  'bee',
  'incongruous',
  'side',
  'tactic',
  'memorandum',
  'piece',
  'insert',
  'engagement',
  'sermon',
  'responsibility',
  'compact',
  'grandmother',
  'guide',
  'facility',
  'personal',
  'recording',
  'remedy',
  'dip',
  'structure',
  'inflation',
  'cupboard',
  'dialect',
  'deadly',
  'pot',
  'confine',
  'suffer',
  'fine',
  'holiday',
  'dorm',
  'strategic',
  'hiccup',
  'parallel',
  'finished',
  'firm',
  'tasty',
  'circulation',
  'profession',
  'particle',
  'trap',
  'superintendent',
  'tendency',
]

let index = 0
function handAdd() {
  const item = {
    id: (index++).toString(),
    text: words[Math.floor(Math.random() * words.length)],
  }
  el.value?.append(item)
}

let index2 = 0
let timer: number
onMounted(() => {
  timer = window.setInterval(() => {
    el2.value?.append({
      id: (index2++).toString(),
      text: words[Math.floor(Math.random() * words.length)],
    })
    el3.value?.append({
      id: (index2++).toString(),
      text: words[Math.floor(Math.random() * words.length)],
      customPayload: {
        desc: 'Item is customed',
      },
    })
    el4.value?.append({
      id: (index2++).toString(),
      text: words[Math.floor(Math.random() * words.length)],
    })
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

function customItemStyle(item: any) {
  console.log(item)

  return {
    color: '#fff',
    scale: item.level > 1 ? 0.3 : 1,
    'font-size': '28px',
    transition: 'all 3s ease',
    backgroundColor: item.level > 1 ? 'green' : 'gray',
    padding: '4px 16px',
    borderRadius: '8px',
  } as CSSProperties
}
</script>

<template>
  <div style="width: 100%; height: 400px; display: flex; flex-direction: row">
    <div style="flex: 1 1 auto; border: solid #ddd 1px">
      <div style="color: black">6 Direction. Random Angle</div>
      <WordCloudTunnel
        ref="el2"
        :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
        :axisCount="6"
        :randomAngleRangePerAxis="60"
        :randomAxis="false"
        :scaleStep="0.15"
        :animation-duration="1000"
      ></WordCloudTunnel>
    </div>

    <div style="flex: 1 1 auto; border: solid #ddd 1px; display: flex; flex-direction: column">
      <div style="color: black">6 Direction. No Random Angle</div>
      <div style="flex: 1 1 auto">
        <WordCloudTunnel
          ref="el4"
          :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
          :axisCount="6"
          :randomAngleRangePerAxis="0"
          :randomAxis="false"
          :scaleStep="0.2"
          :animation-duration="1000"
        ></WordCloudTunnel>
      </div>
      <div @click="handAdd" style="flex: 0; color: black; cursor: pointer">Add Item</div>
    </div>

    <div style="flex: 1 1 auto; border: solid #ddd 1px; display: flex; flex-direction: column">
      <div style="color: black">
        4 Direction. No Random Angle,. 3 Level with eath level 4 items. add item by hand.
      </div>
      <div style="flex: 1 1 auto">
        <WordCloudTunnel
          ref="el"
          :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
          :deeps="[4, 4, 4]"
          :axisCount="4"
          :randomAngleRangePerAxis="0"
          :randomAxis="false"
          :scaleStep="0.2"
          :animation-duration="1000"
        ></WordCloudTunnel>
      </div>
      <div @click="handAdd" style="flex: 0; color: black; cursor: pointer">Add Item</div>
    </div>
  </div>

  <div style="width: 800px; height: 600px; border: solid #ddd 1px">
    <div style="color: black">Custom Item Slot</div>
    <WordCloudTunnel
      ref="el3"
      :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
      :axisCount="6"
      :randomAngleRangePerAxis="60"
      :randomAxis="false"
      :scaleStep="0"
      :opacityStep="0"
      :animation-duration="1000"
    >
      <template #default="item">
        <div :style="customItemStyle(item)">
          {{ item.text }}
        </div>
      </template>
    </WordCloudTunnel>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: white;
  width: 100vw;
  height: 100vh;
}
</style>
