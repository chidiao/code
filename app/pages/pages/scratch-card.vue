<script setup lang="ts">
import ScratchSimple from '~~/cases/pages/scratch-card/simple.vue'
import ScratchPage from '~~/cases/pages/scratch-card/index.vue'
import ScratchCard from '~~/cases/pages/scratch-card/scratch-card.vue'

useHead({ title: '刮刮卡 · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">刮刮卡</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
        Canvas 刮除涂层实现抽奖：从最简单的 clearRect 版本，到带 DPR 高清、Pointer
        统一交互、轨迹插值、自动开奖的完整页。
      </p>
    </header>

    <!-- 简易版 -->
    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">简易版 · 300 × 150</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">
          骨架版：灰色涂层 + 鼠标/触摸刮掉小方块，底层文字显现。
        </p>
      </div>
      <ShowcasePreview title="简易版">
        <div class="flex justify-center p-6">
          <ScratchSimple />
        </div>
      </ShowcasePreview>
      <ShowcaseCode file="pages/scratch-card/simple.vue" label="简易版 · 核心逻辑" :lines="[1, 63]" />
    </div>

    <!-- 完整页 -->
    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">完整页 · 幸运刮刮卡</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">
          打磨版：DPR 高清渲染、Pointer Events 统一鼠标/触摸、轨迹插值补笔、刮开 60%
          自动揭晓。
        </p>
      </div>
      <ShowcasePreviewPage url="/pages/scratch-card" open="/preview/scratch-card" github="cases/pages/scratch-card/index.vue">
        <ScratchPage />
      </ShowcasePreviewPage>
      <ShowcaseCode file="pages/scratch-card/index.vue" label="index.vue" />
      <ShowcaseCode file="pages/scratch-card/scratch-card.vue" label="ScratchCard.vue" />
    </div>
  </ShowcasePage>
</template>