<script setup lang="ts">
import SwiperPage from '~~/cases/pages/swiper/index.vue'
import SwiperAutoplay from '~~/cases/components/swiper-autoplay/index.vue'
import SwiperNavigation from '~~/cases/components/swiper-navigation/index.vue'
import SwiperNavigationCustom from '~~/cases/components/swiper-navigation-custom/index.vue'
import SwiperPagination from '~~/cases/components/swiper-pagination/index.vue'
import SwiperPaginationCustom from '~~/cases/components/swiper-pagination-custom/index.vue'

useHead({ title: 'Swiper 案例 · Code' })
</script>

<template>
  <ShowcasePage
    title="Swiper 案例"
    description="基于 Swiper 14 的轮播示例：基础自动播放、默认/自定义导航、默认/自定义页码，深色主题适配。"
  >
    <ShowcasePreviewPage
      title="Swiper 滑动案例"
      url="/pages/swiper"
      open="/preview/swiper"
      github="cases/pages/swiper/index.vue"
    >
      <SwiperPage />
    </ShowcasePreviewPage>
    <ShowcaseCode file="pages/swiper/index.vue" label="整页 · 组合各示例" :lines="[1, 6]" />

    <ShowcasePreview title="基础 · 自动播放">
      <div class="p-4">
        <SwiperAutoplay />
      </div>
    </ShowcasePreview>
    <ShowcaseCode file="components/swiper-autoplay/index.vue" label="自动播放 · 关键配置" :lines="[1, 20]" />

    <ShowcasePreview title="导航 · 默认箭头">
      <div class="p-4">
        <SwiperNavigation />
      </div>
    </ShowcasePreview>
    <ShowcaseCode file="components/swiper-navigation/index.vue" label="默认导航 · 关键配置" :lines="[1, 17]" />

    <ShowcasePreview title="导航 · 自定义按钮">
      <div class="p-4">
        <SwiperNavigationCustom />
      </div>
    </ShowcasePreview>
    <ShowcaseCode file="components/swiper-navigation-custom/index.vue" label="自定义导航 · 关键配置" :lines="[1, 23]" />

    <ShowcasePreview title="页码 · 默认分页器">
      <div class="p-4">
        <SwiperPagination />
      </div>
    </ShowcasePreview>
    <ShowcaseCode file="components/swiper-pagination/index.vue" label="默认页码 · 关键配置" :lines="[1, 17]" />

    <ShowcasePreview title="页码 · 自定义指示器">
      <div class="p-4">
        <SwiperPaginationCustom />
      </div>
    </ShowcasePreview>
    <ShowcaseCode file="components/swiper-pagination-custom/index.vue" label="自定义指示器 · 关键配置" :lines="[1, 24]" />
  </ShowcasePage>
</template>