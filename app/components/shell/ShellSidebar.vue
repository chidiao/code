<script setup lang="ts">
import type { MenuSection } from '~/config/nav'

defineProps<{ section: MenuSection }>()

const route = useRoute()

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <aside
    class="fixed top-14 bottom-0 left-0 z-20 hidden w-64 flex-col overflow-y-auto border-r border-slate-800 bg-slate-950/80 px-3 py-5 lg:flex print:hidden"
  >
    <div v-for="group in section.groups" :key="group.group" class="mb-6">
      <p class="mb-1.5 px-2 text-[13px] font-semibold text-slate-500">{{ group.group }}</p>
      <ul class="space-y-0.5">
        <li v-for="item in group.items" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="group relative block rounded-md px-2 py-1.5 text-[13px] leading-5 transition-colors"
            :class="
              isActive(item.to)
                ? 'bg-slate-800 font-medium text-white shadow-sm ring-1 ring-slate-700 ring-inset'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            "
          >
            {{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>