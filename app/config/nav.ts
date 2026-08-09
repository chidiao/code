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
          { title: '复制按钮', to: '/components/copy-button' },
        ],
      },
      {
        group: '选择',
        items: [
          { title: '分段选择器', to: '/components/segmented-control' },
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
]