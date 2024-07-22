<template>
  <div class="container mx-auto p-5">
    <section class="max-w-screen-md mx-auto">
      <div class="text-xl/[3em] font-bold">基础</div>
      <SwiperDefault />
    </section>

    <section class="max-w-screen-md mx-auto">
      <div class="text-xl/[3em] font-bold">导航</div>

      <div class="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <SwiperNavigationDefault />
        <SwiperNavigationCustom />
      </div>
    </section>

    <section class="max-w-screen-md mx-auto">
      <div class="text-xl/[3em] font-bold">页码</div>

      <div class="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <SwiperPaginationDefault />
        <SwiperPaginationCustom />
      </div>
    </section>
  </div>
</template>
