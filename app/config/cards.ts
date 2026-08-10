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
    title: '渐变按钮',
    to: '/components/mybtn',
    tag: '组件 · 反馈',
    desc: '渐变描边圆角按钮，props 驱动风格尺寸，复制逻辑 useCopy 解耦',
    thumb: {
      mode: 'svg',
      aspect: 'aspect-[16/9]',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
        <rect width="320" height="180" fill="#020617"/>
        <defs>
          <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#38bdf8"/>
            <stop offset="1" stop-color="#c084fc"/>
          </linearGradient>
        </defs>
        <rect x="82" y="68" width="156" height="44" rx="22" fill="#0f172a" stroke="url(#mg)" stroke-width="2"/>
        <rect x="108" y="80" width="13" height="13" rx="3" stroke="#e2e8f0" stroke-width="1.5" fill="none"/>
        <rect x="113" y="85" width="13" height="13" rx="3" fill="#e2e8f0"/>
        <text x="148" y="96" fill="#f1f5f9" font-family="sans-serif" font-size="11" text-anchor="middle">复制</text>
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
    title: '光泽泡泡',
    to: '/components/bubble',
    tag: '组件 · 装饰',
    desc: '纯 CSS 光泽球体：inset 阴影 + 伪元素高光，颜色尺寸可配',
    thumb: {
      mode: 'svg',
      aspect: 'aspect-[16/9]',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
        <rect width="320" height="180" fill="#0b1120"/>
        <defs>
          <radialGradient id="b0" cx=".35" cy=".3" r=".9"><stop offset=".2" stop-color="#cfe0ff"/><stop offset="1" stop-color="#5f85c9"/></radialGradient>
          <radialGradient id="b1" cx=".35" cy=".3" r=".9"><stop offset=".2" stop-color="#ffeab0"/><stop offset="1" stop-color="#c2ab62"/></radialGradient>
          <radialGradient id="b2" cx=".35" cy=".3" r=".9"><stop offset=".2" stop-color="#c9a3ff"/><stop offset="1" stop-color="#6c1fb5"/></radialGradient>
          <radialGradient id="b3" cx=".35" cy=".3" r=".9"><stop offset=".2" stop-color="#ff8e9c"/><stop offset="1" stop-color="#940115"/></radialGradient>
          <radialGradient id="b4" cx=".35" cy=".3" r=".9"><stop offset=".2" stop-color="#fffb9e"/><stop offset="1" stop-color="#c0b214"/></radialGradient>
          <radialGradient id="b5" cx=".35" cy=".3" r=".9"><stop offset=".2" stop-color="#c3ffef"/><stop offset="1" stop-color="#2f9c82"/></radialGradient>
          <radialGradient id="b6" cx=".35" cy=".3" r=".9"><stop offset=".2" stop-color="#b9bec9"/><stop offset="1" stop-color="#2f3138"/></radialGradient>
        </defs>
        <g fill="none" stroke="#bfe9ff" stroke-opacity=".55" stroke-width="2.4" stroke-linecap="round" transform="rotate(-45)">
          <ellipse cx="47" cy="70" rx="8" ry="4.2"/>
          <ellipse cx="88" cy="70" rx="8" ry="4.2"/>
          <ellipse cx="130" cy="70" rx="8" ry="4.2"/>
          <ellipse cx="172" cy="70" rx="8" ry="4.2"/>
          <ellipse cx="214" cy="70" rx="8" ry="4.2"/>
          <ellipse cx="256" cy="70" rx="8" ry="4.2"/>
          <ellipse cx="298" cy="70" rx="8" ry="4.2"/>
        </g>
        <circle cx="47" cy="90" r="22" fill="url(#b0)"/>
        <circle cx="88" cy="90" r="22" fill="url(#b1)"/>
        <circle cx="130" cy="90" r="22" fill="url(#b2)"/>
        <circle cx="172" cy="90" r="22" fill="url(#b3)"/>
        <circle cx="214" cy="90" r="22" fill="url(#b4)"/>
        <circle cx="256" cy="90" r="22" fill="url(#b5)"/>
        <circle cx="298" cy="90" r="22" fill="url(#b6)"/>
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
      src: '/preview/login?thumb=1',
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
      mode: 'image',
      src: '/thumbs/pages/scratch-card.webp',
      aspect: 'aspect-[16/9]',
    },
  },
  {
    title: '代码雨',
    to: '/pages/code-rain',
    tag: '页面 · 整页',
    desc: 'Canvas 字符雨整页 Demo',
    thumb: {
      mode: 'iframe',
      src: '/preview/code-rain?thumb=1',
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
  {
    title: 'Picsum 占位图',
    to: '/pages/picsum',
    tag: '页面 · 案例',
    desc: 'Lorem Picsum 接口随机拉图，Grid 点击复制 URL',
    thumb: {
      mode: 'iframe',
      src: '/preview/picsum?thumb=1',
      aspect: 'aspect-[16/9]',
      zoom: 2.2,
    },
  },
  {
    title: 'Picsum 平铺',
    to: '/pages/picsum',
    tag: '页面 · 案例',
    desc: '同款 Hook 的平铺 UI：无间距无圆角，点图复制 URL',
    thumb: {
      mode: 'iframe',
      src: '/preview/picsum-tiles?thumb=1',
      aspect: 'aspect-[16/9]',
      zoom: 2.2,
    },
  },
  {
    title: '定价方案',
    to: '/templates/pricing',
    tag: '模板 · 区块',
    desc: '纯 Tailwind 三列定价区块，中间高亮「最受欢迎」',
    thumb: {
      mode: 'iframe',
      src: '/preview/pricing?thumb=1',
      aspect: 'aspect-[16/9]',
      zoom: 1.4,
    },
  },
]