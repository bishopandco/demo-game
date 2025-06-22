import * as THREE from 'three'

export class MiniMapCamera extends THREE.OrthographicCamera {
  private readonly halfSize: number

  constructor(size = 20, height = 10) {
    const aspect = window.innerWidth / window.innerHeight
    super(-size, size, size * aspect, -size * aspect, 0.1, 1000)
    this.halfSize = size
    this.position.set(0, height, 0)
    this.rotation.order = 'YXZ'
    this.rotation.x = -Math.PI / 2
    this.up.set(0, 0, -1)
  }

  follow(obj: THREE.Object3D) {
    this.position.x = obj.position.x
    this.position.z = obj.position.z
  }

  resize() {
    const aspect = window.innerWidth / window.innerHeight
    this.left = -this.halfSize
    this.right = this.halfSize
    this.top = this.halfSize * aspect
    this.bottom = -this.halfSize * aspect
    this.updateProjectionMatrix()
  }
}
