<script setup lang="ts">
defineProps<{ title?: string; description?: string }>()
</script>

<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-100">{{ title }}</h1>
    <p v-if="description" class="mt-2 max-w-2xl text-sm text-slate-400">{{ description }}</p>
    <div class="mt-6 space-y-6">
      <slot />
    </div>
  </div>
</template>