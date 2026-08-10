<script setup lang="ts">
interface Plan {
  name: string
  desc: string
  price: number
  features: string[]
  highlight: boolean
}

const plans: Plan[] = [
  {
    name: '基础',
    desc: '个人项目起步',
    price: 0,
    features: ['最多 3 个项目', '基础统计报表', '社区支持'],
    highlight: false,
  },
  {
    name: '专业',
    desc: '小团队协作',
    price: 49,
    features: ['无限项目', '深度数据分析', '优先技术支持'],
    highlight: true,
  },
  {
    name: '企业',
    desc: '规模化应用',
    price: 199,
    features: ['无限项目 + 专人对接', 'SSO 登录与审计', '专属客户成功'],
    highlight: false,
  },
]
</script>

<template>
  <div class="w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-950 px-6 py-12 sm:px-10">
    <div class="mx-auto max-w-xl text-center">
      <p class="text-xs font-semibold uppercase tracking-widest text-brand-400">定价</p>
      <h1 class="mt-3 text-3xl font-bold text-white">为你的团队选择方案</h1>
      <p class="mt-3 text-sm text-slate-400">
        按需选择，随时升级或降级，所有套餐均含 14 天免费试用。
      </p>
    </div>

    <div class="mt-12 grid items-start gap-6 md:grid-cols-3">
      <div
        v-for="plan in plans"
        :key="plan.name"
        class="relative flex flex-col rounded-2xl border p-7"
        :class="
          plan.highlight
            ? 'border-brand-500/60 bg-slate-900 shadow-lg shadow-brand-900/30'
            : 'border-slate-800 bg-slate-900'
        "
      >
        <span
          v-if="plan.highlight"
          class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold whitespace-nowrap text-white"
        >
          最受欢迎
        </span>

        <h2 class="font-semibold text-slate-100">{{ plan.name }}</h2>
        <p class="mt-1 text-sm text-slate-400">{{ plan.desc }}</p>

        <p class="mt-6">
          <span class="text-4xl font-bold text-white">¥{{ plan.price }}</span>
          <span class="text-sm text-slate-500">/月</span>
        </p>

        <ul class="mt-7 space-y-3 text-sm text-slate-300">
          <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2.5">
            <span class="i-lucide-check h-4 w-4 shrink-0 text-brand-400" />
            {{ feature }}
          </li>
        </ul>

        <button
          type="button"
          class="mt-8 w-full py-2.5"
          :class="plan.highlight ? 'btn-solid' : 'btn-outline'"
        >
          选择{{ plan.name }}
        </button>
      </div>
    </div>
  </div>
</template>