<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const slides = [1, 2, 3, 4, 5]
const gradients = [
  'from-sky-500 to-blue-600',
  'from-violet-500 to-fuchsia-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
]

const modules = [Autoplay]
const options = {
  loop: true,
  speed: 600,
  autoplay: { delay: 2200, disableOnInteraction: false },
}
</script>

<template>
  <Swiper :modules="modules" v-bind="options" class="rounded-xl">
    <SwiperSlide v-for="n in slides" :key="n">
      <div
        class="flex aspect-[3/2] items-center justify-center bg-gradient-to-r text-3xl font-bold text-white"
        :class="gradients[(n - 1) % gradients.length]"
      >
        {{ n }}
      </div>
    </SwiperSlide>
  </Swiper>
</template>