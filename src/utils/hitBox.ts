import * as THREE from 'three'
import { Octree } from 'three/examples/jsm/math/Octree.js'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'

export class HitBox {
  private readonly octree = new Octree()
  private readonly capsule: Capsule
  private velocity = new THREE.Vector3()

  constructor(private readonly sprite: THREE.Object3D) {
    this.capsule = new Capsule(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(0, 0.65, 0), 0.35)
  }

  setTerrain(terrain: THREE.Object3D) {
    this.octree.fromGraphNode(terrain)
  }

  move(delta: number) {
    const capsuleCenter = this.capsule.getCenter(new THREE.Vector3())
    const targetXZ = this.sprite.position.clone()
    targetXZ.y = 0
    capsuleCenter.y = 0
    this.capsule.translate(targetXZ.sub(capsuleCenter))

    this.velocity.y -= 9.8 * delta
    this.velocity.multiplyScalar(0.95)

    const deltaPos = this.velocity.clone().multiplyScalar(delta)
    this.capsule.translate(deltaPos)

    const result = this.octree.capsuleIntersect(this.capsule)
    if (result) {
      this.velocity.addScaledVector(result.normal, -result.depth)
      this.capsule.translate(result.normal.multiplyScalar(result.depth))
    }

    const newCenter = this.capsule.getCenter(new THREE.Vector3())
    this.sprite.position.copy(newCenter)
  }
}
