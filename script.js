// Lista de personagens
const CHARACTERS = ['agatha', 'arthur', 'beatrice', 'carina', 'cris', 'dante', 'eduarda', 'erin', 'fernando', 'gal', 'ivete', 'joui', 'kaiser', 'kian', 'liz', 'mia', 'tristan', 'verissimo'];

// Estado do jogo
let targetCharacter = '';
let currentSelections = {
    cabeca: { index: 0, character: '' },
    corpo: { index: 0, character: '' },
    perna: { index: 0, character: '' }
};
let shuffledOrders = {
    cabeca: [],
    corpo: [],
    perna: []
};
let gameActive = true;
let gameWon = false;
let startTime = null;
let timerInterval = null;
let moves = 0;

// Embaralhar array
function shuffleArray(arr) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Gerar ordem embaralhada para cada carrossel
function generateShuffledOrders() {
    return {
        cabeca: shuffleArray(CHARACTERS),
        corpo: shuffleArray(CHARACTERS),
        perna: shuffleArray(CHARACTERS)
    };
}

// Construir carrosséis
function buildCarousels() {
    const parts = ['cabeca', 'corpo', 'perna'];
    
    parts.forEach(part => {
        const track = document.getElementById(`track${part.charAt(0).toUpperCase() + part.slice(1)}`);
        if (!track) return;
        
        track.innerHTML = '';
        const partNumber = part === 'cabeca' ? 1 : part === 'corpo' ? 2 : 3;
        
        shuffledOrders[part].forEach(character => {
            const item = document.createElement('div');
            item.className = 'carousel-item';
            
            const img = document.createElement('img');
            const imgPath = `img/${character}/${partNumber}.jpg`;
            img.src = imgPath;
            img.alt = character;
            img.onerror = () => {
                // Placeholder se imagem não existir
                img.src = `https://via.placeholder.com/300x300/667eea/white?text=${character.toUpperCase()}+${partNumber}`;
            };
            
            item.appendChild(img);
            track.appendChild(item);
        });
    });
}

// Atualizar posição dos carrosséis
function updateCarouselPositions() {
    const parts = ['cabeca', 'corpo', 'perna'];
    
    parts.forEach(part => {
        const track = document.getElementById(`track${part.charAt(0).toUpperCase() + part.slice(1)}`);
        if (track) {
            const index = currentSelections[part].index;
            track.style.transform = `translateX(-${index * 300}px)`;
            currentSelections[part].character = shuffledOrders[part][index];
        }
    });
}

// Verificar vitória
function checkVictory() {
    if (!gameActive || gameWon) return;
    
    const isComplete = 
        currentSelections.cabeca.character === targetCharacter &&
        currentSelections.corpo.character === targetCharacter &&
        currentSelections.perna.character === targetCharacter;
    
    if (isComplete) {
        gameWon = true;
        gameActive = false;
        
        if (timerInterval) clearInterval(timerInterval);
        
        const finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
        
        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = `🎉 VITÓRIA! Você montou o ${targetCharacter.toUpperCase()} em ${finalTime}s com ${moves} movimentos! 🎉`;
        messageDiv.className = 'message win';
    }
}

// Navegar no carrossel
function navigate(part, direction) {
    if (!gameActive || gameWon) return;
    
    const maxIndex = shuffledOrders[part].length - 1;
    let newIndex = currentSelections[part].index + direction;
    
    if (newIndex < 0) newIndex = maxIndex;
    if (newIndex > maxIndex) newIndex = 0;
    
    currentSelections[part].index = newIndex;
    updateCarouselPositions();
    
    moves++;
    document.getElementById('moves').textContent = moves;
    
    checkVictory();
}

// Iniciar timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    startTime = Date.now();
    timerInterval = setInterval(() => {
        if (gameActive && !gameWon) {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
            document.getElementById('timer').textContent = elapsed;
        }
    }, 100);
}

// Reiniciar jogo
function resetGame() {
    gameActive = true;
    gameWon = false;
    moves = 0;
    
    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '0.00';
    document.getElementById('message').innerHTML = '';
    document.getElementById('message').className = 'message';
    
    if (timerInterval) clearInterval(timerInterval);
    
    // Escolher personagem alvo aleatório
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    targetCharacter = CHARACTERS[randomIndex];
    document.getElementById('targetCharacter').textContent = targetCharacter.toUpperCase();
    
    // Gerar novas ordens embaralhadas
    shuffledOrders = generateShuffledOrders();
    
    // Resetar seleções
    currentSelections = {
        cabeca: { index: 0, character: shuffledOrders.cabeca[0] },
        corpo: { index: 0, character: shuffledOrders.corpo[0] },
        perna: { index: 0, character: shuffledOrders.perna[0] }
    };
    
    // Recriar carrosséis
    buildCarousels();
    updateCarouselPositions();
    
    startTimer();
}

// Configurar event listeners
function setupEventListeners() {
    document.querySelectorAll('.carousel-btn.prev').forEach(btn => {
        btn.addEventListener('click', () => {
            const part = btn.getAttribute('data-part');
            navigate(part, -1);
        });
    });
    
    document.querySelectorAll('.carousel-btn.next').forEach(btn => {
        btn.addEventListener('click', () => {
            const part = btn.getAttribute('data-part');
            navigate(part, 1);
        });
    });
    
    document.getElementById('resetBtn').addEventListener('click', resetGame);
}

// Inicializar
function init() {
    setupEventListeners();
    resetGame();
}

init();