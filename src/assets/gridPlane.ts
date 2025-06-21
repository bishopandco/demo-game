import * as THREE from 'three'

export function buildGridPlane() {
  const planeSize = 1000
  const loader = new THREE.TextureLoader()
  const gridTex = loader.load('/textures/grid.png')
  gridTex.wrapS = gridTex.wrapT = THREE.RepeatWrapping
  gridTex.repeat.set(planeSize / 2, planeSize / 2)

  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
  const planeMat = new THREE.MeshBasicMaterial({
    map: gridTex,
    side: THREE.DoubleSide,
  })
  const gridPlane = new THREE.Mesh(planeGeo, planeMat)
  gridPlane.rotation.x = -Math.PI / 2
  return gridPlane
}
