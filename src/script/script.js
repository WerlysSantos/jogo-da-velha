const caixas = Array(9).fill(null);
const jogadorDaVez = document.getElementById('jogadorDaVez');
const tabuleiro = document.querySelector('.tabuleiro');
tabuleiro.addEventListener('click', clickBox);
let jogador = 'X';

function alternarJogador() {
    jogador = (jogador === 'X') ? 'O' : 'X';
    jogadorDaVez.innerText = `Vez do jogador:\n ${jogador}`;
}

function clickBox(event) {
    const dataCaixa = event.target;
    const caixaConverter = parseInt(dataCaixa.dataset.caixa);
    
    if (!event.target.dataset.caixa) return;
    if (caixas[caixaConverter] !== null) return;

    dataCaixa.innerText = jogador;
    caixas[caixaConverter] = jogador;

    if (!definirGanhador() && !empate()) {
        alternarJogador();
    }
}

function definirGanhador() {
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of combinacoes) {
        if (caixas[a] && caixas[a] === caixas[b] && caixas[a] === caixas[c]) {
            jogadorDaVez.innerText = `O jogador ${caixas[a]} Ganhou!`;

            document.querySelector(`[data-caixa = "${a}"]`).classList.add('vencedor');
            document.querySelector(`[data-caixa = "${b}"]`).classList.add('vencedor');
            document.querySelector(`[data-caixa = "${c}"]`).classList.add('vencedor');

            tabuleiro.removeEventListener('click', clickBox);
            jogarNovamente();
            return true;
        }
    } return false;
}

function empate() {
    if (!caixas.includes(null) && !definirGanhador()) {
        jogadorDaVez.innerText = `Deu Velha!`;
        tabuleiro.removeEventListener('click', clickBox);
        jogarNovamente();
        return true;
    }
    return false;
}

function jogarNovamente() {
    let sectionFinal = document.getElementById('sectionFinal');
    
    if (sectionFinal.querySelector('button')) return;

    const botao = document.createElement("button");
    botao.textContent = 'Jogar Novamente';
    sectionFinal.appendChild(botao);

    botao.addEventListener('click', () => {
        const divs = document.querySelectorAll('[data-caixa]');
        divs.forEach(div => {
            div.textContent = ''
            div.classList.remove('vencedor');
        });

        caixas.fill(null);
        jogador = 'X';
        jogadorDaVez.innerText = `Vez do jogador:\n X`;

        tabuleiro.addEventListener('click', clickBox);
        botao.remove();
    });
}