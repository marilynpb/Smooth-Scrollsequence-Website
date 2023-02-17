const video = document.getElementById('my-video');
const scrollThreshold = 0.01; // Define la cantidad de píxeles necesarios para desencadenar la actualización de tiempo de reproducción

window.addEventListener('wheel', (event) => {
  event.preventDefault(); // Evita que la página se desplace automáticamente cuando el usuario desplaza la rueda del mouse
  
  // Comprueba la dirección del desplazamiento de la rueda del mouse y actualiza el tiempo de reproducción del video en consecuencia
  if (event.deltaY < -scrollThreshold) {
    video.currentTime -= 0.3; // Retrocede el video en un segundo
  } else if (event.deltaY > scrollThreshold) {
    video.currentTime += 0.3; // Avanza el video en un segundo
  }
});