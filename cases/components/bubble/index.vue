<script setup lang="ts">
import './bubble.css'

interface BubbleColor {
  name: string
  value: string
}

const props = withDefaults(defineProps<{
  /** 泡泡直径（px） */
  size?: number
  /** 泡泡配色列表 */
  colors?: BubbleColor[]
  /** 泡泡间距（px） */
  gap?: number
}>(), {
  size: 160,
  gap: 28,
  colors: () => [
    { name: '雾蓝', value: '#86b0ed' },
    { name: '杏黄', value: '#edd486' },
    { name: '紫罗兰', value: '#9013fe' },
    { name: '朱红', value: '#d0021b' },
    { name: '明黄', value: '#f8e71c' },
    { name: '薄荷', value: '#50e3c2' },
    { name: '墨黑', value: '#4a4a4a' },
  ],
})

const stageStyle = computed(() => ({
  '--bubble-size': `${props.size}px`,
  '--bubble-gap': `${props.gap}px`,
}))

function bubbleStyle(value: string) {
  return { '--bubble-color': value }
}
</script>

<template>
  <div
    class="bubble-stage"
    :style="stageStyle"
  >
    <div
      v-for="bubble in colors"
      :key="bubble.name"
      :title="bubble.name"
      class="bubble"
      :style="bubbleStyle(bubble.value)"
    />
  </div>
</template>