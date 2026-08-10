<script setup lang="ts">
import Bubble from '~~/cases/components/bubble/index.vue'

useHead({ title: '光泽泡泡 · Code' })

const bubbleMarkup = `<!-- 使用：引入 bubble.css，按需设置 CSS 变量 -->
<div class="bubble-stage" style="--bubble-size:160px; --bubble-gap:28px">
  <div class="bubble" style="--bubble-color:#86b0ed" title="雾蓝"></div>
  <div class="bubble" style="--bubble-color:#f8e71c" title="明黄"></div>
  <div class="bubble" style="--bubble-color:#50e3c2" title="薄荷"></div>
</div>`
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">光泽泡泡</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
        纯 CSS 光泽球体：inset 阴影模拟玻璃质感 + 伪元素高光，配色与尺寸可配。
      </p>
    </header>

    <ShowcasePreview title="默认七色">
      <Bubble />
    </ShowcasePreview>

    <ShowcaseCode file="components/bubble/bubble.css" label="核心 CSS" />

    <ShowcasePreview title="自定义尺寸与配色">
      <Bubble
        :size="96"
        :gap="20"
        :colors="[
          { name: '青', value: '#0ea5e9' },
          { name: '紫', value: '#8b5cf6' },
          { name: '玫红', value: '#ec4899' },
        ]"
      />
    </ShowcasePreview>

    <ShowcaseCode :source="bubbleMarkup" lang="html" label="使用示例" />
  </ShowcasePage>
</template>