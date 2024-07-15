<template>
  <div class="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
    <div ref="el" class="max-w-3xl mx-auto p-5">
      <div class="h-[70vh]"></div>

      <div class="cards">
        <div
          class="card text-white cursor-pointer rounded-2xl p-8 shadow my-8 bg-gradient-to-b from-blue-400 to-blue-500"
          v-for="i in 5"
        >
          <div class="title font-bold text-xl">This is Title</div>
          <div class="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate explicabo sit quidem nobis, odio
            ducimus, quisquam quas temporibus rem facere nesciunt qui illo assumenda obcaecati nostrum id.
            Reprehenderit, magni totam.
          </div>
        </div>
      </div>

      <div class="h-[70vh]"></div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

const el = ref()

onMounted(() => {
  gsap.context((self) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cards',
        pin: true,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        ease: 'linear'
      }
    })

    tl.to('.card .text', {
      height: 0,
      paddingBottom: 0,
      opacity: 0,
      stagger: 0.5
    })

    tl.to(
      '.card',
      {
        marginBottom: -45,
        stagger: 0.5
      },
      '<'
    )
  }, el.value)
})
</script>
