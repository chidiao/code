<script setup lang="ts">
import ScratchCard from '~~/cases/components/scratch-card/index.vue'
</script>

<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">
    <div class="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />
    <div class="pointer-events-none absolute -right-28 -bottom-28 h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-3xl" />
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_55%)]" />

    <div class="relative flex flex-col items-center gap-6">
      <h1 class="text-2xl font-bold tracking-wide text-slate-100">幸运刮刮卡</h1>
      <p class="text-sm text-slate-400">刮开涂层，看看今天的好运</p>
      <ScratchCard />
    </div>
  </div>
</template>