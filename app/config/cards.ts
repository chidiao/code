/** 首页宫格卡片配置（与实际页面对应，含描述与缩略图） */

export interface CardThumb {
  mode?: 'iframe' | 'image' | 'svg'
  /** iframe 地址 / 图片 src */
  src?: string
  /** 内联 SVG 标记 */
  svg?: string
  alt?: string
  /** 宽高比类，默认 aspect-video */
  aspect?: string
  /** iframe 内层视口放大倍数 */
  zoom?: number
}

export interface Card {
  title: string
  to: string
  /** 分类标签，展示为「分组 · 分类」 */
  tag?: string
  desc?: string
  thumb?: CardThumb
}

export const cards: Card[] = [
  {
    title: '复制按钮',
    to: '/components/copy-button',
    tag: '组件 · 反馈',
    desc: 'Clipboard 一键复制按钮，三种形态三种尺寸',
    thumb: {
      mode: 'svg',
      aspect: 'aspect-[16/9]',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
        <rect width="320" height="180" fill="#020617"/>
        <rect x="96" y="74" width="128" height="38" rx="10" fill="#0ea5e9"/>
        <rect x="138" y="84" width="14" height="14" rx="2.5" stroke="#fff" stroke-width="1.8" fill="none"/>
        <rect x="144" y="90" width="14" height="14" rx="2.5" fill="#fff"/>
        <text x="166" y="99" fill="#fff" font-family="sans-serif" font-size="10" font-weight="600" text-anchor="middle">复制</text>
      </svg>`,
    },
  },
  {
    title: '分段选择器',
    to: '/components/segmented-control',
    tag: '组件 · 选择',
    desc: 'Pill 风格分段选择，v-model 双向绑定',
    thumb: {
      mode: 'svg',
      aspect: 'aspect-[16/9]',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
        <rect width="320" height="180" fill="#020617"/>
        <rect x="60" y="72" width="200" height="40" rx="20" fill="#1e293b"/>
        <rect x="72" y="81" width="56" height="22" rx="11" fill="#0ea5e9"/>
        <text x="100" y="96" fill="#fff" font-family="sans-serif" font-size="10" font-weight="600" text-anchor="middle">周</text>
        <text x="160" y="96" fill="#94a3b8" font-family="sans-serif" font-size="10" text-anchor="middle">月</text>
        <text x="220" y="96" fill="#94a3b8" font-family="sans-serif" font-size="10" text-anchor="middle">年</text>
      </svg>`,
    },
  },
  {
    title: '登录页',
    to: '/pages/login',
    tag: '页面 · 整页',
    desc: '深色渐变背景 + 毛玻璃登录卡片',
    thumb: {
      mode: 'iframe',
      src: '/preview/login',
      aspect: 'aspect-[16/9]',
      zoom: 2.2,
    },
  },
  {
    title: '刮刮卡',
    to: '/pages/scratch-card',
    tag: '页面 · 整页',
    desc: 'Canvas 刮涂层抽奖整页 Demo',
    thumb: {
      mode: 'iframe',
      src: '/preview/scratch-card',
      aspect: 'aspect-[16/9]',
      zoom: 2.2,
    },
  },
  {
    title: '代码雨',
    to: '/pages/code-rain',
    tag: '页面 · 整页',
    desc: 'Canvas 字符雨整页 Demo',
    thumb: {
      mode: 'iframe',
      src: '/preview/code-rain',
      aspect: 'aspect-[16/9]',
      zoom: 2.2,
    },
  },
  {
    title: 'Swiper 滑动',
    to: '/pages/swiper',
    tag: '页面 · 案例',
    desc: 'Swiper 14 轮播：基础 / 导航 / 页码',
    thumb: {
      mode: 'svg',
      aspect: 'aspect-[16/9]',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
        <rect width="320" height="180" fill="#020617"/>
        <rect x="60" y="52" width="200" height="76" rx="12" fill="url(#g)"/>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#0ea5e9"/>
            <stop offset="1" stop-color="#6366f1"/>
          </linearGradient>
        </defs>
        <text x="160" y="95" fill="#fff" font-family="sans-serif" font-size="26" font-weight="700" text-anchor="middle">1</text>
        <path d="M88 90h144" stroke="#fff" stroke-width="2" opacity=".35"/>
        <path d="m106 82 -12 8 12 8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="m214 82 12 8 -12 8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="110" y="146" width="16" height="5" rx="2.5" fill="#0ea5e9"/>
        <rect x="150" y="146" width="16" height="5" rx="2.5" fill="#334155"/>
        <rect x="190" y="146" width="16" height="5" rx="2.5" fill="#334155"/>
      </svg>`,
    },
  },
]