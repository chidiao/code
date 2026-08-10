/** 顶栏 + 侧边栏导航结构（侧边栏按分组展示） */

export interface MenuItem {
  title: string
  to: string
}

export interface MenuGroup {
  group: string
  items: MenuItem[]
}

export interface MenuSection {
  key: string
  title: string
  icon: string
  groups: MenuGroup[]
}

export const nav: MenuSection[] = [
  {
    key: 'components',
    title: '组件',
    icon: 'i-lucide-blocks',
    groups: [
      {
        group: '反馈',
        items: [
          { title: '渐变按钮', to: '/components/mybtn' },
        ],
      },
      {
        group: '选择',
        items: [
          { title: '分段选择器', to: '/components/segmented-control' },
        ],
      },
      {
        group: '装饰',
        items: [
          { title: '光泽泡泡', to: '/components/bubble' },
        ],
      },
    ],
  },
  {
    key: 'pages',
    title: '页面',
    icon: 'i-lucide-panels-top-left',
    groups: [
      {
        group: '整页',
        items: [
          { title: '登录页', to: '/pages/login' },
          { title: '刮刮卡', to: '/pages/scratch-card' },
          { title: '代码雨', to: '/pages/code-rain' },
        ],
      },
      {
        group: '案例',
        items: [
          { title: 'Swiper 滑动', to: '/pages/swiper' },
          { title: 'Picsum 占位图', to: '/pages/picsum' },
        ],
      },
    ],
  },
  {
    key: 'templates',
    title: '模板',
    icon: 'i-lucide-layout-template',
    groups: [
      {
        group: '区块',
        items: [
          { title: '定价方案', to: '/templates/pricing' },
        ],
      },
    ],
  },
]