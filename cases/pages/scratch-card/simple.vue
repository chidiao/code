<script setup lang="ts">
const WIDTH = 300
const HEIGHT = 150
const RADIUS = 18
const PRIZE = '谢谢惠顾'

const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  ctx.rect(0, 0, WIDTH, HEIGHT)
  ctx.fillStyle = '#d9d9d9'
  ctx.fill()

  // 图片涂层：加载成功后盖满整卡，替代灰色底
  const img = new Image()
  img.src = 'https://s1.ax1x.com/2020/08/21/dt5Vkn.png'
  img.onload = () => ctx.drawImage(img, 0, 0, WIDTH, HEIGHT)

  const toLocal = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect()
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  let last = { x: 0, y: 0 }

  const scratchAt = (x: number, y: number) => {
    ctx.beginPath()
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2)
    ctx.fill()
  }

  // 两点之间插值补笔，快速拖动也不断线
  function scratch(prev: { x: number; y: number }, next: { x: number; y: number }) {
    const dist = Math.hypot(next.x - prev.x, next.y - prev.y)
    const steps = Math.max(1, Math.ceil(dist / 4))
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      scratchAt(prev.x + (next.x - prev.x) * t, prev.y + (next.y - prev.y) * t)
    }
  }

  const onPointerMove = (e: PointerEvent) => {
    const pt = toLocal(e.clientX, e.clientY)
    scratch(last, pt)
    last = pt
  }

  // Pointer Events：统一鼠标/触摸，setPointerCapture 兜住快速甩动
  canvas.addEventListener('pointerdown', (e) => {
    ctx.globalCompositeOperation = 'destination-out'
    last = toLocal(e.clientX, e.clientY)
    scratchAt(last.x, last.y)
    canvas.setPointerCapture(e.pointerId)
    canvas.addEventListener('pointermove', onPointerMove)
  })
  const stop = () => canvas.removeEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', stop)
  canvas.addEventListener('pointercancel', stop)
})
</script>

<template>
  <div class="scratch-simple">
    <div class="prize">{{ PRIZE }}</div>
    <canvas ref="canvasRef" class="cover" width="300" height="150" />
  </div>
</template>

<style scoped>
.scratch-simple {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 150px;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 16px;
  color: #ff9311;
}

.prize {
  user-select: none;
}

.cover {
  position: absolute;
  z-index: 2;
  cursor: pointer;
  touch-action: none;
}
</style>