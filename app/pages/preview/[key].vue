<script setup lang="ts">
import type { Component } from 'vue'

definePageMeta({ layout: 'bare' })

const route = useRoute()

const FULL_PAGE_KEYS = ['login', 'scratch-card', 'code-rain', 'swiper', 'picsum', 'picsum-tiles']

const previewMap: Record<string, Component> = {
  mybtn: defineAsyncComponent(() => import('~~/cases/components/mybtn/index.vue')),
  'segmented-control': defineAsyncComponent(() => import('~~/cases/components/segmented-control/index.vue')),
  bubble: defineAsyncComponent(() => import('~~/cases/components/bubble/index.vue')),
  login: defineAsyncComponent(() => import('~~/cases/pages/login/index.vue')),
  'scratch-card': defineAsyncComponent(() => import('~~/cases/pages/scratch-card/index.vue')),
  'code-rain': defineAsyncComponent(() => import('~~/cases/pages/code-rain/index.vue')),
  swiper: defineAsyncComponent(() => import('~~/cases/pages/swiper/index.vue')),
  picsum: defineAsyncComponent(() => import('~~/cases/pages/picsum/grid.vue')),
  'picsum-tiles': defineAsyncComponent(() => import('~~/cases/pages/picsum/tiles.vue')),
  pricing: defineAsyncComponent(() => import('~~/cases/templates/pricing/index.vue')),
}

const key = computed(() => String(route.params.key ?? ''))
const comp = computed(() => previewMap[key.value])
const isFullPage = computed(() => FULL_PAGE_KEYS.includes(key.value))
/** 缩略图模式（?thumb=1）：固定视口、禁止滚动，用于首页 iframe 封面 */
const isThumb = computed(() => route.query.thumb === '1')
const viewportClass = computed(() => (isThumb.value ? 'h-screen overflow-hidden' : 'min-h-screen'))
</script>

<template>
  <div :class="['bg-slate-950', viewportClass]">
    <component :is="comp" v-if="comp && isFullPage" />
    <div v-else-if="comp" :class="['grid place-items-center p-10', viewportClass]">
      <component :is="comp" />
    </div>
    <p v-else :class="['grid place-items-center text-sm text-slate-500', viewportClass]">
      未知预览：{{ key }}
    </p>
  </div>
</template>