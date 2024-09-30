<template>
  <Swiper
    class="videos"
    direction="vertical"
    :initialSlide="1"
    :allowSlidePrev="allowSlidePrev"
    :allowSlideNext="allowSlideNext"
    @slideChangeTransitionEnd="onSlideChange"
  >
    <SwiperSlide>
      <video :src="videos[activeIndex > 0 ? activeIndex - 1 : 0]"></video>
    </SwiperSlide>

    <SwiperSlide>
      <video ref="video" loop :src="videos[activeIndex]"></video>
    </SwiperSlide>

    <SwiperSlide>
      <video :src="videos[activeIndex < 4 ? activeIndex + 1 : activeIndex]"></video>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
definePageMeta({
  layout: 'empty'
})

import { ref, computed, useTemplateRef, nextTick, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const videos = [
  'https://static.itopline.com/videos/wap/bg/ai/chuangmengkongjian.mp4',
  'https://static.itopline.com/videos/wap/bg/ai/zhinengti.mp4',
  'https://static.itopline.com/videos/wap/bg/stage.mp4',
  'https://static.itopline.com/videos/wap/bg/home.mp4',
  'https://static.itopline.com/videos/wap/bg/studio.mp4'
]

const activeIndex = ref(0)
const video = useTemplateRef('video')

const allowSlidePrev = computed(() => {
  return activeIndex.value != 0
})

const allowSlideNext = computed(() => {
  return activeIndex.value != videos.length - 1
})

// 动画结束
const onSlideChange = (swiper) => {
  if (swiper.activeIndex == 1) return

  const isNext = swiper.activeIndex == 2
  if (isNext) {
    activeIndex.value++
  } else {
    activeIndex.value--
  }

  nextTick(() => {
    video.value.play()
    swiper.slideTo(1, 0)
  })
}
</script>

<style scoped>
.videos {
  width: 100vw;
  height: 100vh;
}

.videos video,
.videos img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
