import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function loadTerrain(): THREE.Object3D {
  const holder = new THREE.Object3D()

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
      holder.add(terrain)
    },
    undefined,
    (err) => console.error('Failed to load terrain', err),
  )
  return holder
}
