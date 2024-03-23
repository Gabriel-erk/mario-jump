const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

const scoreString = document.getElementById('score');

let scoreInt = 0;

let endLoop1 = false;
let endLoop2 = false;
let endLoop3 = false;

function tempoScore() {

    if (endLoop1 == false) {
        const loopScore = setInterval(() => {
            if (endLoop1) {
                clearInterval(loopScore);
                endLoop2 = true;
                endLoop3 = true;
            }
            else {
                scoreInt++
                scoreString.textContent = scoreInt;
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(loopScore);
            if (!endLoop1) {
                const loopScore2 = setInterval(() => {
                    if (endLoop2) {
                        clearInterval(loopScore2)
                    }
                    else {
                        scoreInt += 10;
                        scoreString.textContent = scoreInt;
                    }
                }, 1000);

                setTimeout(() => {
                    clearInterval(loopScore2);
                    if (!endLoop1) {
                        const loopScore3 = setInterval(() => {
                            if (endLoop3) {
                                clearInterval(loopScore3);
                            }
                            else {
                                scoreInt += 20;
                                scoreString.textContent = scoreInt;
                            }
                        }, 1000);
                    }
                }, 10000);
            }
        }, 10000);
    }
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
        endLoop1 = true;
        endLoop2 = true;
    }
}, 10);

tempoScore();
