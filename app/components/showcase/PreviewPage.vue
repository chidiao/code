<script setup lang="ts">
import { githubUrl } from '~/config/site'

defineProps<{ url?: string; open?: string; github?: string }>()
</script>

<template>
  <section class="card overflow-hidden">
    <div class="flex items-center gap-3 border-b border-slate-800 bg-slate-950/60 px-4 py-2.5">
      <div class="flex items-center gap-1.5">
        <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span class="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span class="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div class="flex flex-1 items-center gap-2 rounded-md bg-slate-800/80 px-3 py-1">
        <svg class="h-3.5 w-3.5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3 7.5 7.03 7.5 12 9.515 21 12 21Zm0 0h9" />
        </svg>
        <span class="truncate text-xs text-slate-400">{{ url ?? 'localhost' }}</span>
      </div>
      <a
        v-if="github"
        :href="githubUrl(github)"
        target="_blank"
        rel="noopener"
        title="在 GitHub 查看源码"
        :aria-label="`GitHub: ${github}`"
        class="grid h-6 w-6 shrink-0 place-items-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
      >
        <svg viewBox="0 0 16 16" class="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
        </svg>
      </a>
      <a
        v-if="open"
        :href="open"
        target="_blank"
        rel="noopener"
        title="在新窗口打开"
        :aria-label="`在新窗口打开 ${url ?? ''}`"
        class="grid h-6 w-6 shrink-0 place-items-center rounded-md text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
      >
        <span class="i-lucide-external-link text-sm" />
      </a>
    </div>
    <div class="bg-slate-950/40 p-0">
      <slot />
    </div>
  </section>
</template>