<script setup lang="ts">
import { getSource, sliceLines } from '~/composables/useSource'

const props = defineProps<{
  file?: string
  source?: string
  /** 只显示的行区间 [起始, 结束]，1 开始，省略则显示全部 */
  lines?: [number, number]
}>()

const text = computed(() => {
  if (props.source !== undefined) return props.source
  const src = props.file ? getSource(props.file) : undefined
  return src ? sliceLines(src.content, props.lines?.[0], props.lines?.[1]) : ''
})
</script>

<template>
  <section class="card overflow-hidden">
    <div class="border-b border-slate-800 px-4 py-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
      文档
    </div>
    <div class="bg-slate-900 p-5">
      <p v-if="text" class="text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">{{ text }}</p>
      <p v-else class="text-sm text-slate-500">未找到 {{ file }}</p>
    </div>
  </section>
</template>