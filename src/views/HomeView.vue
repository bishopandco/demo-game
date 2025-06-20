<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { buildGridPlane } from '@/assets/gridPlane.ts'
import { Sprite as MySprite } from '@/assets/sprite.ts'
import { buildWorld } from '@/utils/world.ts'

const container = ref<HTMLElement | null>(null)

const { camera, scene, renderer, controls, composer } = buildWorld()

function init() {
  console.log('Initializing Three.js scene...')
  container.value?.appendChild(renderer.domElement)
  const gridPlane = buildGridPlane()
  const sprite = MySprite.createSprite(10)
  scene.add(sprite)
  scene.add(gridPlane)
}

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  composer.render()
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  gsap.globalTimeline.clear()
  if (container.value) {
    container.value.removeChild(renderer.domElement)
  }
})
</script>

<style scoped></style>
