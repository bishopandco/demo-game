import * as THREE from 'three'

export function createSkyDome(radius = 500): THREE.Mesh {
  const vertexShader = /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = /* glsl */`
    varying vec2 vUv;

    // Simple 2D hash
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    // Value noise
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      // Four corners
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      // Smooth interpolation
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
    }
    // Fractal Brownian Motion
    float fbm(vec2 p) {
      float v = 0.0;
      float amp = 0.5;
      for(int i = 0; i < 5; i++) {
        v += amp * noise(p);
        p *= 2.0;
        amp *= 0.5;
      }
      return v;
    }

    void main() {
      // base sky gradient
      float y = vUv.y * 1.2 - 0.1;
      vec3 skyCol = mix(vec3(0.01, 0.02, 0.05), vec3(0.0), smoothstep(0.0, 1.0, y));

      // Milky Way band
      float n = fbm(vUv * vec2(2.0, 5.0) + vec2(0.0, 0.3));
      float band = smoothstep(0.4, 0.6, vUv.y + (n - 0.5) * 0.2);
      vec3 milky = vec3(0.8, 0.7, 0.6) * band * 0.5;

      // Stars
      vec2 uvStar = vUv * 200.0;
      float r = hash(floor(uvStar));
      float star = smoothstep(0.995, 1.0, r) * pow(r, 50.0);

      vec3 col = skyCol + milky + vec3(star);

      gl_FragColor = vec4(col, 1.0);
    }
  `

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.BackSide,
    depthWrite: false,
    toneMapped: false,
  })

  const geometry = new THREE.SphereGeometry(radius, 64, 32)
  const mesh = new THREE.Mesh(geometry, material)
  mesh.frustumCulled = false
  return mesh
}
