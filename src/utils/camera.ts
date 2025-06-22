import * as THREE from 'three'

export class Camera extends THREE.PerspectiveCamera {
  constructor(scene: THREE.Scene, fov = 75, near = 0.1, far = 1000) {
    super(fov, window.innerWidth / window.innerHeight, near, far)
    scene.add(this)                       // stick it in the scene
    this.position.set(0, 10, 10)
    this.lookAt(0, 0, 0)
  }

  /** tiny helper for fluent repositioning */
  update({ x, y, z }: { x: number; y: number; z: number }): this {
    this.position.set(x, y, z)
    this.lookAt(0, 0, 0)
    return this
  }
}
