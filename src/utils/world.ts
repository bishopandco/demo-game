import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import {
  Ground,
  SkyDome,
  Terrain,
  GameControls,
  Sprite,
  Camera,
  Globals,
  Light,
  HemisphereLight,
  MiniMapCamera,
  HitBox,
} from '@/utils'
import { Octree } from 'three/examples/jsm/math/Octree.js'

export class World {
  scene: THREE.Scene
  camera: Camera
  renderer: THREE.WebGLRenderer
  composer: EffectComposer
  controls: OrbitControls
  skyDome: SkyDome
  clock: THREE.Clock
  ground: Ground
  terrain: Terrain
  gameControls: GameControls
  sprite: Sprite
  light: Light
  hemisphereLight: HemisphereLight
  delta: number
  minimapCamera: MiniMapCamera
  hitBox: HitBox
  verticalVelocity: number

  constructor(private container: HTMLElement) {
    this.scene = new THREE.Scene()

    this.light = new Light()
    this.scene.add(this.light)

    this.hemisphereLight = new HemisphereLight()
    this.scene.add(this.hemisphereLight)

    this.camera = new Camera()
    this.scene.add(this.camera)

    this.minimapCamera = new MiniMapCamera(Globals.miniMapSize, Globals.miniMapHeight)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.composer = new EffectComposer(this.renderer)

    this.clock = new THREE.Clock()

    this.skyDome = new SkyDome()
    this.scene.add(this.skyDome.mesh)

    this.ground = new Ground()
    this.scene.add(this.ground.mesh)

    const octree = new Octree()
    octree.fromGraphNode(this.ground.mesh)

    this.sprite = new Sprite()
    this.sprite.mesh.position.set(0, 10, 0)
    this.scene.add(this.sprite.mesh)

    this.verticalVelocity = 0

    this.hitBox = new HitBox(this.sprite.mesh)

    this.terrain = new Terrain()
    this.scene.add(this.terrain.mesh)
    this.terrain.onReady((mesh) => {
      this.hitBox.setTerrain(mesh)
      this.scene.add(mesh)
    })

    this.gameControls = new GameControls()

    this.delta = 0

    this._setupCamera()
    this._setupRenderer()
    this._setupControls()
    this._setupComposer()

    this.container.appendChild(this.renderer.domElement)
    this._loop()
  }

  resize() {
    const { innerWidth: w, innerHeight: h } = window
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
    this.composer.setSize(w, h)
    this.minimapCamera.resize()
  }

  update(dt = this.clock.getDelta()) {
    this.gameControls.update(this.sprite.mesh, dt)
    this.verticalVelocity -= Globals.gravity * dt
    this.sprite.mesh.position.y += this.verticalVelocity * dt

    this.hitBox.move(dt)
    const localOffset = new THREE.Vector3(0, Globals.camHeight, Globals.camDistance)
    const worldOffset = localOffset
      .clone()
      .applyQuaternion(this.sprite.mesh.quaternion)
      .add(this.sprite.mesh.position)
    this.camera.position.lerp(worldOffset, Globals.camLerp)

    const forward = new THREE.Vector3(0, 0, -1)
      .applyQuaternion(this.sprite.mesh.quaternion)
      .normalize()
    const lookTarget = this.sprite.mesh.position.clone().addScaledVector(forward, Globals.lookAhead)
    this.camera.lookAt(lookTarget)
    this.controls.target.copy(lookTarget)
    this.controls.update()

    this.skyDome.update(this.camera.position)
    this.renderer.autoClear = false
    this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
    this.renderer.setScissorTest(false)
    this.renderer.clear()
    this.composer.render()

    this.minimapCamera.follow(this.sprite.mesh)
    this.renderer.clearDepth()

    const { innerWidth: w, innerHeight: h } = window
    const size = w * 0.15

    this.renderer.setScissorTest(true)
    this.renderer.setViewport(w - size - 10, 10, size, size)
    this.renderer.setScissor(w - size - 10, 10, size, size)
    this.renderer.render(this.scene, this.minimapCamera)
    this.renderer.setScissorTest(false)
  }

  private _setupCamera() {
    this.camera.position.set(0, 30, 100)
    this.camera.lookAt(0, 0, 0)
    this.camera.up.set(0, 1, 0)
  }

  private _setupRenderer() {
    const { innerWidth: w, innerHeight: h, devicePixelRatio: dpr } = window
    this.renderer.setSize(w, h)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.domElement.style.touchAction = 'none'
  }

  private _setupControls() {
    this.controls.enableZoom = false
    this.controls.enableRotate = false
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.target.set(0, 0, 0)
    this.controls.update()
  }

  private _setupComposer() {
    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)
  }

  private _loop = () => {
    requestAnimationFrame(this._loop)
    this.update()
  }
}
