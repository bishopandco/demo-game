<template>
  <div id="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { World } from '@/utils'

onMounted(() => {
  const container = document.getElementById('container')!
  const world = new World(container)
  window.addEventListener('resize', () => {
    world.resize()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped></style>
