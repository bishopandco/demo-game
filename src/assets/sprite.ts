import * as THREE from 'three'

export class Sprite {
  static createSprite(size: number): THREE.Mesh {
    const geo = new THREE.BoxGeometry(size, size, size)
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    return new THREE.Mesh(geo, mat)
  }
}
