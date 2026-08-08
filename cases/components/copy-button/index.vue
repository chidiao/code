<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  label?: string
  copied?: string
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  label: '复制',
  copied: '已复制',
  variant: 'solid',
  size: 'md',
})

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function onCopy() {
  try {
    await navigator.clipboard.writeText(props.text)
  } catch {
    const input = document.createElement('textarea')
    input.value = props.text
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 1600)
}

const variantClass = {
  solid: 'btn-solid',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
}

const sizeClass = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}
</script>

<template>
  <button
    type="button"
    class="inline-flex"
    :class="[variantClass[variant], sizeClass[size]]"
    @click="onCopy"
  >
    <svg
      v-if="copied"
      class="h-4 w-4 shrink-0 text-emerald-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
    <svg
      v-else
      class="h-4 w-4 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
      />
    </svg>
    {{ copied ? props.copied : label }}
  </button>
</template>