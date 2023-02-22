const video = document.getElementById('my-video');
const scrollThreshold = 0.1;
let animationId = null;
let targetTime = video.currentTime;
let animationRunning = false;

function handleWheelEvent(event) {
  event.preventDefault();

  if (event.deltaY < -scrollThreshold) {
    targetTime -= 0.05;
  } else if (event.deltaY > scrollThreshold) {
    targetTime += 0.05;
  }

  if (!animationRunning) {
    animationRunning = true;
    animationId = requestAnimationFrame(updateVideoFrame);
  }
}

function updateVideoFrame(currentTime) {
  const deltaTime = (currentTime - lastUpdateTime) / 1000;
  lastUpdateTime = currentTime;
  
  const currentPosition = video.currentTime;
  const distance = targetTime - currentPosition;
  const velocity = distance / deltaTime;

  const interpolatedTime = lerp(currentPosition, targetTime, deltaTime * 10);
  video.currentTime += velocity * deltaTime;

  if (Math.abs(distance) > 0.01) {
    animationId = requestAnimationFrame(updateVideoFrame);
  } else {
    animationRunning = false;
    animationId = null;
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function handleError(error) {
  console.error(error);
  animationRunning = false;
  animationId = null;
}

window.addEventListener('wheel', handleWheelEvent);

// Start the animation loop
let lastUpdateTime = performance.now();
try {
  animationId = requestAnimationFrame(updateVideoFrame);
} catch (error) {
  handleError(error);
}