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
