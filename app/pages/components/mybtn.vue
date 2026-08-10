<script setup lang="ts">
import MyBtn from '~~/cases/components/mybtn/index.vue'
import MyBtnCopy from '~~/cases/components/mybtn/copy.vue'

useHead({ title: '渐变按钮 · Code' })

const code = "const msg = 'hello showcase'"
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">渐变按钮</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">
        background-clip 双层裁剪实现渐变描边圆角按钮；props 驱动风格/尺寸/形状，复制逻辑抽离为 useCopy 独立 Hook，与按钮组件解耦。
      </p>
    </header>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ShowcasePreview title="渐变描边核心（border 风格）">
        <div class="flex flex-wrap items-center gap-3 p-6">
          <MyBtn>渐变描边</MyBtn>
          <MyBtn shape="rect">直角圆角</MyBtn>
          <MyBtn style="--btn-fill: #312e81">自定义底色</MyBtn>
        </div>
      </ShowcasePreview>

      <ShowcasePreview title="风格 variant：border / fill / ghost">
        <div class="flex flex-wrap items-center gap-3 p-6">
          <MyBtn>border 描边</MyBtn>
          <MyBtn variant="fill">fill 填充</MyBtn>
          <MyBtn variant="ghost">ghost 幽灵</MyBtn>
          <MyBtn disabled>disabled</MyBtn>
        </div>
      </ShowcasePreview>

      <ShowcasePreview title="尺寸 size：sm / md / lg">
        <div class="flex flex-wrap items-center gap-3 p-6">
          <MyBtn size="sm">小</MyBtn>
          <MyBtn size="md">中</MyBtn>
          <MyBtn size="lg">大</MyBtn>
        </div>
      </ShowcasePreview>

      <ShowcasePreview title="组合复制：MyBtn + useCopy">
        <div class="flex flex-wrap items-center gap-3 p-6">
          <MyBtnCopy :text="code" />
          <MyBtnCopy :text="code" variant="fill" />
          <MyBtnCopy :text="code" size="lg" />
        </div>
      </ShowcasePreview>
    </div>

    <ShowcaseCode file="components/mybtn/index.vue" :lines="[41, 100]" lang="css" label="index.vue · 渐变描边核心 CSS" />
    <ShowcaseCode file="components/mybtn/index.vue" :lines="[2, 26]" lang="ts" label="index.vue · props 与类映射" />
    <ShowcaseCode file="components/mybtn/useCopy.ts" label="useCopy.ts · 复制逻辑（与按钮解耦）" />
    <ShowcaseCode file="components/mybtn/copy.vue" label="copy.vue · 按钮 + useCopy 组合" />
  </ShowcasePage>
</template>