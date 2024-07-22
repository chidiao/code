<template>
  <section>
    <Swiper :modules="modules" :navigation="true">
      <SwiperSlide v-for="i in 4">
        <img class="aspect-[3/2] object-cover rounded-xl" :src="`https://picsum.photos/2000?${i}`" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
const modules = [Navigation]
</script>
