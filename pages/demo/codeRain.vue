<template>
  <canvas ref="canvas"></canvas>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'empty'
})

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

const CODE_SIZE = 14
const codes: string[] = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const getRandomCode = () => {
  return codes[Math.floor(Math.random() * codes.length)]
}
const getRandomHeightEnd = () => {
  return Math.random() * 10000
}

const timer = ref()

onMounted(() => {
  if (!canvas.value) return

  let ctx = canvas.value.getContext('2d')
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  let arr: number[] = Array(Math.ceil(canvas.value.width / CODE_SIZE)).fill(0)

  const rain = () => {
    ctx!.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx!.fillRect(0, 0, canvas.value!.width, canvas.value!.height)

    ctx!.fillStyle = '#0f0'
    arr.forEach((item, index) => {
      ctx!.fillText(getRandomCode(), index * CODE_SIZE, item)
      arr[index] = item > canvas.value!.height || item > getRandomHeightEnd() ? 0 : item + CODE_SIZE
    })
  }

  timer.value = setInterval(rain, 50)
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>
