const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const scoreString = document.getElementById('score');

let scoreInt = 0;
let endLoop = false;

function tempoScore() {
    
    let loopScore = setInterval(() =>{

        if(endLoop){
            clearInterval(loopScore);
        }
        scoreInt++
        scoreString.textContent = `Score: ${scoreInt}`;

        if (scoreString >= 10){
            scoreInt += 10;
            scoreString.textContent = scoreInt;
        }
        else if (scoreInt >= 20){
            scoreInt += 20
            scoreString.textContent = scoreInt;
        }
    }, 1000)
    
}

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
    }
}, 10);

tempoScore();
