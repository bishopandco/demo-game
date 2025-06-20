<template>
  <div>
    <div ref="container" class="full-screen"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount} from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { Clock } from 'three'

const size = new THREE.Vector2(window.innerWidth, window.innerHeight)

const scene = new THREE.Scene()
const aspect = size.x / size.y
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })
const controls = new OrbitControls(camera, renderer.domElement)
const composer = new EffectComposer(renderer)
const container = ref<HTMLElement | null>(null)
const renderPass = new RenderPass(scene, camera)

function init() {
  camera.position.set(0, 0, 30)
  camera.up.set(0, 1, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
  composer.addPass(renderPass)
  container.value?.appendChild(renderer.domElement)
  controls.enableZoom = false
  controls.enableRotate = false
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  renderer.domElement.style.touchAction = 'none'
  window.addEventListener('resize', onResize)
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
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  gsap.globalTimeline.clear()
  if (container.value) {
    container.value.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
</style>
