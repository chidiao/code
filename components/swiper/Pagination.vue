<template>
  <div class="grid gap-5 grid-cols-1 lg:grid-cols-2">
    <section>
      <Swiper :modules="modules" :pagination="true">
        <SwiperSlide v-for="i in 4">
          <img class="aspect-[3/2] object-cover rounded-xl" :src="`https://picsum.photos/2000?${i}`" />
        </SwiperSlide>
      </Swiper>
    </section>

    <section>
      <Swiper :modules="modules" :pagination="pagination">
        <SwiperSlide v-for="i in 4">
          <img class="aspect-[3/2] object-cover rounded-xl" :src="`https://picsum.photos/2000?${i}`" />
        </SwiperSlide>
      </Swiper>
    </section>
  </div>
</template>

<script setup>
import { Pagination } from 'swiper/modules'
const modules = [Pagination]

const pagination = {
  type: 'custom',
  renderCustom: (swiper, current, total) => {
    console.log(swiper, current, total)

    return '<span></span>'
  }
}
</script>
