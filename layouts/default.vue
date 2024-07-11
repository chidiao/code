<template>
  <div>
    <div
      class="h-screen bg-gray-500 fixed left-0 top-0 overflow-hidden transition-all duration-300"
      :class="[isShow ? 'w-64' : 'w-0']"
    ></div>

    <div class="transition-all duration-300" :class="[isShow ? 'ml-64' : 'ml-0']">
      <slot></slot>
    </div>

    <div class="fixed bottom-4 left-4 z-50">
      <UButton class="dark" @click="toggle">Menu</UButton>
    </div>
  </div>
</template>

<script setup>
const isShow = ref(false)
const toggle = () => {
  isShow.value = !isShow.value
}
</script>
