export class Globals {
  static maxSpeed = 30
  static acceleration = 400
  static brakeDeceleration = 600
  static friction = 50
  static rotationSpeed = Math.PI
  static camDistance = 2
  static camHeight = 4
  static camLerp = 0.1

  //   create methods to access and manipulate these properties
  static setMaxSpeed(speed: number) {
    this.maxSpeed = speed
  }

  static getMaxSpeed() {
    return this.maxSpeed
  }

  static setAcceleration(accel: number) {
    this.acceleration = accel
  }

  static getAcceleration() {
    return this.acceleration
  }

  static setBrakeDeceleration(decel: number) {
    this.brakeDeceleration = decel
  }

  static getBrakeDeceleration() {
    return this.brakeDeceleration
  }

  static setFriction(friction: number) {
    this.friction = friction
  }

  static getFriction() {
    return this.friction
  }

  static setRotationSpeed(speed: number) {
    this.rotationSpeed = speed
  }

  static getRotationSpeed() {
    return this.rotationSpeed
  }

  static setCamDistance(distance: number) {
    this.camDistance = distance
  }

  static getCamDistance() {
    return this.camDistance
  }

  static setCamHeight(height: number) {
    this.camHeight = height
  }

  static getCamHeight() {
    return this.camHeight
  }

  static setCamLerp(lerp: number) {
    this.camLerp = lerp
  }

  static getCamLerp() {
    return this.camLerp
  }

  static reset() {
    this.maxSpeed = 30
    this.acceleration = 400
    this.brakeDeceleration = 600
    this.friction = 50
    this.rotationSpeed = Math.PI
    this.camDistance = 2
    this.camHeight = 4
    this.camLerp = 0.1
  }

  static getAll() {
    return {
      maxSpeed: this.maxSpeed,
      acceleration: this.acceleration,
      brakeDeceleration: this.brakeDeceleration,
      friction: this.friction,
      rotationSpeed: this.rotationSpeed,
      camDistance: this.camDistance,
      camHeight: this.camHeight,
      camLerp: this.camLerp,
    }
  }
}
