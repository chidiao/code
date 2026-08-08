<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <section class="card overflow-hidden">
    <div v-if="title" class="border-b border-slate-800 px-4 py-2 text-xs font-medium text-slate-400">
      {{ title }}
    </div>
    <div class="bg-slate-950/40 p-4">
      <div class="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
        <slot />
      </div>
    </div>
  </section>
</template>