<script setup lang="ts">
type ThumbMode = 'iframe' | 'image' | 'svg'

const props = withDefaults(
  defineProps<{
    mode?: ThumbMode
    src?: string
    svg?: string
    alt?: string
    aspect?: string
    /** iframe 内层视口放大倍数，内容越小、可显示区域越多 */
    zoom?: number
  }>(),
  { aspect: 'aspect-video', zoom: 1.8 },
)

const resolvedMode = computed<ThumbMode | 'none'>(() => {
  if (props.mode) return props.mode
  if (props.svg) return 'svg'
  if (props.src) return 'iframe'
  return 'none'
})

const iframeSize = computed(() => `${props.zoom * 100}%`)
const iframeTransform = computed(() => `translate(-50%, -50%) scale(${1 / props.zoom})`)
</script>

<template>
  <div class="relative overflow-hidden bg-slate-950" :class="aspect">
    <iframe
      v-if="resolvedMode === 'iframe' && src"
      :src="src"
      :title="alt"
      class="pointer-events-none absolute top-1/2 left-1/2 border-0"
      :style="{ width: iframeSize, height: iframeSize, transform: iframeTransform }"
      tabindex="-1"
      loading="lazy"
    />
    <img
      v-else-if="resolvedMode === 'image' && src"
      :src="src"
      :alt="alt ?? ''"
      class="h-full w-full object-cover"
      loading="lazy"
    />
    <div
      v-else-if="resolvedMode === 'svg' && svg"
      v-html="svg"
      class="thumb-svg h-full w-full"
    />
    <div v-else class="grid h-full w-full place-items-center text-slate-700">
      <span class="i-lucide-image text-xl" />
    </div>
  </div>
</template>

<style scoped>
.thumb-svg :deep(svg) {
  width: 100%;
  height: 100%;
}
</style>