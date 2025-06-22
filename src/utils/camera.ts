import * as THREE from 'three'

export class Camera {
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene

  constructor(scene: THREE.Scene) {
    this.camera = new THREE.PerspectiveCamera()
    this.scene = scene
    this.camera.position.set(0, 10, 10)
    this.camera.lookAt(0, 0, 0)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.scene.add(this.camera)
  }

  update({ x, y, z }: { x: number; y: number; z: number }): this {
    this.camera.position.set(x, y, z)
    this.camera.lookAt(0, 0, 0)
    return this
  }
  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }
}
