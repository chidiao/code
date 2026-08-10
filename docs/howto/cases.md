# 案例（Case）创建总入口

> 本文是 MyCode 新增**任何案例**（组件案例 / 页面案例 / 模板案例）的**总入口**，只收录三类共用的约束与流程。
> 按类型再读对应文档：
>
> | 类型 | 文档 |
> | --- | --- |
> | 组件案例 | [docs/howto/create-component.md](./create-component.md) |
> | 页面案例 | [docs/howto/create-page.md](./create-page.md) |
> | 模板案例 | [docs/howto/create-template.md](./create-template.md) |

**给 AI 的用法**：命令它创建某个类型的案例时，先让它**读本入口**（这里的公共约束），**再读对应类型文档**（类型专属约束）。例如「创建 page 案例」→ 读 `cases.md` + `create-page.md`。

## 0. 先决

- 动手前先读 [docs/ui-style.md](../ui-style.md)：设计风格、色彩体系、字体/间距/圆角、按钮与卡片 `shortcut`。案例本体与展示页都要遵守。
- 技术栈固定：Nuxt 4（SPA, `ssr: false`）+ UnoCSS（preset-wind4）+ lucide 图标 + Shiki 高亮。**不引入任何 UI 组件框架**，样式全部走 UnoCSS 工具类。

## 1. 三种类型怎么选

| 类型 | 放什么 | 案例目录 | 展示页 / 路由 | 类型文档 |
| --- | --- | --- | --- | --- |
| 组件案例 | 可复用组件（含逻辑、props、v-model） | `cases/components/<名字>/` | `app/pages/components/<名字>.vue` → `/components/<名字>` | [create-component](./create-component.md) |
| 页面案例 | 整页/大块页面 Demo（含 hook 与多种 UI 变体） | `cases/pages/<名字>/` | `app/pages/pages/<名字>.vue` → `/pages/<名字>` | [create-page](./create-page.md) |
| 模板案例 | 可直接复制的区块模板（纯 UI 为主） | `cases/templates/<名字>/` | `app/pages/templates/<名字>.vue` → `/templates/<名字>` | [create-template](./create-template.md) |

择型建议：
- 需要 `props` / `emit` / `v-model`、供多处复用的 → **组件**（如 mybtn、segmented-control）。
- 整页沉浸效果、独占视口、或同源逻辑的多 UI 变体 → **页面**（如 login、code-rain、picsum 的 grid/tiles）。
- 一段「复制到任何项目即可用」的静态/半静态区块 → **模板**（如 pricing）。
- 组件可以被页面案例 import 组合（swiper 系列组件被 `/pages/swiper` 复用）。

## 2. 目录与命名公共约定

- 案例源码统一放项目根 `cases/`（不属于 `app/` srcDir，不会被 Nuxt 当路由自动生成，作为「待展示源码 + 可复用组件」存在）。
- 名字统一 `kebab-case`。
- **一个案例一个文件夹**；入口**不强制叫 `index.vue`**，可按需拆多个文件一起管理。
- 一个案例的「逻辑 hook + 多个 UI 变体」**放同一个文件夹**（推荐），不必拆成多个独立案例（参考 `cases/pages/picsum/` 下的 `usePicsum.ts` / `grid.vue` / `tiles.vue`）。只有维护上明显该独立的（如 swiper 各模块）才拆独立文件夹。
- 案例文件一律 `<script setup lang="ts">`，风格与 `app/` 内一致。

别名约定：

```ts
// 同目录内（如均位于 cases/pages/picsum/）
import { usePicsum } from './usePicsum'

// 跨目录（展示页在 app/ 下）
import PicsumGrid from '~~/cases/pages/picsum/grid.vue'
```

## 3. 展示层公共约定

- 展示页放 `app/pages/`，本质是 **tailwind + 普通 DOM 排版**，需要时插入 showcase 组件。
- 标题、描述**一律用 DOM 手写**；案例组件不携带展示页的字面内容。
- `useHead({ title: '案例名 · Code' })`。
- **一个案例对应一个展示页**；一个页面可放**多个** `<ShowcasePreviewPage>`（每种 UI 风格一个），各自手写标题/描述。
- 不为每个 UI 变体单独建展示页/路由。

Showcase 组件职责：

| 组件 | 职责 | 说明 |
| --- | --- | --- |
| `<ShowcasePage>` | 纯纵向排版容器（`space-y-8`） | 不接收 title / description |
| `<ShowcasePreview>` | 内嵌小 Demo 的小卡片，可带 `title` 工具条 | 组件级局部展示用 |
| `<ShowcasePreviewPage>` | 整页预览窗框（浏览器窗口样式 + 地址栏 + GitHub / 新窗口按钮） | **不接收 `title`**，地址栏显示 `url`；标题/描述由页面自己写 |
| `<ShowcaseCode>` | 源码高亮块（`file` / `lines` / `lang` / `label`） | 行区间切片见「代码块切片规范」 |

## 4. 代码块切片规范（重点）

切片由 `:lines="[起始, 结束]"` 控制，行号 1 起、**闭区间**。**必须保证首尾括号成对**：

- 若切片从结构开标签开始（`<script ...>`、`<template>`、`<style ...>`），**必须**同步截到对应的闭合标签（`</script>` 等），首尾括号都含。
  - ✅ `:lines="[1, 54]"`（含 `</script>`）
  - ❌ `:lines="[1, 33]"`（以 `<script>` 开头却没有 `</script>`）
- 若切片从标签内部的内容行开始（如 `const xxx = ...`、`async function ...`），则**不含**开标签，属于纯内容片段，结尾不必是闭合标签。理解上可以少写一些，但不要为了对齐而把开标签砍断。
  - 经验：`<script>` 单块想只取核心逻辑时，把起始行设为紧贴 `<script>` 之后的内容行，而不是 1。
- 同理适用于 `<template>`/`<style>`：不取结构开标签，就从内容行开始。
- 切片后的内容是否转成纯 TS/HTML：当切片不含 `<script>`/`<template>` 标签时，用 `lang="ts"` / `lang="html"` 指定，否则按扩展名走。
- 排版红线：**任何时候不允许出现「有 `<script>` 无 `</script>`」的断头代码块**。

## 5. 挂进导航与首页（可选但建议）

- 侧边导航：`app/config/nav.ts` 在对应 section（`components` / `pages` / `templates`）的分组下加一项。
- 首页宫格：`app/config/cards.ts` 加一张卡片（含 `tag` 描述与缩略图）。缩略图三种模式（`ShowcaseThumb`）：iframe 预览（整页类，`/preview/<名字>` + `zoom`）、内联 SVG（组件类）、图片。区块/整页类优先 iframe。

## 6. 完成清单（公共部分）

- [ ] `useHead` 设置标题（`… · Code`）
- [ ] 已在 `preview/[key].vue` 注册预览
- [ ] 代码块切片首尾括号成对，无断头块
- [ ] 已挂 `nav.ts` / `cards.ts`（可选）
- [ ] `yarn build` 通过

类型专属的额外约束与清单，见对应类型文档（第 1 节表格）。

## 7. 从入口到交付的完整流程

1. 读本入口（公共约束）+ 对应类型文档。
2. 建 `cases/<类型>/<名字>/` 源码（hook / 变体）。
3. 建展示页并组装 showcase 组件。
4. 注册 `preview/[key].vue`。
5. 挂 `nav.ts` / `cards.ts`。
6. `yarn build` 验证。