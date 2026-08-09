<script setup lang="ts">
import SegmentedControl from '~~/cases/components/segmented-control/index.vue'

useHead({ title: '分段选择器 · Code' })

const granularity = ref('周')
const roles = ['小时', '日', '周', '月']
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">分段选择器</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
        Pill 风格分段选择，v-model 双向绑定，支持禁用态。
      </p>
    </header>

    <ShowcasePreview title="受控用法 · 当前值联动">
      <div class="flex flex-col items-start gap-4 p-6">
        <SegmentedControl v-model="granularity" :options="roles" />
        <p class="text-sm text-slate-400">
          当前选中：<span class="font-medium text-slate-100">{{ granularity }}</span>
        </p>
      </div>
    </ShowcasePreview>

    <ShowcasePreview title="禁用态">
      <div class="p-6">
        <SegmentedControl v-model="granularity" :options="roles" disabled />
      </div>
    </ShowcasePreview>

    <ShowcaseCode file="components/segmented-control/index.vue" />
  </ShowcasePage>
</template>