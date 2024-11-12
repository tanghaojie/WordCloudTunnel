<script setup lang="ts">
import { ref } from 'vue'
import { WordCloudTunnel } from '../src/main'

const el = ref<InstanceType<typeof WordCloudTunnel>>()

let index = 0
function randomAdd() {
  const x = (index++).toString()
  const item = {
    id: x,
    text: x,
  }
  el.value?.append(item)
}
</script>

<template>
  <div style="width: 600px; height: 400px">
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
