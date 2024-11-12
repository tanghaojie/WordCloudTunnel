<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { WordCloudTunnel } from '../src/main'

const el = ref<InstanceType<typeof WordCloudTunnel>>()
const el2 = ref<InstanceType<typeof WordCloudTunnel>>()

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
function randomAdd() {
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
    const item = {
      id: (index2++).toString(),
      text: words[Math.floor(Math.random() * words.length)],
    }
    el2.value?.append(item)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div style="width: 600px; height: 400px; border: solid #ddd 1px">
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

  <div style="width: 600px; height: 400px; border: solid #ddd 1px">
    <WordCloudTunnel
      ref="el"
      :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
      :axisCount="6"
      :randomAngleRangePerAxis="60"
      :randomAxis="false"
      :scaleStep="0.15"
      :animation-duration="1000"
    ></WordCloudTunnel>
  </div>
  <div @click="randomAdd" style="color: black; cursor: pointer">Random add</div>
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
