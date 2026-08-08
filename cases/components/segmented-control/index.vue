<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    options: string[]
    modelValue: string
    disabled?: boolean
  }>(),
  { disabled: false },
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div class="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
    <button
      v-for="option in options"
      :key="option"
      type="button"
      :disabled="disabled"
      class="rounded-full px-3.5 py-1 text-sm transition-all disabled:opacity-50"
      :class="
        option === props.modelValue
          ? 'bg-slate-900 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-100'
      "
      @click="emit('update:modelValue', option)"
    >
      {{ option }}
    </button>
  </div>
</template>