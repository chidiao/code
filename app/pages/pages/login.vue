<script setup lang="ts">
import LoginPage from '~~/cases/pages/login/index.vue'

useHead({ title: '登录页 Demo · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">登录页 Demo</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
        深色渐变背景 + 毛玻璃登录卡片，作为整页 Demo 在独立预览面板里展示。
      </p>
    </header>

    <ShowcasePreviewPage url="/pages/login" open="/preview/login" github="cases/pages/login/index.vue">
      <LoginPage />
    </ShowcasePreviewPage>

    <ShowcaseCode file="pages/login/index.vue" />
  </ShowcasePage>
</template>