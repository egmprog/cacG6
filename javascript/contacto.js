/*------------------*/

let sliderInner = document.querySelector(".slider--inner");
let images = sliderInner.querySelectorAll("img");
let texts = sliderInner.querySelectorAll("p"); // Selección de todos los elementos <p> dentro del slider
let index = 0;
const totalImages = images.length;
const imageWidth = images[0].clientWidth; // Ancho de cada imagen

// Oculta todas las imágenes y textos, excepto la primera
for (let i = 1; i < totalImages; i++) {
    images[i].classList.add('hidden');
    texts[i].classList.add('hidden-text');
}
function nextSlide() {
    images[index].style.visibility = 'hidden'; // Oculta la imagen actual
    texts[index].style.visibility = 'hidden'; // Oculta el texto de la imagen actual
    index = (index + 1) % totalImages; // Avanza al siguiente índice, asegurándose de volver al principio si llega al final
    images[index].style.visibility = 'visible'; // Muestra la nueva imagen
    texts[index].style.visibility = 'visible'; // Muestra el texto de la nueva imagen
    updateSlider(); // Actualiza la posición del slider
}

function prevSlide() {
    images[index].style.visibility = 'hidden'; // Oculta la imagen actual
    texts[index].style.visibility = 'hidden'; // Oculta el texto de la imagen actual
    index = (index - 1 + totalImages) % totalImages; // Retrocede al índice anterior, asegurándose de volver al final si llega al principio
    images[index].style.visibility = 'visible'; // Muestra la nueva imagen
    texts[index].style.visibility = 'visible'; // Muestra el texto de la nueva imagen
    updateSlider(); // Actualiza la posición del slider
}


document.getElementById('botonPrevio').addEventListener('click', prevSlide);
document.getElementById('botonSiguiente').addEventListener('click', nextSlide);