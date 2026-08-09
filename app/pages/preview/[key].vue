<script setup lang="ts">
import type { Component } from 'vue'

definePageMeta({ layout: 'bare' })

const route = useRoute()

const FULL_PAGE_KEYS = ['login', 'scratch-card', 'code-rain', 'swiper', 'picsum', 'picsum-tiles']

const previewMap: Record<string, Component> = {
  'copy-button': defineAsyncComponent(() => import('~~/cases/components/copy-button/index.vue')),
  'segmented-control': defineAsyncComponent(() => import('~~/cases/components/segmented-control/index.vue')),
  login: defineAsyncComponent(() => import('~~/cases/pages/login/index.vue')),
  'scratch-card': defineAsyncComponent(() => import('~~/cases/pages/scratch-card/index.vue')),
  'code-rain': defineAsyncComponent(() => import('~~/cases/pages/code-rain/index.vue')),
  swiper: defineAsyncComponent(() => import('~~/cases/pages/swiper/index.vue')),
  picsum: defineAsyncComponent(() => import('~~/cases/pages/picsum/grid.vue')),
  'picsum-tiles': defineAsyncComponent(() => import('~~/cases/pages/picsum/tiles.vue')),
}

const key = computed(() => String(route.params.key ?? ''))
const comp = computed(() => previewMap[key.value])
const isFullPage = computed(() => FULL_PAGE_KEYS.includes(key.value))
</script>

<template>
  <div class="min-h-screen bg-slate-950">
    <component :is="comp" v-if="comp && isFullPage" />
    <div v-else-if="comp" class="grid min-h-screen place-items-center p-10">
      <component :is="comp" />
    </div>
    <p v-else class="grid min-h-screen place-items-center text-sm text-slate-500">
      未知预览：{{ key }}
    </p>
  </div>
</template>