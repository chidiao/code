<script setup lang="ts">
import CodeRain from '~~/cases/pages/code-rain/index.vue'

useHead({ title: '代码雨 · Code' })
</script>

<template>
  <ShowcasePage title="代码雨" description="Canvas 逐帧绘制的字符雨，容器自适应尺寸，窗口缩放自动重置列数，整页沉浸式 Demo。">
    <ShowcasePreviewPage
      title="Matrix 代码雨"
      url="/pages/code-rain"
      open="/preview/code-rain"
      github="cases/pages/code-rain/index.vue"
    >
      <CodeRain />
    </ShowcasePreviewPage>

    <ShowcaseCode file="pages/code-rain/index.vue" label="核心逻辑" :lines="[1, 35]" />
    <ShowcaseCode file="pages/code-rain/index.vue" label="生命周期 · 启动/清理" lang="ts" :lines="[37, 53]" />
  </ShowcasePage>
</template>