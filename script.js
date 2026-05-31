const slides = document.querySelector('.slides');
const imagens = document.querySelectorAll('.slides img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let indiceAtual = 0;

function atualizarCarrossel() {
    // Move o container horizontalmente com base no índice atual
    slides.style.transform = `translateX(${-indiceAtual * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    indiceAtual++;
    if (indiceAtual >= imagens.length) {
        indiceAtual = 0; // Volta para a primeira imagem
    }
    atualizarCarrossel();
});

prevBtn.addEventListener('click', () => {
    indiceAtual--;
    if (indiceAtual < 0) {
        indiceAtual = imagens.length - 1; // Vai para a última imagem
    }
    atualizarCarrossel();
});


// meu carrossel

const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentSlider = 0;

function hideSlider() {
    slider.forEach(item => item.classList.remove('on'));
}

function showSlider() {
    slider[currentSlider].classList.add('on');
}

function nextSlider() {
    hideSlider();
    if (currentSlider === slider.length -1) {
        currentSlider = 0
    } else{
        currentSlider++
    }
    showSlider();
}

function prevSlider() {
    hideSlider();
    if (currentSlider === 0) {
        currentSlider = slider.length - 1;
    } else {
        currentSlider--;
    }
    showSlider();
}

btnNext.addEventListener('click', nextSlider);
btnPrev.addEventListener('click', prevSlider);