<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { buildGridPlane } from '@/assets/gridPlane.ts'
import { createSkyDome } from '@/assets/skyDome.ts'
import { loadTerrain } from '@/assets/terrain.ts'
import { Sprite as MySprite } from '@/assets/sprite.ts'
import { Controls } from '@/utils/controls.ts'
import { buildWorld } from '@/utils/world.ts'
import { cameraLight, hemisphereLight } from '@/utils/lights.ts'
import * as THREE from 'three'
import { updateCamera } from '@/utils/camera.ts'

const container = ref<HTMLElement | null>(null)
const clock = new THREE.Clock()
const { camera, scene, renderer, composer } = buildWorld()

let sprite: THREE.Mesh

let speed = 0
const maxSpeed = 30
const acceleration = 400
const brakeDeceleration = 600
const friction = 50
const rotationSpeed = Math.PI
const camDistance = 2
const camHeight = 4
const camLerp = 0.1

const controls = new Controls()
const skyDome = createSkyDome()
scene.add(skyDome)

function init() {
  container.value?.appendChild(renderer.domElement)
  scene.add(buildGridPlane())
  scene.add(loadTerrain())
  scene.add(hemisphereLight(0xffffff, 0x404040, 0.5))
  scene.add(cameraLight())
  sprite = MySprite.createSprite(1)
  sprite.position.set(0, 1, 0)
  scene.add(sprite)
}

function animate() {
  const delta = clock.getDelta()
  if (controls.forward) speed += 20 * delta
  if (controls.backward) speed -= 20 * delta
  if (controls.left) sprite.rotation.y += rotationSpeed * delta
  if (controls.right) sprite.rotation.y -= rotationSpeed * delta

  if (controls.backward) {
    speed = Math.min(speed + acceleration * delta, maxSpeed / 2)
  } else if (controls.forward) {
    speed = Math.max(speed - brakeDeceleration * delta, -maxSpeed / 2)
  } else {
    if (speed > 0) speed = Math.max(speed - friction * delta, 0)
    else if (speed < 0) speed = Math.min(speed + friction * delta, 0)
  }
  const forward = new THREE.Vector3(Math.sin(sprite.rotation.y), 0, Math.cos(sprite.rotation.y))
  sprite.position.add(forward.multiplyScalar(speed * delta))
  updateCamera(camera, sprite, camDistance, camHeight, camLerp)
  skyDome.position.copy(camera.position)

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
  window.removeEventListener('resize', () => {})
  controls.dispose()
  gsap.globalTimeline.clear()
  container.value?.removeChild(renderer.domElement)
})
</script>

<style scoped></style>
