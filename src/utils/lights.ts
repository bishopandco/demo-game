import * as THREE from 'three'

export class Light extends THREE.DirectionalLight {
  constructor(color: number = 0xffffff, intensity: number = 1) {
    super(color, intensity)
    this.castShadow = true
    this.shadow.mapSize.set(1024, 1024)
    this.shadow.camera.near = 0.5
    this.shadow.camera.far = 500
    this.shadow.camera.left = -50
    this.shadow.camera.right = 50
    this.shadow.camera.top = 50
    this.shadow.camera.bottom = -50
  }
}

export class HemisphereLight extends THREE.HemisphereLight {
  constructor(color: number = 0xffffff, groundColor: number = 0xffffff, intensity: number = 1) {
    super(color, groundColor, intensity)
    this.position.set(0, 20, 0)
  }
}
