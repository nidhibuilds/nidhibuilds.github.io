import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('background').appendChild(renderer.domElement);

// Create particles
const particles = new THREE.Geometry();
for (let i = 0; i < 5000; i++) {
  const particle = new THREE.Vector3(
    (Math.random() - 0.5) * 1000,
    (Math.random() - 0.5) * 1000,
    (Math.random() - 0.5) * 1000
  );
  particles.vertices.push(particle);
}
const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 1 });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  particleSystem.rotation.y += 0.0005;
  renderer.render(scene, camera);
}

animate(); 