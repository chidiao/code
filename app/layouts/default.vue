<script setup lang="ts">
import { nav } from '~/config/nav'

const route = useRoute()

const active = computed(() => {
  if (route.path.startsWith('/pages')) return 'pages'
  if (route.path.startsWith('/components')) return 'components'
  if (route.path.startsWith('/templates')) return 'templates'
  return ''
})

const currentSection = computed(() => nav.find(s => s.key === active.value) ?? null)
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <header class="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div class="mx-auto flex h-14 max-w-screen-2xl items-center gap-6 px-4 sm:px-6">
        <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-white">
          <img src="/imgs/me.jpg" alt="MyCode" class="h-7 w-7 rounded-full object-cover ring-1 ring-white/10" />
          MyCode
        </NuxtLink>

        <div class="flex-1" />

        <nav class="hidden items-center gap-1 sm:flex">
          <NuxtLink
            v-for="section in nav"
            :key="section.key"
            :to="section.groups[0]?.items[0]?.to ?? '/'"
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm"
            :class="active === section.key ? 'bg-slate-800 font-medium text-white' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'"
          >
            <span :class="section.icon" class="text-[15px]" />
            {{ section.title }}
          </NuxtLink>
        </nav>
      </div>
    </header>

    <div class="mx-auto flex max-w-screen-2xl">
      <ShellSidebar v-if="currentSection" :section="currentSection" />
      <main class="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10" :class="currentSection ? 'lg:pl-80' : ''">
        <slot />
      </main>
    </div>
  </div>
</template>