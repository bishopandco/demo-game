# Game Demo

## Setup

```bash
  npm install
```
```bash
  npm run dev 
```

### Controls:

**Arrow Keys**: Move

## Roadmap
- [x] Collision Detection
- [ ] Hit Points
- [ ] Create an input buffer and record user inputs
- [ ] Decouple controls from sprite, make sprite subscribe to input buffer





## HitBox Notes
- Need smarter management of hitboxes and maybe a hitbox manager class.
- Fix Friction thats causing the sprite to move without any input.
- Need to keep objects in a list and iterate through them to check for collisions.
- it should be based on distance between objects - if the object is really far away it shouldn't be in the list