<template>
  <aside class="w-64 relative">
    <div class="w-64 px-3 py-5 h-screen bg-zinc-800 fixed top-0 left-0">
      <UVerticalNavigation :links="links" :ui="ui" />
    </div>

    <div class="w-full"></div>
  </aside>
</template>

<script setup lang="ts">
import avatar from '@/assets/img/me.jpg'

const links = [
  {
    label: 'MyCode',
    avatar: {
      src: avatar
    },
    to: 'https://github.com/chidiao/code',
    target: '_blank'
  },
  {
    label: 'CSS',
    icon: 'i-heroicons-heart',
    to: '/css'
  },
  {
    label: 'UI',
    icon: 'i-heroicons-cube-transparent',
    to: '/ui'
  },
  {
    label: 'Swiper',
    icon: 'i-heroicons-code-bracket-square',
    to: '/swiper'
  },
  {
    label: 'GSAP',
    icon: 'i-heroicons-cake',
    to: '/gsap'
  },
  {
    label: 'Play',
    icon: 'i-heroicons-bug-ant',
    to: '/play'
  }
]

const ui = {
  base: 'gap-3',
  size: 'text-xs',
  padding: 'px-4 py-3',
  inactive: 'text-zinc-300 my-3',
  icon: {
    base: 'size-4',
    inactive: 'text-zinc-300'
  },
  avatar: {
    size: 'xs'
  }
}
</script>
