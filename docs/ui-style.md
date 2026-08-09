# UI 设计风格（MyCode）

> 本文描述 MyCode（组件/案例展示站）当前的 UI 设计风格与实现约定，作为新增页面、组件、案例时保持一致性的依据。
> 技术栈：Nuxt 4（SPA, `ssr: false`）+ UnoCSS（preset-wind4）+ lucide 图标 + Shiki 代码高亮。**不引入任何 UI 组件框架**，全部样式走 UnoCSS 工具类。

## 1. 设计基调：深色沉浸

- 全局只做**深色主题**，不做亮色切换。底色基于 Slate，配合单一品牌强调色 Sky。
- 氛围关键词：黑底、细腻描边、低饱和中性灰、克制的品牌色点缀、毛玻璃负栏。
- 背景基色 `slate-950`（`#020617`），正文 `slate-100`，次要文字 `slate-400/500`，描边 `slate-800`。

## 2. 色彩体系

### 2.1 品牌色 brand（青蓝 Sky）
定义于 `uno.config.ts` 的 `theme.colors.brand`，本体是 sky 色标：

| Token | 值 | 用途 |
| --- | --- | --- |
| `brand`（DEFAULT）/`400` | `#38bdf8` | 强调（hover、焦点、高亮） |
| `brand-500` | `#0ea5e9` | 主操作按钮底色 |
| `brand-600` | `#0284c7` | 按钮按下态 |
| `brand-...50~900` | sky 全谱 | 渐变、浅底等 |

用法：不直接用 `sky-*`，一律用 `brand-*`，换主题只需改 `uno.config.ts`。

### 2.2 中性色（Slate）
| 语义 | 类 | 值 |
| --- | --- | --- |
| 页面背景 | `bg-slate-950` | `#020617` |
| 卡片表面 | `bg-slate-900` | `#0f172a` |
| 悬浮层/输入 | `bg-slate-800` | `#1e293b` |
| 描边 | `border-slate-800` | `rgba(51,65,85)` |
| 主文字 | `text-slate-100` | `#f1f5f9` |
| 次级文字 | `text-slate-400` | `#94a3b8` |
| 弱提示 | `text-slate-500` | `#64748b` |
| 成功反馈 | `text-emerald-500` | `#10b981`（复制成功类提示） |
| 危险 | `rose-300/800` | 错误提示用 |

### 2.3 半透明层
- 毛玻璃窗：`bg-slate-950/90 backdrop-blur`（顶栏）
- 侧栏：`bg-slate-950/80`
- 预览衬底：`bg-slate-950/40`
- hover 覆盖层：`bg-slate-950/70`

## 3. 字体与排版

- 无自定义 web font。正文：系统默认栈；代码块：等宽 `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`。
- 字号节奏（Tailwind 体系）：
  - 首页 Hero 标题 `text-4xl`，页面标题 `text-2xl font-semibold text-slate-100`
  - 区块标题 `text-xl font-bold`；卡片标题 `font-semibold`
  - 正文 `text-sm`（`slate-400` 或 `slate-300`）
  - 辅助标签/导航 `text-xs~13px`（`slate-400/500`）
- 字重：标题 `font-semibold/700`，正文默认；中文 locale `zh-CN`。

## 4. 形状与间距

- 圆角体系：
  - `rounded-md`：小元素（搜索框、小图标按钮、侧栏项不）
  - `rounded-lg`：按钮、输入框
  - `rounded-xl`：卡片（`card`）、预览面板
  - `rounded-full`：头像、胶囊
- 间距遵循 4px 步进：`gap-1.5/2/3/4`，分区 `space-y-6`，页面左右 `px-4 sm:px-6 lg:px-10`。
- 页面内容域宽 `max-w-screen-2xl`，主容器居中 `mx-auto`；侧边栏存在时 `lg:pl-80`。

## 5. 元件规范（基于 `uno.config.ts` shortcuts）

在 `uno.config.ts` 的 `shortcuts` 中预置了四个通用类，全站统一：

### 5.1 按钮
| 类 | 场景 | 外观 |
| --- | --- | --- |
| `btn-solid` | 主操作 | `bg-brand-500 text-white`，hover `brand-400`，active `brand-600`，`rounded-lg`，disabled 降透明 |
| `btn-outline` | 次操作 | 描边 `border-slate-700` + `bg-slate-900`，hover 提亮 |
| `btn-ghost` | 弱操作/图标 | 无底、`text-slate-300`，hover 灰底白字 |

所有按钮：`inline-flex items-center justify-center gap-1 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none`。尺寸通过外层类控制（如 `px-3.5 py-1.5 text-sm`）。

### 5.2 卡片 `card`
`rounded-xl border border-slate-800 bg-slate-900`。卡片可加 `overflow-hidden`，内容区用 `p-4/p-5`；带标题栏的卡片用 `border-b border-slate-800 px-4 py-2` 分隔。

### 5.3 输入框
搜索框样式：`rounded-xl border border-slate-800 bg-slate-900 px-3` + `focus-within:border-brand-400` + `bg-transparent` 内部 input，图标 `text-slate-500`。

### 5.4 导航高亮
- 顶栏吸顶：`sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur`，高 `h-14`
- 侧栏项：激活态 `bg-slate-800 text-white ring-1 ring-slate-700 ring-inset shadow-sm`；未激活 `text-slate-400 hover:bg-slate-800/50 hover:text-slate-200`
- 分组标题：`text-[13px] font-semibold text-slate-500`

### 5.5 代码块（Shiki, one-dark-pro）
- 工具条：`bg-[#282c34]` 底、`text-xs text-slate-300`，右侧「复制/已复制」按钮
- 代码区：`bg-[#282c34]`，行号 `#4b5263`，行宽自适应滚动 `overflow-auto`

### 5.6 滚动条（`app/assets/css/main.css`）
- 轨  `#020617`，滑块 `#334155`（hover `#475569`），圆角 5px

### 5.7 预览面板（ShowcasePreviewPage）
类浏览器窗框：左上三色圆点（`#ff5f57/#febc2e/#28c840`），中间地址栏 `bg-slate-800/80`，右侧 GitHub / 外链图标按钮。演示内容衬底 `bg-slate-950/40`。

## 6. 图标约定

- 用 UnoCSS 图标：`i-lucide-*`（lucide），随预设自动加载，尺寸 `h-4 w-4` / `text-sm`。
- 不用裸 SVG 作为常规图标位（GitHub 水印等少数场合除外）。

## 7. 写法约束

1. 样式**全部写工具类**（UnoCSS），不写 `<style>` 块（个别深 `:deep` 覆盖除外，如 swiper、滚动条）。
2. 颜色**禁用魔数**：除品牌外的组件尽量用 slate `800/700/…`、brand 系；需要新语义色时先考虑加入 `uno.config.ts`。
3. 名称遵循 `showcase*`：展示页统一用 `ShowcasePage / ShowcasePreview / ShowcasePreviewPage / ShowcaseCode` 拼装。
4. 交互反馈：按钮 hover 用 `transition-colors`；复制等操作要有正反馈（图标切换 + 文案）。
5. 全站只有一个深色主题，不给 `class="dark"` 双份实现。
6. 保持移动端可用：卡片/网格 `grid-cols-1 → sm:` 步进。