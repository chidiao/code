# 案例（page / component）怎么建，怎么展示

> 适用：在 MyCode 里新增一个**组件案例**或**页面案例**。

## 1. 目录约定

案例源码统一放项目根下 `cases/`（不属于 `app/` srcDir，不会被 Nuxt 当路由自动生成，而是作为"待展示的源码 + 可复用组件"存在）：

| 类型 | 目录 | 例子 |
| --- | --- | --- |
| 组件案例 | `cases/components/<名字>/` | `cases/components/copy-button/` |
| 页面案例 | `cases/pages/<名字>/` | `cases/pages/login/` |

- 名字用 `kebab-case`
- 一个案例一个文件夹；**入口不强制叫 `index.vue`**，可以按需拆多个文件一起管理
- 一个案例的「逻辑 hook + 多个 UI 变体」**放在同一个文件夹里**（推荐），不必拆成多个独立案例。如 `cases/pages/picsum/` 下共存 `usePicsum.ts`、`grid.vue`、`tiles.vue`。只有维护习惯上明显该独立成例的（如 swiper 各模块），才拆独立文件夹
- 案例文件里直接用 `<script setup lang="ts">`，风格与 `app/` 内一致

代码里引入案例，跨目录用根别名 `~~/cases/...`，同目录内用相对路径 `./...`：

```ts
// 同目录内（如均位于 cases/pages/picsum/）
import { usePicsum } from './usePicsum'

// 跨目录（展示页在 app/ 下）
import PicsumGrid from '~~/cases/pages/picsum/grid.vue'
```

## 2. 在页面展示

展示页放 `app/pages/`，案例类型决定放组件目录（`/components/*` 路由）还是页面目录（`/pages/*` 路由）：

| 案例类型 | 展示页位置 | 路由 |
| --- | --- | --- |
| 组件案例 | `app/pages/components/<名字>.vue` | `/components/<名字>` |
| 页面案例 | `app/pages/pages/<名字>.vue` | `/pages/<名字>` |

展示页本质是 **tailwind + 普通 DOM 做排版**，需要时插入 showcase 组件；标题、描述一律用 DOM 手写，组件不携带字面内容：

```vue
<script setup lang="ts">
import CompCase from '~~/cases/components/<名字>/index.vue'
import PageDemo from '~~/cases/pages/<名字>/index.vue'
useHead({ title: '案例名 · Code' })
</script>

<template>
  <ShowcasePage>
    <!-- 页头：手写 -->
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100">案例名</h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">一句话说明。</p>
    </header>

    <!-- 预览块：标题/描述手写，preview 组件只出窗框 -->
    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">场景一</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">该场景描述。</p>
      </div>
      <ShowcasePreviewPage url="/preview/<名字>" open="/preview/<名字>" github="cases/pages/<名字>/">
        <PageDemo />
      </ShowcasePreviewPage>
    </div>

    <!-- 内嵌小 Demo -->
    <ShowcasePreview title="场景小标题">
      <CompCase />
    </ShowcasePreview>

    <!-- 代码：只放关键行，不要整段贴 -->
    <ShowcaseCode file="pages/<名字>/<文件>.vue" label="核心逻辑" lang="ts" :lines="[1, 54]" />
  </ShowcasePage>
</template>
```

Showcase 组件职责：

| 组件 | 职责 | 说明 |
| --- | --- | --- |
| `<ShowcasePage>` | 纯纵向排版容器（`space-y-8`） | 不接收 title / description |
| `<ShowcasePreview>` | 内嵌小 Demo 的小卡片，可带 `title` 工具条 | 组件级局部展示用 |
| `<ShowcasePreviewPage>` | 整页预览窗框（浏览器窗口样式 + 地址栏 + GitHub / 新窗口按钮） | **不接收 `title`**，地址栏显示 `url`；标题/描述由页面自己写 |
| `<ShowcaseCode>` | 源码高亮块（`file` / `lines` / `lang` / `label`） | 行区间切片见「代码块切片规范」 |

约定：

- 一个案例对应**一个展示页**即可；一个页面可放**多个** `<ShowcasePreviewPage>`（每种 UI 风格一个），各自手写标题/描述。
- 不用为每个 UI 变体单独建展示页/路由（参考 `app/pages/pages/picsum.vue`）。

## 3. 注册预览（页面案例必须有）

`app/pages/preview/[key].vue` 里：
1. 把案例加进 `previewMap`（用 `~~/cases/...` 路径）
2. 如果是整页 Demo（占满视口），把 key 加进 `FULL_PAGE_KEYS`

```ts
const FULL_PAGE_KEYS = [..., '<名字>']
const previewMap = {
  ...,
  '<名字>': defineAsyncComponent(() => import('~~/cases/pages/<名字>/<文件>.vue')),
}
```

## 4. 挂进导航与首页（可选但建议）

- 侧边导航/顶栏：`app/config/nav.ts` 加一项
- 首页宫格：`app/config/cards.ts` 加一张卡片（含描述与缩略图）

## 完成清单

- [ ] `cases/{components|pages}/<名字>/` 目录已建（含 hook / 一个或多个 UI 变体文件）
- [ ] `app/pages/.../<名字>.vue` 展示页已建，`useHead` 设置标题
- [ ] 页面案例已注册 `preview/[key].vue`（含 FULL_PAGE_KEYS）
- [ ] 代码块切片区间符合「括号成对」规范（见下）
- [ ] `nav.ts` / `cards.ts` 已挂入口
- [ ] `yarn build` 通过

## 5. 代码块切片规范（重点）

切片由 `:lines="[起始, 结束]"` 控制，行号 1 起、**闭区间**。**必须保证首尾括号成对**：

- 若切片从结构开标签开始（`<script ...>`、`<template>`、`<style ...>`），**必须**同步截到对应的闭合标签（`</script>` 等），首尾括号都含。
  - ✅ `:lines="[1, 54]"`（含 `</script>`）
  - ❌ `:lines="[1, 33]"`（以 `<script>` 开头却没有 `</script>`）
- 若切片从标签内部的内容行开始（如 `const xxx = ...`、`async function ...`），则**不含**开标签，属于纯内容片段，结尾不必是闭合标签。理解上可以少写一些，但不要为了对齐而把开标签砍断。
  - 经验：`<script>` 单块想只取核心逻辑时，把起始行设为紧贴 `<script>` 之后的内容行，而不是 1。
- 同理适用于 `<template>`/`<style>`：不取结构开标签，就从内容行开始。
- 切片后的内容是否转成纯 TS/HTML：当切片不含 `<script>`/`<template>` 标签时，用 `lang="ts"` / `lang="html"` 指定，否则按扩展名走。
- 排版红线：**任何时候不允许出现「有 `<script>` 无 `</script>`」的断头代码块**。