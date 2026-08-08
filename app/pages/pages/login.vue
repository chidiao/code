<script setup lang="ts">
import LoginPage from '~~/cases/pages/login/index.vue'

useHead({ title: '登录页 Demo · Code' })
</script>

<template>
  <ShowcasePage title="登录页" description="深色渐变背景 + 毛玻璃登录卡片，作为整页 Demo 在独立预览面板里展示。">
    <ShowcasePreviewPage title="登录页" url="/pages/login" open="/preview/login" github="cases/pages/login/index.vue">
      <LoginPage />
    </ShowcasePreviewPage>

    <ShowcaseCode file="pages/login/index.vue" />
  </ShowcasePage>
</template>