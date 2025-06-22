import * as THREE from 'three'
import { Octree } from 'three/examples/jsm/math/Octree.js'
import { Capsule } from 'three/examples/jsm/math/Capsule.js'

/**
 * Capsule/terrain collider.
 *
 * 1.  `new HitBox(sprite.mesh)` – create the collider.
 * 2.  When your GLB is in the scene call `hitBox.setTerrain(terrainMesh)`.
 * 3.  Each frame: `hitBox.move(delta)`.
 */
export class HitBox {
  private readonly octree = new Octree()
  private readonly capsule: Capsule
  private velocity = new THREE.Vector3()

  constructor(private readonly sprite: THREE.Object3D) {
    const height = 1
    this.capsule = new Capsule(
      new THREE.Vector3(0, 0.35, 0),
      new THREE.Vector3(0, 0.65, 0),
      0.35
    )
  }

  setTerrain(terrain: THREE.Object3D) {
    this.octree.fromGraphNode(terrain)
  }

  move(delta: number) {
    this.velocity.y -= 9.8 * delta
    this.velocity.multiplyScalar(0.95) // damping

    const deltaPosition = this.velocity.clone().multiplyScalar(delta)
    this.capsule.translate(deltaPosition)

    const result = this.octree.capsuleIntersect(this.capsule)
    if (result) {
      this.velocity.addScaledVector(result.normal, -result.depth)
      this.capsule.translate(result.normal.multiplyScalar(result.depth))
    }

    const center = this.capsule.getCenter(new THREE.Vector3())
    this.sprite.position.copy(center)
  }
}
