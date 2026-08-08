<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()

const CODE_SIZE = 14
const codes = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const getRandomCode = () => codes[Math.floor(Math.random() * codes.length)]
const getRandomHeightEnd = () => Math.random() * 10000

let ctx: CanvasRenderingContext2D | null = null
let drops: number[] = []
let timer: ReturnType<typeof setInterval> | undefined
let resize = () => {}

function setup() {
  const el = canvas.value
  if (!el || !ctx) return
  el.width = el.clientWidth
  el.height = el.clientHeight
  drops = Array(Math.ceil(el.width / CODE_SIZE)).fill(0)
  ctx.font = `${CODE_SIZE}px monospace`
}

function rain() {
  const el = canvas.value
  if (!el || !ctx) return

  ctx.fillStyle = 'rgba(2, 6, 23, 0.08)'
  ctx.fillRect(0, 0, el.width, el.height)

  ctx.fillStyle = '#22d3ee'
  drops.forEach((y, index) => {
    ctx.fillText(getRandomCode(), index * CODE_SIZE, y)
    drops[index] = y > el.height || y > getRandomHeightEnd() ? 0 : y + CODE_SIZE
  })
}

onMounted(() => {
  const el = canvas.value
  if (!el) return
  ctx = el.getContext('2d')

  setup()
  rain()
  timer = setInterval(rain, 50)

  resize = () => setup()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden bg-slate-950">
    <canvas ref="canvas" class="absolute inset-0 block h-full w-full" />
  </div>
</template>