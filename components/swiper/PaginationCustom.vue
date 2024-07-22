<template>
  <section>
    <Swiper :modules="modules" :pagination="pagination">
      <SwiperSlide v-for="i in 4">
        <img class="aspect-[3/2] object-cover rounded-xl" :src="`https://picsum.photos/2000?${i}`" />
      </SwiperSlide>
    </Swiper>

    <div class="space-x-5 py-5">
      <span>current: {{ current }}</span>
      <span>total: {{ total }}</span>
    </div>
  </section>
</template>

<script setup>
import { Pagination } from 'swiper/modules'
const modules = [Pagination]

const current = ref(0)
const total = ref(0)
const pagination = {
  type: 'custom',
  renderCustom: (swiper, _current, _total) => {
    current.value = _current
    total.value = _total

    return `<span class="text-white">${_current} / ${_total}</span>`
  }
}
</script>
