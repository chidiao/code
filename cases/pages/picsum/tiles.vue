<script setup lang="ts">
import { usePicsum } from './usePicsum'

const { columns, images, loading, copiedId, load, copy, imgUrl } = usePicsum()
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-slate-950">
    <div
      v-if="images.length"
      class="grid flex-1 grid-rows-3"
      :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
    >
      <button
        v-for="img in images"
        :key="img.id"
        type="button"
        class="group relative block"
        :class="copiedId === img.id ? 'outline-4 outline-brand-400/80 -outline-offset-4' : 'outline-none'"
        @click="copy(img.id)"
      >
        <img
          :src="imgUrl(img.id)"
          :alt="`picsum ${img.id}`"
          loading="lazy"
          class="h-full w-full object-cover"
        />
      </button>
    </div>

    <button
      type="button"
      class="btn-solid absolute right-5 bottom-5 h-10 w-10 items-center justify-center p-0 text-sm"
      :title="loading ? '加载中…' : '换一页'"
      :aria-label="loading ? '加载中' : '换一页'"
      :disabled="loading"
      @click="load"
    >
      <span :class="loading ? 'i-lucide-loader-circle animate-spin' : 'i-lucide-shuffle'" />
    </button>
  </div>
</template>