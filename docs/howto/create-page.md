# 创建页面案例（Page）

> 适用：在 MyCode 里新增一个**页面案例** —— 整页/大块页面 Demo，可含一个 hook 与多种 UI 变体。
> 前置：先读 [cases.md](./cases.md)（公共约束），本文只写页面类型专属约束。
> 参考实现：`cases/pages/login/`（整页）、`cases/pages/picsum/`（hook + grid/tiles 变体）、`cases/pages/swiper/`（组合组件）。

## 1. 什么是页面案例

特征：
- 整页沉浸（独占视口，`min-h-screen`）或一段大块页面内容
- 通常是「逻辑 hook + 一个或多个 UI 变体」放在同一文件夹
- 展示时以 `<ShowcasePreviewPage>`（浏览器窗框）为主，每种 UI 变体一个窗框

不属于页面案例：可复用的独立组件 → [create-component](./create-component.md)；纯静态可复制区块 → [create-template](./create-template.md)。

## 2. 目录与文件（重点）

| 项 | 约定 |
| --- | --- |
| 源码目录 | `cases/pages/<名字>/` |
| 入口文件 | 不强制 `index.vue`，变体文件各起名（如 `grid.vue` / `tiles.vue`） |
| 展示页 | `app/pages/pages/<名字>.vue` |
| 路由 | `/pages/<名字>` |

推荐结构（参考 picsum）：

```
cases/pages/picsum/
├── usePicsum.ts   # 所有逻辑（状态、请求、复制、resize）
├── grid.vue       # UI 变体一
└── tiles.vue      # UI 变体二（同 hook）
```

- 同目录内用相对导入：`import { usePicsum } from './usePicsum'`。
- 变体各自是完整组件（自含背景与布局），能被 `preview/[key].vue` 单独预览。

## 3. 整页 Demo 本体写法

- 整页 Demo 自带背景：`min-h-screen bg-slate-950`；占满视口且会进 `FULL_PAGE_KEYS`。
- 逻辑抽到 hook（`use<名字>.ts`），用 `ref` / `computed` / `onMounted` / `onUnmounted`，注意清理事件监听与定时器（见 `usePicsum.ts`）。
- 交互反馈遵循公共规范：复制正反馈、加载态、错误提示用 `rose-*`。
- 样式遵循 `ui-style.md`。

## 4. 建展示页

`app/pages/pages/<名字>.vue`（每种 UI 变体一个 `<ShowcasePreviewPage>`）：

```vue
<script setup lang="ts">
import VariantOne from '~~/cases/pages/<名字>/grid.vue'
import VariantTwo from '~~/cases/pages/<名字>/tiles.vue'

useHead({ title: '<案例名> · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100"><案例名></h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">一句话说明。</p>
    </header>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">样式一 · …</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">该变体描述。</p>
      </div>
      <ShowcasePreviewPage url="/preview/<名字>" open="/preview/<名字>" github="cases/pages/<名字>/grid.vue">
        <VariantOne />
      </ShowcasePreviewPage>
    </div>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">样式二 · …</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">该变体描述。</p>
      </div>
      <ShowcasePreviewPage url="/preview/<名字>-<变体>" open="/preview/<名字>-<变体>" github="cases/pages/<名字>/tiles.vue">
        <VariantTwo />
      </ShowcasePreviewPage>
    </div>

    <ShowcaseCode file="pages/<名字>/use<名字>.ts" label="核心逻辑" />
  </ShowcasePage>
</template>
```

要点：
- `url` 填该变体的预览地址（如 `/preview/picsum` 与 `/preview/picsum-tiles`），`github` 填从仓库根到案例文件的相对路径。
- 整页 demo 的组合展示（非独占视口）用 `url="/pages/<名字>"`，见 swiper 展示页。
- `<ShowcaseCode>` 只放关键行（hook 全部逻辑或关键片段），不要整段贴。

## 5. 注册预览（必须有）

`app/pages/preview/[key].vue`：
1. `previewMap` 加 key（每个变体一个 key，如 `picsum` 与 `picsum-tiles`）。
2. 整页 Demo（占满视口）把 key 加进 `FULL_PAGE_KEYS`。

```ts
const FULL_PAGE_KEYS = [..., '<名字>', '<名字>-<变体>']
const previewMap = {
  ...,
  '<名字>': defineAsyncComponent(() => import('~~/cases/pages/<名字>/index.vue')),
  '<名字>-<变体>': defineAsyncComponent(() => import('~~/cases/pages/<名字>/<变体>.vue')),
}
```

## 6. 挂导航与首页（可选但建议）

- `app/config/nav.ts`：`pages` 分组加一项（整页类放「整页」分组，局部/组合类放「案例」分组）。
- `app/config/cards.ts`：加卡片，整页类缩略图用 `mode: 'iframe'` + `src: '/preview/<名字>'` + `zoom`。

## 7. 完成清单

- [ ] `cases/pages/<名字>/` 已建（hook + 一个或多个变体文件）
- [ ] `app/pages/pages/<名字>.vue` 已建，`useHead` 设标题
- [ ] 已在 `preview/[key].vue` 注册（含 FULL_PAGE_KEYS）
- [ ] 代码块切片符合「括号成对」规范
- [ ] `nav.ts` / `cards.ts` 已挂入口（可选）
- [ ] `yarn build` 通过