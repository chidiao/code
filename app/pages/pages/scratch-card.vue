<script setup lang="ts">
import ScratchPage from '~~/cases/pages/scratch-card/index.vue'
import ScratchCard from '~~/cases/components/scratch-card/index.vue'

useHead({ title: '刮刮卡页 · Code' })
</script>

<template>
  <ShowcasePage title="刮刮卡" description="整页抽奖 Demo：Canvas 刮开涂层，奖品被完全遮住、刮开后可见；Pointer Events 统一交互，DPR 高清渲染。">
    <ShowcasePreviewPage title="幸运刮刮卡" url="/pages/scratch-card" open="/preview/scratch-card" github="cases/pages/scratch-card/index.vue">
      <ScratchPage />
    </ShowcasePreviewPage>

    <ShowcasePreview title="卡片本体">
      <div class="flex justify-center p-6">
        <ScratchCard />
      </div>
    </ShowcasePreview>

    <ShowcaseCode file="pages/scratch-card/index.vue" label="index.vue" />
    <ShowcaseCode file="components/scratch-card/index.vue" label="ScratchCard.vue" />
  </ShowcasePage>
</template>