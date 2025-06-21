import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { createSkyDome } from '@/utils'

function setupCamera(camera: THREE.PerspectiveCamera) {
  camera.position.set(0, 30, 100)
  camera.lookAt(0, 0, 0)
  camera.up.set(0, 1, 0)
}

function setupRenderer(renderer: THREE.WebGLRenderer, window: Window) {
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.domElement.style.touchAction = 'none'
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
}

function setupControls(controls: OrbitControls) {
  controls.enableZoom = false
  controls.enableRotate = false
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.target.set(0, 0, 0)
  controls.update()
}

function setupComposer(composer: EffectComposer, renderPass: RenderPass, window: Window) {
  composer.setSize(window.innerWidth, window.innerHeight)
  composer.addPass(renderPass)
}

export function buildWorld() {
  const size = new THREE.Vector2(window.innerWidth, window.innerHeight)
  const scene = new THREE.Scene()
  const aspect = size.x / size.y
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  const controls = new OrbitControls(camera, renderer.domElement)
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  const skyDome = createSkyDome()

  setupCamera(camera)
  setupRenderer(renderer, window)
  setupControls(controls)
  setupComposer(composer, renderPass, window)

  return { scene, camera, renderer, composer, skyDome }
}
