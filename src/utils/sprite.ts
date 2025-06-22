import * as THREE from 'three'

export class Sprite {
  mesh: THREE.Mesh
  scene: THREE.Scene

  constructor(scene: THREE.Scene, size = 1) {
    this.mesh = this._createSprite(size)
    this.scene = scene
    this.scene.add(this.mesh)
  }

  private _createSprite(size: number): THREE.Mesh {
    const geo = new THREE.BoxGeometry(size, size, size)
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    return new THREE.Mesh(geo, mat)
  }
}
