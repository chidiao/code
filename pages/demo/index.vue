<template>
  <div>
    <NuxtLink v-for="i in demos" :to="`/demo${i.path}`">{{ i.title }}</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const demos = [{ name: 'codeRain', title: '代码雨', path: '/codeRain' }]
</script>
