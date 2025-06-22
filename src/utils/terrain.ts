import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

type ReadyCB = (terrain: THREE.Object3D) => void

export class Terrain {
  readonly mesh: THREE.Object3D
  private readonly _ready: ReadyCB[] = []

  constructor() {
    this.mesh = new THREE.Object3D()
    this._loadTerrain()
  }

  onReady(cb: ReadyCB) {
    this._ready.push(cb)
  }

  private _loadTerrain() {
    const url = new URL('@/assets/models/terrain.glb', import.meta.url).href
    new GLTFLoader().load(
      url,
      (gltf) => {
        const terrain = gltf.scene
        terrain.scale.setScalar(1)
        terrain.position.set(0, 0, 0)
        terrain.traverse((o) => {
          o.castShadow = true
          o.receiveShadow = true
        })
        this.mesh.add(terrain)
        this._ready.forEach((cb) => cb(terrain))
      },
      undefined,
      (err) => console.error('Failed to load terrain', err),
    )
  }
}
