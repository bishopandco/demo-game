import * as THREE from 'three'

export function updateCamera(
  camera: THREE.PerspectiveCamera,
  sprite: THREE.Mesh,
  camHeight: number,
  camDistance: number,
  camLerp: number,
) {
  const localOffset = new THREE.Vector3(0, camHeight, camDistance + 5)
  const worldOffset = localOffset.clone().applyQuaternion(sprite.quaternion).add(sprite.position)
  camera.position.lerp(worldOffset, camLerp)
  camera.quaternion.slerp(sprite.quaternion, camLerp)
}
