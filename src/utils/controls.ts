export class Controls {
  public forward = false
  public backward = false
  public left = false
  public right = false

  constructor() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  private onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':    this.forward  = true; break
      case 'ArrowDown':  this.backward = true; break
      case 'ArrowLeft':  this.left     = true; break
      case 'ArrowRight': this.right    = true; break
    }
  }

  private onKeyUp = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':    this.forward  = false; break
      case 'ArrowDown':  this.backward = false; break
      case 'ArrowLeft':  this.left     = false; break
      case 'ArrowRight': this.right    = false; break
    }
  }

  public dispose() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }
}
