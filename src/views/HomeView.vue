<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { buildGridPlane } from '@/assets/gridPlane.ts'
import { Sprite as MySprite } from '@/assets/sprite.ts'
import { buildWorld } from '@/utils/world.ts'
import * as THREE from 'three'

const container = ref<HTMLElement | null>(null)
const clock = new THREE.Clock()

const { camera, scene, renderer, composer } = buildWorld()

let sprite: THREE.Mesh

let speed = 0
const maxSpeed = 200
const acceleration = 400
const brakeDeceleration = 600
const friction = 200
const rotationSpeed = Math.PI
const camDistance = 100
const camHeight = 20
const camLerp = 0.1

const keys = { left: false, right: false, break: false, accelerate: false }

function onKeyDown(e: KeyboardEvent) {
  switch (e.code) {
    case 'ArrowLeft':
      keys.left = true
      break
    case 'ArrowRight':
      keys.right = true
      break
    case 'ArrowUp':
      keys.accelerate = true
      break
    case 'ArrowDown':
      keys.break = true
      break
  }
}

function onKeyUp(e: KeyboardEvent) {
  switch (e.code) {
    case 'ArrowLeft':
      keys.left = false
      break
    case 'ArrowRight':
      keys.right = false
      break
    case 'ArrowUp':
      keys.accelerate = false
      break
    case 'ArrowDown':
      keys.break = false
      break
  }
}

function init() {
  container.value?.appendChild(renderer.domElement)
  scene.add(buildGridPlane())
  sprite = MySprite.createSprite(10)
  sprite.position.set(0, 5, 0)
  scene.add(sprite)
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
}

function updateMovement(delta: number) {
  if (keys.left) sprite.rotation.y += rotationSpeed * delta
  if (keys.right) sprite.rotation.y -= rotationSpeed * delta

  if (keys.break) {
    speed = Math.min(speed + acceleration * delta, maxSpeed)
  } else if (keys.accelerate) {
    speed = Math.max(speed - brakeDeceleration * delta, -maxSpeed / 2)
  } else {
    if (speed > 0) speed = Math.max(speed - friction * delta, 0)
    else if (speed < 0) speed = Math.min(speed + friction * delta, 0)
  }

  const forward = new THREE.Vector3(Math.sin(sprite.rotation.y), 0, Math.cos(sprite.rotation.y))
  sprite.position.add(forward.multiplyScalar(speed * delta))
}

function updateCamera() {
  const localOffset = new THREE.Vector3(0, camHeight, camDistance)
  const worldOffset = localOffset.clone().applyQuaternion(sprite.quaternion).add(sprite.position)

  camera.position.lerp(worldOffset, camLerp)

  camera.quaternion.slerp(sprite.quaternion, camLerp)
}

function animate() {
  const delta = clock.getDelta()
  updateMovement(delta)
  updateCamera()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  window.removeEventListener('resize', () => {})
  gsap.globalTimeline.clear()
  container.value?.removeChild(renderer.domElement)
})
</script>

<style scoped></style>
