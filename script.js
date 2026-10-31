const scene = document.getElementById('scene');
const weatherLayer = document.getElementById('weatherLayer');
const stormToggle = document.getElementById('stormToggle');

let stormMode = true;

const shapeTypes = ['triangle', 'square', 'diamond', 'hexagon', 'shard'];

function createShape() {
  const shape = document.createElement('div');
  const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
  const size = Math.random() * 18 + 12;
  const duration = (Math.random() * 1.4 + 1.1).toFixed(2);
  const drift = (Math.random() * 120 - 60).toFixed(0);
  const delay = (Math.random() * 1.5).toFixed(2);
  const opacity = (Math.random() * 0.5 + 0.45).toFixed(2);

  shape.classList.add('shape', type);
  shape.style.setProperty('--size', `${size}px`);
  shape.style.setProperty('--duration', `${duration}s`);
  shape.style.setProperty('--delay', `${delay}s`);
  shape.style.setProperty('--drift', `${drift}px`);
  shape.style.left = `${Math.random() * 100}%`;
  shape.style.opacity = opacity;

  if (type === 'shard') {
    shape.style.filter = 'drop-shadow(0 0 10px rgba(165, 200, 255, 0.34))';
  }

  weatherLayer.appendChild(shape);

  setTimeout(() => {
    shape.remove();
  }, 4200);
}

function spawnRainBurst() {
  const total = stormMode ? 22 : 8;
  for (let i = 0; i < total; i++) {
    setTimeout(createShape, i * 95);
  }
}

function updateWeather() {
  if (stormMode) {
    scene.classList.add('storm');
  } else {
    scene.classList.remove('storm');
  }

  if (stormMode) {
    spawnRainBurst();
  }
}

function triggerLightning() {
  if (!stormMode) return;

  const flash = document.createElement('div');
  flash.className = 'flash';
  scene.appendChild(flash);

  setTimeout(() => {
    flash.remove();
  }, 2600);
}

stormToggle.addEventListener('click', () => {
  stormMode = !stormMode;
  stormToggle.textContent = stormMode ? 'Trigger storm' : 'Calm weather';
  updateWeather();
});

window.addEventListener('pointermove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 24;
  const y = (event.clientY / window.innerHeight - 0.5) * 18;

  scene.style.setProperty('--tx', `${x}px`);
  scene.style.setProperty('--ty', `${y}px`);
});

setInterval(() => {
  if (stormMode) {
    spawnRainBurst();
    if (Math.random() > 0.7) {
      triggerLightning();
    }
  }
}, 900);

updateWeather();
spawnRainBurst();
setTimeout(() => {
  triggerLightning();
}, 500);
