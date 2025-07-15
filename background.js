import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create particles using BufferGeometry
const particles = new THREE.BufferGeometry();
const particleCount = 12000;
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 600;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
}
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2.5 });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 2.8;

function animate() {
  requestAnimationFrame(animate);
  particleSystem.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate(); 