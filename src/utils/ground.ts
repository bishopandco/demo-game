import * as THREE from 'three'

export class Ground {
  readonly mesh: THREE.Mesh
  scene: THREE.Scene

  constructor(
    scene: THREE.Scene,
    private size = 1000,
    textureUrl = '/textures/grid.png',
    repeatScalar = 2,
  ) {
    const tex = new THREE.TextureLoader().load(textureUrl)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(this.size / repeatScalar, this.size / repeatScalar)

    const geo = new THREE.PlaneGeometry(this.size, this.size)
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      side: THREE.DoubleSide,
      toneMapped: false,
    })

    this.mesh = new THREE.Mesh(geo, mat)
    this.mesh.rotation.x = -Math.PI / 2
    this.mesh.receiveShadow = true
    this.scene = scene
    this.scene.add(this.mesh)
  }

  dispose() {
    ;(this.mesh.geometry as THREE.BufferGeometry).dispose()
    ;(this.mesh.material as THREE.Material).dispose()
  }
}
