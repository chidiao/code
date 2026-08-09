<script setup lang="ts">
import CodeRain from '~~/cases/pages/code-rain/index.vue'

useHead({ title: '代码雨 · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">代码雨</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
        Canvas 逐帧绘制的字符雨，容器自适应尺寸，窗口缩放自动重置列数，整页沉浸式 Demo。
      </p>
    </header>

    <ShowcasePreviewPage url="/pages/code-rain" open="/preview/code-rain" github="cases/pages/code-rain/index.vue">
      <CodeRain />
    </ShowcasePreviewPage>

    <ShowcaseCode file="pages/code-rain/index.vue" label="核心逻辑" :lines="[1, 54]" />
    <ShowcaseCode file="pages/code-rain/index.vue" label="生命周期 · 启动/清理" lang="ts" :lines="[37, 53]" />
  </ShowcasePage>
</template>