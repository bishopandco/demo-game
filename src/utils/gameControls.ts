import * as THREE from 'three'
import { Globals } from '@/utils/globals.ts'

export class GameControls {
  forward = false
  backward = false
  left = false
  right = false
  private speed = 0

  private readonly keyMap: Record<string, keyof GameControls> = {
    ArrowUp: 'forward',
    KeyW: 'forward',
    ArrowDown: 'backward',
    KeyS: 'backward',
    ArrowLeft: 'left',
    KeyA: 'left',
    ArrowRight: 'right',
    KeyD: 'right',
  }

  constructor() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  update(sprite: THREE.Mesh, dt: number) {
    if (this.left)  sprite.rotation.y += Globals.rotationSpeed * dt
    if (this.right) sprite.rotation.y -= Globals.rotationSpeed * dt
    if (this.forward)  this.speed = Math.min(this.speed - Globals.acceleration * dt,  -Globals.maxSpeed)
    else if (this.backward) this.speed = Math.max(this.speed + Globals.brakeDeceleration * dt, Globals.maxSpeed)
    else {
      this.speed += this.speed > 0 ? -Globals.friction * dt : Globals.friction * dt
      if (Math.abs(this.speed) < 0.01) this.speed = 0
    }
    const dir = new THREE.Vector3(Math.sin(sprite.rotation.y), 0, Math.cos(sprite.rotation.y))
    sprite.position.addScaledVector(dir, this.speed * dt)
  }

  dispose() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const k = this.keyMap[e.code]
    if (k) (this as any)[k] = true
  }
  private onKeyUp = (e: KeyboardEvent) => {
    const k = this.keyMap[e.code]
    if (k) (this as any)[k] = false
  }
}
