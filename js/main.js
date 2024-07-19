const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const gameBoardCss = document.querySelector('.game-board');

const scoreString = document.getElementById('score');
const gameBoard = document.getElementById('gameBoard');
const container = document.getElementById('container');

// gameBoardCss.style.background = 'linear-gradient(#8a2be2, #e0f6ff)';

// fazendo o score funcionar
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

        if(scoreInt > 500){
            gameBoardCss.style.background = 'linear-gradient(#8a2be2, #e0f6ff)';
        }

        scoreString.textContent = `Score: ${scoreInt}`;
    }, 1000);
}
tempoScore()

// fazendo a animação do pulo funcionar

const jump = () => {
    /* 
    * adiciona a classe, realizando a animação
    * porém, voce não consegue utilizar novamente, já que a classe está aplicada, não da pra aplicar a mesma classe repetidad vezes
    * */
    mario.classList.add('jump');
    /*
    * removendo a classe a cada meio segundo 
    * quando chamar a função, adiciona a classe, faz a animação, e a remove meio segundo dps, para quando chamar, ela poder fazer a animação adicionando a classe novamente 
    */
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

// deixando um evento ouvinte no documento html, para quando pressionar a seta para baixo, chamar a função jump
document.addEventListener('keydown', jump);

// fazendo o tubo, as nuvens, game over e o 'reiniciar' funcionarem
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');

    // se essas condições forem verdadeiras, significa que o mario perdeu, significa que ele tocou o tubo
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
