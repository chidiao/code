# 创建组件案例（Component）

> 适用：在 MyCode 里新增一个**组件案例** —— 可复用、自带逻辑与 props 的组件。
> 前置：先读 [cases.md](./cases.md)（公共约束），本文只写组件类型专属约束。
> 参考实现：`cases/components/mybtn/`、`cases/components/segmented-control/`、`cases/components/swiper-autoplay/`。

## 1. 什么是组件案例

特征：
- 有明确的边界与对外协议：`props` / `emit` / `v-model`
- 在一页内以**多个小 Demo**（`<ShowcasePreview>`）展示不同形态/尺寸/状态
- 可被页面案例 import 组合（如 swiper 系列被 `cases/pages/swiper/index.vue` 复用）

不属于组件案例：整页沉浸效果、占满视口的页面 → 用 [create-page](./create-page.md)；纯展示区块 → 用 [create-template](./create-template.md)。

## 2. 目录与文件

| 项 | 约定 |
| --- | --- |
| 源码目录 | `cases/components/<名字>/` |
| 入口文件 | 建议 `index.vue` |
| 展示页 | `app/pages/components/<名字>.vue` |
| 路由 | `/components/<名字>` |

单个组件案例直接一个 `index.vue` 即可；若同一组件有多种实现（逻辑一致、UI 变体），按公共约束同目录共存多文件。

## 3. 组件本体写法

- `<script setup lang="ts">`，用 `withDefaults(defineProps<…>(), …)` 给足默认值。
- 常见对外协议示例（mybtn 的按钮本体，复制等动作逻辑抽到 `useCopy` hook 后由 `copy.vue` 组合）：

```ts
withDefaults(defineProps<{
  variant?: 'border' | 'fill' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'pill' | 'rect'
  disabled?: boolean
  block?: boolean
}>(), { variant: 'border', size: 'md', shape: 'pill', disabled: false, block: false })
```

- 需要双向绑定/受控值时用 `v-model`（`defineModel`），参考 segmented-control。
- 有 `variant`（`solid/outline/ghost`）与 `size`（`sm/md/lg`）约定的，优先落到已有 shortcut/尺寸类：

| 维度 | 取值 → 类 |
| --- | --- |
| variant | `solid → btn-solid`，`outline → btn-outline`，`ghost → btn-ghost` |
| size | `sm → px-2.5 py-1 text-xs`，`md → px-3.5 py-1.5 text-sm`，`lg → px-5 py-2.5 text-sm` |

- 复制等操作要有**正反馈**（图标切换 `i-lucide-copy` → `i-lucide-check` + 文案「已复制」），自动回弹（`useCopy` 默认 1.6s）。
- 样式遵循 `ui-style.md`：深色、`brand-*`、`card`/`btn-*` shortcut，不写 `<style>` 块。

## 4. 建展示页

`app/pages/components/<名字>.vue`：

```vue
<script setup lang="ts">
import CompCase from '~~/cases/components/<名字>/index.vue'

useHead({ title: '<案例名> · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100"><案例名></h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">一句话说明。</p>
    </header>

    <!-- 每种形态/尺寸一个小 Demo -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ShowcasePreview title="场景 A">
        <div class="flex flex-wrap gap-3 p-6">
          <CompCase :text="code" />
        </div>
      </ShowcasePreview>

      <ShowcasePreview title="场景 B">
        <div class="flex flex-wrap gap-3 p-6">
          <CompCase :text="code" variant="outline" />
        </div>
      </ShowcasePreview>
    </div>

    <ShowcaseCode file="components/<名字>/index.vue" />
  </ShowcasePage>
</template>
```

要点：
- 组件展示用 `<ShowcasePreview>`（小卡片）；组件一般不放 `<ShowcasePreviewPage>`（那是整页/大块场景）。
- `<ShowcaseCode>` 的 `file` 从 `cases/` 根开始写相对路径：`components/<名字>/index.vue`。
- 需要受控演示时，在展示页声明 `ref` 并在 `<ShowcasePreview>` 里联动展示（参考 segmented-control 的「当前选中」）。

## 5. 注册预览

`app/pages/preview/[key].vue` 的 `previewMap` 加一行（key 用 `<名字>`）：

```ts
const previewMap: Record<string, Component> = {
  ...,
  '<名字>': defineAsyncComponent(() => import('~~/cases/components/<名字>/index.vue')),
}
```

- 组件默认**不进** `FULL_PAGE_KEYS`（组件是局部 Demo，不占满视口）。
- 若组件视觉上适合整屏预览，也可以进 `FULL_PAGE_KEYS`，并在首页卡片用 iframe 缩略图。

## 6. 挂导航与首页（可选但建议）

- `app/config/nav.ts`：在 `components` 的分组下加一项。
- `app/config/cards.ts`：加一张卡片，缩略图优先**内联 SVG**（见现有 mybtn / segmented-control 卡片的 `svg` 写法）。

## 7. 完成清单

- [ ] `cases/components/<名字>/` 已建（至少 `index.vue`）
- [ ] `app/pages/components/<名字>.vue` 已建，`useHead` 设标题
- [ ] 已注册 `preview/[key].vue`（必要时进 FULL_PAGE_KEYS）
- [ ] 代码块切片符合「括号成对」规范
- [ ] `nav.ts` / `cards.ts` 已挂入口（可选）
- [ ] `yarn build` 通过