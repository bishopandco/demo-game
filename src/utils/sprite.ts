import * as THREE from 'three'

export class Sprite {
  mesh: THREE.Mesh

  constructor(size = 1) {
    this.mesh = this._createSprite(size)
  }

  private _createSprite(size: number): THREE.Mesh {
    const geo = new THREE.BoxGeometry(size, size, size)
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    return new THREE.Mesh(geo, mat)
  }
}
