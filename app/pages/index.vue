<script setup lang="ts">
import { cards } from '~/config/cards'

const query = ref('')

const searchResults = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return null
  return cards.filter(
    c => c.title.toLowerCase().includes(q) || (c.desc ?? '').toLowerCase().includes(q),
  )
})
</script>

<template>
  <div>
    <section class="mb-10">
      <h1 :class="searchResults ? 'text-2xl' : 'text-4xl'">我的组件库</h1>
      <p class="mt-3 max-w-2xl text-sm text-slate-400">自研组件、常用案例与整页 Demo，随时查阅与复制。</p>
      <div class="mt-5 flex max-w-xl items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 transition-colors focus-within:border-brand-400">
        <span class="i-lucide-search h-4 w-4 shrink-0 text-slate-500" />
        <input
          v-model="query"
          type="search"
          placeholder="搜索组件或页面…"
          class="h-11 w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
        />
      </div>
    </section>

    <template v-if="searchResults">
      <h2 class="mb-3 text-sm font-semibold text-slate-400">{{ searchResults.length }} 个结果</h2>
      <div v-if="searchResults.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="card in searchResults"
          :key="card.to"
          :to="card.to"
          class="card group overflow-hidden transition-colors hover:border-slate-700"
        >
          <ShowcaseThumb v-if="card.thumb" v-bind="card.thumb" />
          <div class="p-5">
            <p v-if="card.tag" class="text-xs text-slate-500">{{ card.tag }}</p>
            <h3 class="mt-1 font-semibold text-slate-100 group-hover:text-brand-400">{{ card.title }}</h3>
            <p v-if="card.desc" class="mt-1 line-clamp-2 text-sm text-slate-400">{{ card.desc }}</p>
          </div>
        </NuxtLink>
      </div>
      <p v-else class="py-10 text-center text-sm text-slate-500">没有匹配的结果</p>
    </template>

    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <NuxtLink
        v-for="card in cards"
        :key="card.to"
        :to="card.to"
        class="card group overflow-hidden transition-colors hover:border-slate-700"
      >
        <ShowcaseThumb v-if="card.thumb" v-bind="card.thumb" />
        <div class="p-5">
          <p v-if="card.tag" class="text-xs text-slate-500">{{ card.tag }}</p>
          <h3 class="mt-1 font-semibold text-slate-100 group-hover:text-brand-400">{{ card.title }}</h3>
          <p v-if="card.desc" class="mt-1 line-clamp-2 text-sm text-slate-400">{{ card.desc }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>