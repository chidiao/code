<script setup lang="ts">
import { usePicsum } from './usePicsum'

const { columns, images, page, loading, error, copiedId, load, copy, imgUrl } = usePicsum()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-slate-950 px-6 py-8">
    <div class="mx-auto flex w-full max-w-screen-xl flex-1 flex-col">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-xl font-semibold text-slate-100">Lorem Picsum 占位图</h1>
          <p class="mt-1 text-sm text-slate-400">
            随机页 #{{ page }} · {{ columns }} 列 · 点击图片复制 URL
          </p>
        </div>
        <button type="button" class="btn-solid px-4 py-1.5" :disabled="loading" @click="load">
          {{ loading ? '加载中…' : '换一页' }}
        </button>
      </div>

      <p
        v-if="error"
        class="mb-4 rounded-lg border border-rose-800/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-300"
      >
        加载失败：{{ error }}
      </p>

      <div
        v-if="images.length"
        class="grid flex-1 grid-rows-3 gap-4"
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
      >
        <button
          v-for="img in images"
          :key="img.id"
          type="button"
          class="group relative flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 text-left transition-colors hover:border-slate-600"
          @click="copy(img.id)"
        >
          <img
            :src="imgUrl(img.id)"
            :alt="img.author"
            loading="lazy"
            class="min-h-0 w-full flex-1 object-cover"
          />
          <div class="px-3 py-2">
            <p class="truncate text-xs text-slate-400 group-hover:text-slate-200">{{ img.author }}</p>
          </div>
          <span
            v-if="copiedId === img.id"
            class="absolute inset-0 grid place-items-center bg-slate-950/70 text-sm font-medium text-emerald-400"
          >
            已复制
          </span>
        </button>
      </div>

      <p v-else-if="!loading && !error" class="flex flex-1 items-center justify-center text-sm text-slate-500">
        这一页没有图片，换个随机页试试
      </p>
    </div>
  </div>
</template>