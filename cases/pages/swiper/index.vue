<script setup lang="ts">
import SwiperAutoplay from '~~/cases/components/swiper-autoplay/index.vue'
import SwiperNavigation from '~~/cases/components/swiper-navigation/index.vue'
import SwiperNavigationCustom from '~~/cases/components/swiper-navigation-custom/index.vue'
import SwiperPagination from '~~/cases/components/swiper-pagination/index.vue'
import SwiperPaginationCustom from '~~/cases/components/swiper-pagination-custom/index.vue'
</script>

<template>
  <div class="mx-auto w-full max-w-screen-md space-y-10 py-10">
    <section>
      <h2 class="mb-4 text-xl font-bold text-slate-100">基础 · 自动播放</h2>
      <SwiperAutoplay />
    </section>

    <section>
      <h2 class="mb-4 text-xl font-bold text-slate-100">导航 · 默认箭头</h2>
      <SwiperNavigation />
    </section>

    <section>
      <h2 class="mb-4 text-xl font-bold text-slate-100">导航 · 自定义按钮</h2>
      <SwiperNavigationCustom />
    </section>

    <section>
      <h2 class="mb-4 text-xl font-bold text-slate-100">页码 · 默认分页器</h2>
      <SwiperPagination />
    </section>

    <section>
      <h2 class="mb-4 text-xl font-bold text-slate-100">页码 · 自定义指示器</h2>
      <SwiperPaginationCustom />
    </section>
  </div>
</template>