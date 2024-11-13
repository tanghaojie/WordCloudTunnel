# WorldCloudTunnel

Word cloud in tunnel.

## Install

```sh
npm i @jtis/wordcloudtunnel
pnpm i @jtis/wordcloudtunnel
```

## Usage

```html
const el = ref<InstanceType<typeof WordCloudTunnel>>()

let id = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    el.value?.append({
      id: (id++).toString(),
      text: 'text',
    })
  }, 1000)
})

<WordCloudTunnel
  ref="el"
  :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
  :axisCount="6"
  :randomAngleRangePerAxis="60"
  :randomAxis="false"
  :scaleStep="0.15"
  :animation-duration="1000"
></WordCloudTunnel>
```

```html
const el = ref<InstanceType<typeof WordCloudTunnel>>()

let id = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    el.value?.append({
      id: (id++).toString(),
      text: 'text',
    })
  }, 1000)
})

<WordCloudTunnel
  ref="el"
  :color="['#ffd077', '#3bc4c7', '#3a9eea', '#ff4e69', '#461e47']"
  :axisCount="6"
  :randomAngleRangePerAxis="60"
  :randomAxis="false"
  :scaleStep="0"
  :opacityStep="0"
  :animation-duration="1000"
>
  <template #default="{id, level, text, color}">
    <div :style="{backgroundColor: level > 1 ? 'green' : 'gray',}">{{ text }}</div>
  </template>
</WordCloudTunnel>
```
