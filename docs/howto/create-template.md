# 创建模板案例（Template）

> 适用：在 MyCode 里新增一个**模板案例** —— 一段「复制到任何项目即可用」的区块模板（纯 UI 为主）。
> 前置：先读 [cases.md](./cases.md)（公共约束），本文只写模板类型专属约束。
> 参考实现：`cases/templates/pricing/`。

## 1. 什么是模板案例

特征：
- 一个自包含的区块（如定价、Hero、表单、Dashboard 局部），不强调可复用协议
- 以**可复制性**为最高目标：尽量少的运行时依赖，数据用静态数组/常量，交互点到为止
- 展示时以 `<ShowcasePreviewPage>` 居中方框 + `<ShowcaseCode>`（完整源码）

不属于模板案例：有复杂 props/state 的可复用组件 → [create-component](./create-component.md)；整页 Demo → [create-page](./create-page.md)。

## 2. 目录与文件

| 项 | 约定 |
| --- | --- |
| 源码目录 | `cases/templates/<名字>/` |
| 入口文件 | `index.vue` |
| 展示页 | `app/pages/templates/<名字>.vue` |
| 路由 | `/templates/<名字>` |

## 3. 模板本体写法

- 自包含区块：外层定宽（如 `max-w-*`），需要时垫个背景，**不强求 `min-h-screen`**（那是页面案例的事）。
- 数据静态：接口/数组常量写在 `<script setup>` 里（参考 pricing 的 `plans: Plan[]`）。
- 若要「复制即用」：优先写**纯工具类**。`btn-solid` / `btn-outline` / `card` 等站内 shortcut 干净简洁但依赖本项目 `uno.config.ts`；目标是非本项目复用的，应展开成完整类（pricing 在站内使用了 shortcut）。
- 图标用 `i-lucide-*`（如 `i-lucide-check`）；若外部复用需换对应生态图标。
- 样式遵循 `ui-style.md`。

## 4. 建展示页

`app/pages/templates/<名字>.vue`：

```vue
<script setup lang="ts">
import Template from '~~/cases/templates/<名字>/index.vue'

useHead({ title: '<模板名> · Code' })
</script>

<template>
  <ShowcasePage>
    <header class="space-y-2">
      <h1 class="text-2xl font-semibold text-slate-100"><模板名></h1>
      <p class="max-w-2xl text-sm leading-relaxed text-slate-400">一句话说明（强调可复制性）。</p>
    </header>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold text-slate-200">效果预览</h2>
        <p class="mt-1 max-w-2xl text-sm text-slate-400">区块居中展示，支持全屏预览 / 查看源码。</p>
      </div>
      <ShowcasePreviewPage url="/templates/<名字>" open="/preview/<名字>" github="cases/templates/<名字>/index.vue">
        <div class="flex justify-center p-8">
          <Template />
        </div>
      </ShowcasePreviewPage>
    </div>

    <ShowcaseCode file="templates/<名字>/index.vue" label="完整源码" />
  </ShowcasePage>
</template>
```

要点：
- 窗框内用 `flex justify-center p-8` 让区块居中，不铺满。
- `<ShowcaseCode>` 展示**完整源码**（模板的卖点就是可复制）。

## 5. 注册预览

`app/pages/preview/[key].vue` 加一行：

```ts
'<名字>': defineAsyncComponent(() => import('~~/cases/templates/<名字>/index.vue')),
```

模板一般**不进** `FULL_PAGE_KEYS`（区块居中展示即可）。

## 6. 挂导航与首页（可选但建议）

- `app/config/nav.ts`：`templates` 分组加一项。
- `app/config/cards.ts`：加卡片，缩略图用 iframe 预览（`/preview/<名字>`，区块类 `zoom` 可小一些，如 1.4）或内联 SVG。

## 7. 完成清单

- [ ] `cases/templates/<名字>/` 已建（`index.vue`）
- [ ] `app/pages/templates/<名字>.vue` 已建，`useHead` 设标题
- [ ] 已注册 `preview/[key].vue`（不进 FULL_PAGE_KEYS）
- [ ] 代码块切片符合「括号成对」规范
- [ ] `nav.ts` / `cards.ts` 已挂入口（可选）
- [ ] `yarn build` 通过