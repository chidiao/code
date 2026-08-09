<script setup lang="ts">
import PicsumGrid from '~~/cases/pages/picsum/grid.vue'
import PicsumTiles from '~~/cases/pages/picsum/tiles.vue'
import { githubUrl } from '~/config/site'

useHead({ title: 'Picsum 占位图 · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-slate-100">Picsum 占位图</h1>
        <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
          调 Lorem Picsum 的 /v2/list 接口拉取图片：随机页码、按屏幕宽度自适应列数（limit = 列数 ×
          3，每行铺满）、点击图片复制 URL、resize 时自动重新请求。
        </p>
      </div>
    </header>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">样式一 · 卡片网格</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">
          卡片带间距与圆角，展示作者信息，悬浮描边、点击整卡覆盖“已复制”反馈。
        </p>
      </div>
      <ShowcasePreviewPage url="/preview/picsum" open="/preview/picsum" github="cases/pages/picsum/grid.vue">
        <PicsumGrid />
      </ShowcasePreviewPage>
    </div>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">样式二 · 平铺贴放</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">
          图片无间距、无圆角、紧贴铺满整行，也不展示文字；复制时仅描边高亮，右下角悬浮换页按钮。
        </p>
      </div>
      <ShowcasePreviewPage
        url="/preview/picsum-tiles"
        open="/preview/picsum-tiles"
        github="cases/pages/picsum/tiles.vue"
      >
        <PicsumTiles />
      </ShowcasePreviewPage>
    </div>

    <ShowcaseCode file="pages/picsum/usePicsum.ts" label="usePicsum · 全部逻辑" />
  </ShowcasePage>
</template>
