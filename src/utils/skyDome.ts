import * as THREE from 'three'

export class SkyDome {
  mesh: THREE.Mesh
  scene: THREE.Scene

  constructor(scene: THREE.Scene, radius = 500) {
    this.mesh = this._createSkyDome(radius)
    this.scene = scene
    scene.add(this.mesh)
  }

  update({ x, y, z }: { x: number; y: number; z: number }): this {
    this.mesh.position.set(x, y, z)
    return this
  }

  private _createSkyDome(radius = 500): THREE.Mesh {
    const loader = new THREE.TextureLoader()
    const texture = loader.load('/textures/sky.png')

    texture.colorSpace = THREE.SRGBColorSpace

    const geometry = new THREE.SphereGeometry(radius, 60, 40)
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    })

    material.toneMapped = false

    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = false
    mesh.receiveShadow = false
    return mesh
  }
}
