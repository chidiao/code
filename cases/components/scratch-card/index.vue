<template>
  <div class="scratch-card">
    <div class="canvas-wrapper">
      <!-- 底层：奖品文字 -->
      <div class="prize-layer">
        <span class="deco deco1">✦</span>
        <span class="deco deco2">✦</span>
        <span class="deco deco3">✧</span>
        <span class="deco deco4">✧</span>
        <span class="prize-text">{{ currentPrize }}</span>
      </div>

      <!-- 上层：canvas 涂层 -->
      <canvas ref="canvasRef" class="scratch-canvas"></canvas>
    </div>

    <div class="info-bar">
      <span class="badge">🎁 刮一刮</span>
      <button type="button" class="reset-btn" @click="resetCard">⟳ 重新刮</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const PRIZES = [
  '🎉 一等奖', '🥈 二等奖', '🥉 三等奖',
  '🧧 幸运奖', '🍫 巧克力', '🎁 谢谢参与',
  '🌟 再来一次', '💎 神秘礼物', '🍀 好运连连',
]

const W = 440
const H = 280
const CLEAR_RATIO = 0.6
const CHECK_INTERVAL = 6
const MAX_SAMPLE = 60_000

const canvasRef = ref<HTMLCanvasElement | null>(null)
const currentPrize = ref(randomPrize())
const isCleared = ref(false)

let ctx: CanvasRenderingContext2D | null = null
let dpr = 1
let drawing = false
let activePointer: number | null = null
let lastX = 0
let lastY = 0
let scratchOps = 0

function randomPrize() {
  return PRIZES[Math.floor(Math.random() * PRIZES.length)]
}

