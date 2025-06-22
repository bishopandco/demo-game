export class Globals {
  static maxSpeed = 10
  static acceleration = 100
  static brakeDeceleration = 10
  static friction = 50
  static rotationSpeed = Math.PI
  static camDistance = 5
  static camHeight = 4
  static camLerp = 0.1
  static lookAhead = 6


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

  static setLookAhead(lookAhead: number) {
    this.lookAhead = lookAhead
  }

  static getLookAhead() {
    return this.lookAhead
  }


  static reset() {
    this.maxSpeed = 10
    this.acceleration = 10
    this.brakeDeceleration = 600
    this.friction = 50
    this.rotationSpeed = Math.PI
    this.camDistance = 2
    this.camHeight = 4
    this.camLerp = 0.1
    this.lookAhead = 6
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
