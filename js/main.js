const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const scoreString = document.getElementById('score');
const gameBoard = document.getElementById('gameBoard');
const container = document.getElementById('container');

let scoreInt = 0;
let endLoop = false;

function tempoScore() {
    let loopScore = setInterval(() => {
        if (endLoop) {
            clearInterval(loopScore);
            return; // Encerra o intervalo se endLoop for verdadeiro
        }

        if (scoreInt <= 9) {
            scoreInt++;
        } else if (scoreInt <= 90) {
            scoreInt += 10;
        } else {
            scoreInt += 20;
        }

        scoreString.textContent = `Score: ${scoreInt}`;
    }, 1000);
}
tempoScore()

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

document.addEventListener('keydown', jump);

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsPosition}px`;
        
        clearInterval(loop);
        endLoop = true;

        const divAgrupaGameOver = document.createElement('div');
        divAgrupaGameOver.id = 'agrupaGameOver';

        container.appendChild(divAgrupaGameOver);

        const gameOver = document.createElement('h1');
        gameOver.textContent = 'Fim de Jogo';
        gameOver.classList.add('gameOver');

        divAgrupaGameOver.appendChild(gameOver);

        const restart = document.createElement('a');
        restart.classList.add('restartButton');
        restart.textContent = 'Deseja Reiniciar o jogo?';
        
        restart.addEventListener('click', function(){
            // função para reiniciar o jogo (atualizar a página, por padrão, recarrega a partir do cache do navegador, podendo receber parametos que mudam este comportamento)
            window.location.reload();
        })

        divAgrupaGameOver.appendChild(restart);

        
    }
}, 10);
