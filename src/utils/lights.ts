import * as THREE from 'three'

export function hemisphereLight(color: number, groundColor: number, intensity: number): THREE.HemisphereLight {
  const hemiLight = new THREE.HemisphereLight(color, groundColor, intensity)
  hemiLight.position.set(0, 20, 0)
  return hemiLight
}


export function cameraLight() {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 0, 0)
  directionalLight.castShadow = true
  return directionalLight
}
