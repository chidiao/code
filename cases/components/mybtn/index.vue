<script setup lang="ts">
withDefaults(defineProps<{
  /** 风格：border=渐变描边 / fill=渐变填充 / ghost=幽灵 */
  variant?: 'border' | 'fill' | 'ghost'
  /** 尺寸：sm / md / lg */
  size?: 'sm' | 'md' | 'lg'
  /** 形状：pill=胶囊圆角 / rect=直角圆角 */
  shape?: 'pill' | 'rect'
  disabled?: boolean
  block?: boolean
}>(), {
  variant: 'border',
  size: 'md',
  shape: 'pill',
  disabled: false,
  block: false,
})

const variantClass = { border: 'mybtn--border', fill: 'mybtn--fill', ghost: 'mybtn--ghost' }
const shapeClass = { pill: 'mybtn--pill', rect: 'mybtn--rect' }

const sizeClass = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-sm',
  lg: 'px-5 py-2.5 text-sm',
}
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="mybtn"
    :class="[variantClass[variant], shapeClass[shape], sizeClass[size], block && 'mybtn--block']"
  >
    <slot />
  </button>
</template>

<style scoped>
/* 渐变描边核心 CSS —— 技巧在「双层背景 + 透明 border」：
   1. border 用透明色占位出描边环的宽度；
   2. 叠加两层背景，分别裁剪到不同盒子：
      linear-gradient(...) padding-box → 内填充区，按钮底色；
      linear-gradient(135deg, brand渐变色) border-box → 含描边环的区域，渐变环本身。
   这样 border-radius 能正常生效，不会像 border-image 那样丢失圆角。 */
.mybtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border: 1.5px solid transparent;
  cursor: pointer;
  font-weight: 500;
  transition: filter 0.2s ease, transform 0.15s ease;
}
.mybtn:hover:not(:disabled) {
  filter: brightness(1.12) saturate(1.05);
}
.mybtn:active:not(:disabled) {
  transform: scale(0.97);
}
.mybtn:disabled {
  opacity: 0.45;
  pointer-events: none;
}
.mybtn--block {
  width: 100%;
}

/* 形状 */
.mybtn--pill {
  border-radius: 999px;
}
.mybtn--rect {
  border-radius: 12px;
}

/* 风格一：渐变描边 —— 深色半透明底 + 外圈渐变环 */
.mybtn--border {
  background:
    linear-gradient(var(--btn-fill, #0f172a), var(--btn-fill, #0f172a)) padding-box,
    linear-gradient(135deg, #38bdf8, #818cf8, #c084fc) border-box;
  color: #f8fafc;
}

/* 风格二：渐变填充 —— 整个面板渐变，描边环同色延续 */
.mybtn--fill {
  background:
    linear-gradient(135deg, #38bdf8, #6366f1) padding-box,
    linear-gradient(135deg, #38bdf8, #6366f1) border-box;
  color: #fff;
}

/* 风格三：幽灵 —— 透明底 + 细灰描边 */
.mybtn--ghost {
  background: rgba(15, 23, 42, 0.35);
  border-color: rgba(148, 163, 184, 0.3);
  color: #cbd5e1;
}
</style>