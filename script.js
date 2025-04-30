const mensagemSpans = document.querySelectorAll('.mensagem span');
const baloesContainer = document.querySelector('.baloes-container');
let baloes = []; // Array para armazenar os balões criados
const tempoAtrasoInicial = 3000; // Tempo antes de começar a puxar para cima (ajustado)
const atrasoAparicaoBalao = 0.3; // Atraso para o balão começar antes da letra

function criarBalao(cor, x, y, index) {
    const balao = document.createElement('div');
    balao.classList.add('balao');
    balao.style.backgroundColor = cor;
    balao.style.setProperty('--initial-x', `${baloesContainer.offsetWidth / 2}px`);
    balao.style.left = `${x}px`;
    balao.style.setProperty('--x', `${x - baloesContainer.offsetWidth / 2}px`);
    balao.style.setProperty('--y', `${y}px`);
    balao.style.animationDelay = `${index * 0.3 - atrasoAparicaoBalao}s, ${index * 0.2 + 2 - atrasoAparicaoBalao}s`;
    baloesContainer.appendChild(balao);
    baloes.push(balao);

    // Inicia a animação imediatamente
    balao.style.animationPlayState = 'running';
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomDrift() {
    return (Math.random() - 0.5) * 50;
}

mensagemSpans.forEach((span, index) => {
    const rect = span.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    const cor = window.getComputedStyle(span).color;

    const balaoCor = cor === 'rgba(0, 0, 0, 0)' ? getRandomColor() : cor;

    criarBalao(balaoCor, x, y, index);

    // Faz a letra aparecer com a cor do balão
    setTimeout(() => {
        span.style.color = balaoCor;
        span.style.transition = 'color 0.5s ease-in-out';
    }, index * 200 + 800 - atrasoAparicaoBalao * 1000);

    console.log(`Letra ${span.textContent}: x=${x}, y=${y}, cor=${balaoCor}`);
});

// Aciona a animação de "puxar para cima" após um tempo maior
setTimeout(() => {
    baloes.forEach((balao, index) => {
        balao.classList.add('puxando-para-cima');
        balao.style.setProperty('--drift-x', `${getRandomDrift()}px`);
        // Remove o desaparecimento das letras aqui, pois queremos que subam
        // mensagemSpans[index].style.opacity = 0;
        // mensagemSpans[index].style.transition = 'opacity 1s ease-in-out';

        // Adiciona a classe para animar a letra para cima
        mensagemSpans[index].classList.add('subindo');
    });
}, tempoAtrasoInicial + mensagemSpans.length * 200 + 1000); // Ajuste o tempo total

// Adiciona a classe 'subindo' ao body para iniciar a animação das letras
setTimeout(() => {
    document.body.classList.add('letras-subindo');
}, tempoAtrasoInicial + mensagemSpans.length * 200 + 1500); // Um pequeno delay extra para garantir que a classe 'puxando-para-cima' dos balões já esteja ativa