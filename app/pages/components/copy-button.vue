<script setup lang="ts">
import CopyButton from '~~/cases/components/copy-button/index.vue'

useHead({ title: '复制按钮 · Code' })

const code = "const msg = 'hello showcase'"
</script>

<template>
  <ShowcasePage title="复制按钮" description="Clipboard 一键复制，内置反馈，三种形态与三种尺寸，可多组同列一页。">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <ShowcasePreview title="三种形态">
        <div class="flex flex-wrap gap-3 p-6">
          <CopyButton :text="code" />
          <CopyButton :text="code" variant="outline" />
          <CopyButton :text="code" variant="ghost" />
        </div>
      </ShowcasePreview>

      <ShowcasePreview title="三种尺寸">
        <div class="flex flex-wrap items-center gap-3 p-6">
          <CopyButton :text="code" size="sm" />
          <CopyButton :text="code" size="md" />
          <CopyButton :text="code" size="lg" />
        </div>
      </ShowcasePreview>
    </div>

    <ShowcaseCode file="components/copy-button/index.vue" :lines="[1, 30]" />
    <ShowcaseCode file="components/copy-button/index.vue" />
  </ShowcasePage>
</template>