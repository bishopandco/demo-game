
import * as THREE from 'three'

/**
 * Orthographic “helicopter” cam sitting straight-overhead.
 * Call follow() every frame so it tracks the player.
 */
export class MiniMapCamera extends THREE.OrthographicCamera {
  private readonly halfSize: number

  constructor(
    size = 40,         // ground area shown on the map (world units)
    height = 120,      // how high above the scene the camera hovers
  ) {
    const aspect = window.innerWidth / window.innerHeight
    super(-size, size, size * aspect, -size * aspect, 0.1, 1000)
    this.halfSize = size
    this.position.set(0, height, 0)
    this.rotation.order = 'YXZ'
    this.rotation.x = -Math.PI / 2            // look straight down
    this.up.set(0, 0, -1)                     // “north” = +Z on minimap
  }

  follow(obj: THREE.Object3D) {
    this.position.x = obj.position.x
    this.position.z = obj.position.z
  }

  resize() {
    const aspect = window.innerWidth / window.innerHeight
    this.left   = -this.halfSize
    this.right  =  this.halfSize
    this.top    =  this.halfSize * aspect
    this.bottom = -this.halfSize * aspect
    this.updateProjectionMatrix()
  }
}
