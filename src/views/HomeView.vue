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

const { camera, scene, renderer, controls, composer } = buildWorld()
const cameraOffset = new THREE.Vector3(0, 35, 100)

let sprite: THREE.Mesh

let velocityY = 1
let isGrounded = true

const keys = { left: false, right: false, jump: false, squat: false }

function onKeyDown(e: KeyboardEvent) {
  switch (e.key.toLowerCase()) {
    case 'a': keys.left = true; break
    case 'd': keys.right = true; break
    case 'w': keys.jump = true; break
    case 's': keys.squat = true; break
  }
}

function onKeyUp(e: KeyboardEvent) {
  switch (e.key.toLowerCase()) {
    case 'a': keys.left = false; break
    case 'd': keys.right = false; break
    case 'w': keys.jump = false; break
    case 's': keys.squat = false; break
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
  const speed = 100
  const jumpPower = 100
  const gravity = 100

  if (keys.left)  sprite.position.x -= speed * delta
  if (keys.right) sprite.position.x += speed * delta

  if (keys.jump && isGrounded) {
    velocityY = jumpPower
    isGrounded = false
  }

  velocityY -= gravity * delta
  sprite.position.y += velocityY * delta
  if (sprite.position.y <= 5) {
    sprite.position.y = 5
    velocityY = 0
    isGrounded = true
  }

  sprite.scale.y = keys.squat && isGrounded ? 0.5 : 1
}
function animate() {
  requestAnimationFrame(animate)
  const delta = clock.getDelta()
  updateMovement(delta)
  camera.position.copy(sprite.position).add(cameraOffset)
  controls.target.copy(sprite.position)

  controls.update()
  composer.render()
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