/** 按设备像素比初始化画布，避免高分屏模糊 */
function setupCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(W * dpr)
  canvas.height = Math.round(H * dpr)
  ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function drawCoverLayer() {
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.globalAlpha = 1
  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, W, H)

  // 保证底层完全不透明：先铺纯色底，再叠加金属渐变
  ctx.fillStyle = '#aeb3ba'
  ctx.fillRect(0, 0, W, H)

  // 金属质感底色
  const grad = ctx.createLinearGradient(0, 0, W * 0.6, H * 0.8)
  grad.addColorStop(0, '#b3b7bc')
  grad.addColorStop(0.3, '#d5d9de')
  grad.addColorStop(0.7, '#a8adb4')
  grad.addColorStop(1, '#868b92')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // 纹理噪点
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const radius = Math.random() * 2.8 + 0.8
    const alpha = Math.random() * 0.25 + 0.05
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(80, 80, 80, ${alpha})`
    ctx.fill()
  }

  // 高光线条
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(20, 20)
  ctx.lineTo(W * 0.5, 30)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(W * 0.7, 18)
  ctx.lineTo(W - 20, 45)
  ctx.stroke()

  // 边缘暗角
  const vignette = ctx.createRadialGradient(W / 2, H / 2, W * 0.2, W / 2, H / 2, W * 0.9)
  vignette.addColorStop(0, 'rgba(0,0,0,0)')
  vignette.addColorStop(0.8, 'rgba(0,0,0,0.03)')
  vignette.addColorStop(1, 'rgba(0,0,0,0.2)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, W, H)

  // 提示小字
  ctx.textAlign = 'center'
  ctx.textBaseline = 'bottom'
  ctx.font = '14px "Segoe UI", sans-serif'
  ctx.fillStyle = 'rgba(60, 60, 60, 0.55)'
  ctx.fillText('👆 涂抹刮开', W / 2, H - 18)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.font = '12px sans-serif'
  ctx.fillStyle = 'rgba(255,255,240,0.2)'
  ctx.fillText('刮刮乐', 20, 14)

  isCleared.value = false
}

/** 浏览器坐标 -> 画布坐标（考虑 CSS 缩放） */
function toCanvasCoords(clientX: number, clientY: number) {
  const rect = canvasRef.value!.getBoundingClientRect()
  const x = (clientX - rect.left) * (W / rect.width)
  const y = (clientY - rect.top) * (H / rect.height)
  return {
    x: Math.min(Math.max(x, 0), W),
    y: Math.min(Math.max(y, 0), H),
  }
}

/** 以 destination-out 刮掉一个圆 */
function scratchAt(x: number, y: number, radius: number) {
  if (!ctx || isCleared.value) return
  ctx.save()
  ctx.globalCompositeOperation = 'destination-out'
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  if (++scratchOps % CHECK_INTERVAL === 0) checkCleared()
}

/** 轨迹插值：把快速滑动的痕迹补连贯 */
function interpolate(x0: number, y0: number, x1: number, y1: number, radius: number) {
  const dist = Math.hypot(x1 - x0, y1 - y0)
  const steps = Math.min(Math.ceil(dist / 2), 15)
  const dx = x1 - x0
  const dy = y1 - y0
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    scratchAt(x0 + dx * t, y0 + dy * t, radius)
  }
}

/** 检查刮开比例，达到阈值即揭晓（采样上限封顶，避免大画布卡顿） */
function checkCleared() {
  if (!ctx || isCleared.value) return
  const data = ctx.getImageData(0, 0, W, H).data
  const pixelStep = Math.max(1, Math.ceil(data.length / 4 / MAX_SAMPLE))
  let transparent = 0
  let total = 0
  for (let i = 0; i < data.length; i += 4 * pixelStep) {
    total++
    if (data[i + 3] === 0) transparent++
  }
  if (total && transparent / total >= CLEAR_RATIO) reveal()
}

function reveal() {
  isCleared.value = true
  drawing = false
  activePointer = null
  if (ctx) {
    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.font = '20px sans-serif'
    ctx.fillStyle = '#9e6d42'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText('✨ 已刮开', W - 20, H - 16)
    ctx.restore()
  }
}

function resetCard() {
  currentPrize.value = randomPrize()
  scratchOps = 0
  drawCoverLayer()
}

/* ------------ Pointer Events：统一鼠标 / 触摸 / 触控笔 ------------ */

function onPointerDown(e: PointerEvent) {
  if (isCleared.value || activePointer !== null) return
  activePointer = e.pointerId
  canvasRef.value!.setPointerCapture(e.pointerId)
  drawing = true
  const pt = toCanvasCoords(e.clientX, e.clientY)
  lastX = pt.x
  lastY = pt.y
  scratchAt(pt.x, pt.y, 30)
}

function onPointerMove(e: PointerEvent) {
  if (!drawing || e.pointerId !== activePointer) return
  const pt = toCanvasCoords(e.clientX, e.clientY)
  interpolate(lastX, lastY, pt.x, pt.y, 24)
  lastX = pt.x
  lastY = pt.y
}

function onPointerUp(e: PointerEvent) {
  if (e.pointerId !== activePointer) return
  drawing = false
  activePointer = null
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  setupCanvas()
  drawCoverLayer()

  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerup', onPointerUp)
  canvas.addEventListener('pointercancel', onPointerUp)
  canvas.addEventListener('contextmenu', onContextMenu)
})

function onContextMenu(e: MouseEvent) {
  e.preventDefault()
}

onUnmounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.removeEventListener('pointerdown', onPointerDown)
  canvas.removeEventListener('pointermove', onPointerMove)
  canvas.removeEventListener('pointerup', onPointerUp)
  canvas.removeEventListener('pointercancel', onPointerUp)
  canvas.removeEventListener('contextmenu', onContextMenu)
})
</script>

<style scoped>
.scratch-card {
  background: #d9b382;
  background-image: radial-gradient(circle at 20% 30%, #f3d9b1, #b58b5a);
  padding: 28px 28px 35px;
  border-radius: 56px 56px 48px 48px;
  box-shadow: 0 25px 40px rgba(0, 0, 0, 0.7), 0 0 0 2px #b48b5a inset, 0 0 0 4px #f7e3c6 inset;
  transition: transform 0.2s ease;
  display: inline-block;
}

.scratch-card:hover {
  transform: scale(1.01);
}

.canvas-wrapper {
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  width: 440px;
  height: 280px;
  background: #fcf3e0;
  touch-action: none;
}

/* 底层：奖品文字 */
.prize-layer {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcf3e0;
  font-size: 48px;
  font-weight: bold;
  color: #3a251c;
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  text-shadow: 2px 3px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: 2px;
  pointer-events: none;
}

.prize-layer::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  border: 2.5px solid #b28b5c;
  border-radius: 20px;
  pointer-events: none;
}

.prize-layer .prize-text {
  position: relative;
  z-index: 1;
}

.deco {
  position: absolute;
  font-size: 24px;
  color: #b48b5a;
  pointer-events: none;
}

.deco1 { top: 30px; left: 40px; }
.deco2 { bottom: 30px; right: 40px; }
.deco3 { top: 35px; right: 50px; color: #dbb58b; }
.deco4 { bottom: 35px; left: 50px; color: #dbb58b; }

/* 上层：canvas 涂层（绝对定位盖住奖品层，奖品被完全遮挡） */
.scratch-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
  touch-action: none;
  border-radius: 32px;
}

.info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  padding: 0 12px;
}

.badge {
  background: #2f1f1b;
  color: #f5dec6;
  padding: 8px 20px;
  border-radius: 60px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 0 #0f0907;
}

.reset-btn {
  background: #f7e3c6;
  border: 1px solid #ffeacb;
  padding: 8px 26px;
  border-radius: 60px;
  font-weight: 700;
  font-size: 1rem;
  color: #2d1b14;
  cursor: pointer;
  box-shadow: 0 6px 0 #a77b52, 0 6px 10px rgba(0, 0, 0, 0.3);
  transition: 0.06s linear;
  letter-spacing: 0.5px;
}

.reset-btn:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #a77b52;
}

.reset-btn:hover {
  background: #ffefd6;
}

@media (max-width: 480px) {
  .scratch-card {
    padding: 16px 16px 24px;
    border-radius: 40px;
  }
  .canvas-wrapper {
    width: 320px;
    height: 200px;
  }
  .prize-layer {
    font-size: 32px;
  }
  .badge {
    font-size: 0.75rem;
    padding: 5px 14px;
  }
  .reset-btn {
    font-size: 0.85rem;
    padding: 6px 18px;
  }
}
</style>