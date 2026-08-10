<script setup lang="ts">
import MyBtn from './index.vue'
import { useCopy } from './useCopy'

const props = withDefaults(defineProps<{
  text: string
  label?: string
  copied?: string
  variant?: 'border' | 'fill' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'pill' | 'rect'
}>(), {
  label: '复制',
  copied: '已复制',
  variant: 'border',
  size: 'md',
  shape: 'pill',
})

const { copied, copy } = useCopy(() => props.text)
</script>

<template>
  <MyBtn
    :variant="variant"
    :size="size"
    :shape="shape"
    @click="copy"
  >
    <span
      :class="copied ? 'i-lucide-check text-emerald-400' : 'i-lucide-copy'"
      class="h-4 w-4 shrink-0"
    />
    {{ copied ? props.copied : label }}
  </MyBtn>
</template>