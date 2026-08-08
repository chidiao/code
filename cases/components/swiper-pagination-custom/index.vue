<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [1, 2, 3, 4, 5]
const gradients = [
  'from-sky-500 to-blue-600',
  'from-violet-500 to-fuchsia-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
]

const modules = [Pagination]
const options = { pagination: { type: 'custom' as const } }

const current = ref(1)
const total = ref(slides.length)
function onSlideChange(swiper: { realIndex: number; slides: unknown[] }) {
  current.value = swiper.realIndex + 1
  total.value = swiper.slides.length
}
</script>

<template>
  <div>
    <Swiper :modules="modules" v-bind="options" class="rounded-xl" @slide-change="onSlideChange">
      <SwiperSlide v-for="n in slides" :key="n">
        <div
          class="flex aspect-[3/2] items-center justify-center bg-gradient-to-r text-3xl font-bold text-white"
          :class="gradients[(n - 1) % gradients.length]"
        >
          {{ n }}
        </div>
      </SwiperSlide>
    </Swiper>
    <p class="mt-5 text-center text-sm text-slate-400">
      当前：<span class="font-semibold text-brand-400">{{ current }}</span>
      / {{ total }}
    </p>
  </div>
</template>