<script setup lang="ts">
import PricingTemplate from '~~/cases/templates/pricing/index.vue'

useHead({ title: '定价方案 · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">定价方案</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
        纯 Tailwind 工具类写成的三列定价区块，中间套餐高亮 + 「最受欢迎」角标，整块可直接复制到任何项目。
      </p>
    </header>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">效果预览</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">
          区块居中展示，支持切换到独立全屏预览、跳转 GitHub 查看源码。
        </p>
      </div>
      <ShowcasePreviewPage url="/templates/pricing" open="/preview/pricing" github="cases/templates/pricing/index.vue">
        <div class="flex justify-center p-8">
          <PricingTemplate />
        </div>
      </ShowcasePreviewPage>
    </div>

    <ShowcaseCode file="templates/pricing/index.vue" label="完整源码" />
  </ShowcasePage>
</template>