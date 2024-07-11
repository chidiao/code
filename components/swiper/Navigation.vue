<template>
  <div class="grid gap-5 grid-cols-1 lg:grid-cols-2">
    <section>
      <Swiper :modules="modules" :navigation="true">
        <SwiperSlide v-for="i in 4">
          <img class="aspect-[3/2] object-cover rounded-xl" :src="`https://picsum.photos/2000?${i}`" />
        </SwiperSlide>
      </Swiper>
    </section>

    <section>
      <Swiper :modules="modules" :navigation="navigation">
        <SwiperSlide v-for="i in 4">
          <img class="aspect-[3/2] object-cover rounded-xl" :src="`https://picsum.photos/2000?${i}`" />
        </SwiperSlide>
      </Swiper>

      <div class="flex justify-center items-center space-x-5 mt-5">
        <div class="prev cursor-pointer border rounded px-2 py-1">prev</div>
        <div class="next cursor-pointer border rounded px-2 py-1">next</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
const modules = [Navigation]
const navigation = {
  prevEl: '.prev',
  nextEl: '.next',
  disabledClass: 'opacity-30',
  enabled: 'opacity-100'
}
</script>
