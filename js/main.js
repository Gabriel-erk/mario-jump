/* querySelector é usado para selecionar o primeiro elemento no documento que corresponde ao seletor css especificado, no caso '.mario', é o seletor css que procura por elementos com a classe css chamada `mario` - em resumo, esta armazenando a imagem(gif) do mario, é como se fosse um getElementById */
// a variavel constante esta armazendo o resultado da busca de document.querySelector('.mario')
const mario = document.querySelector('.mario');

// pegando o elemento do tubo
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');


// criando função jump, que adiciona a classe jump do css (que executa a animação do mario, de pular)
const jump = () => {
    // aqui adiciona a classe e a animação acontece (mario vai para cima e desce)
    mario.classList.add('jump');


    /* sera criado a função setTimeout para resolver o problema atual, onde, a classe jump é adicionada e executada ao pressionar qualquer tecla do teclado, porem, ela é adicionada e executada apenas uma vez, nao se pode pular denovo, para isso, preciso remove-la apos 500 milisegundos (que é o tempo da animação), para poder executar novamente a animação sempre que eu quiser */

    /* chamando a função setTimeout, que recebe 2 parametros, uma função e o tempo que sera aguardado para executar a função - passei uma função anonima como parametro, que remove a classe jump - e o tempo a ser esperado, é de 500 milissegundos, que o tempo que minha animação dura */
    setTimeout(()=> {
        mario.classList.remove('jump');
    }, 500);
}

// adicionando no html um escutador de evento do tipo kewydown (ou seja, quando baixar qualquer tecla),  e chamara a função jump)
document.addEventListener('keydown', jump);

// criando um loop que ira verificar de 10 em 10 milissegundo se a img do cano teve contato com a img do mario
const loop = setInterval(() => {

    // basicamente, pipePosition recebe o valor esquerdo do pipe (recbe o left atual do cano)
    const pipePosition = pipe.offsetLeft;

    /* resolvendo outro problema, para conseguir acessar o bottom do mario (pois, quero verificar se, o mario pulou sobre o tubo, a partir do seu bottom atual (a partir da altura do mario naquele momento)), para isso preciso acessar o bottom do mario, porem nao da forma que utilizei para left (ex: const marioPosition = mario.offsetBottom), pois me retorna um valor undefined*/ 

    /*  getComputedStyle (metodo de window, que manipula a janela do navegador), pegara o estilo que foi computado na imagem do mario, e passamos o elemento que queremos pegar (agora podemos acessar qualquer propriedade css do elemento mario), no caso, 'mario' e logo, a propriedade alvo, bottom - utilizei o replace para remover o 'px' que aparece no console do navegador e substituir por nada '' (porem ainda continua como string o valor de marioPosition) - simbolo de + é para tentar converter o valor em number (para poder enxergar como numero no console do navegador e fazer futuros calculos) (agora marioPosition é um number que posso manipular)*/
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // mostrando no console do navegador, a posição atual do mario, ou seja, ao pular, ele mostra desde a posição inicial do mario ate a posição final em numeros
    console.log(marioPosition)

    const cloudsPosition = clouds.offsetRight;

    // se a posição esquerda do tubo for 120 e a posição do tubo for maior que 0 (ou seja, o tubo ainda esta abaixo do mario, em outras palavras, o tubo ainda nao saiu da tela, quando ele sair da tela(ou seja, quando sua posição for menor que 0, pois 0 é a posição em que o tubo nao aparece mais) significa que o tubo nao vai mais estar embaixo do mario, e nao tem como ele cair e acertar o tubo, ja que, se parar para reparar, a posição do mario, nao muda, somente a do tubo, e enquanto o tubo estiver na posição acima de 0 o mario pode acertar o tubo) e a posição do mario menor que 80 (no caso, se a altura que o mario esta for menor que 80, significa que ele atingiu o tubo) o jogo acaba
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        /* definindo que, quando o left de pipe for menor ou igual a 120px (left é como o rigth, top, bottom, propriedades de position: absolute, quando left chega em 120px ou menos, ele ja esta em contato com a img do mario, oq significa que o jogo acabou, vc perdeu, e quando isso acontecer, preciso que a animação pare) */

        //.style.animation acessa a propriedade animetion do estilo css aplicado ao elemento pipe (no caso a imagem do tubo) = 'none', atribui o valor none a propriedade animation, que significa que qualquer animação atualmente aplicada ao elemento sera removida
        pipe.style.animation = 'none';

        /* corrigindo outro problema, que, ao acertar o mario, o tubo volta para sua posição original, no canto inferior esquerdo da tela, que nao quero que aconteça, quero que o tubo permaneça na posição onde atingiu o mario*/ 

        // alterando a posição do tubo para a mesma posição em que atingiu o mario (pipePosition guarda o valor em pixels do tubo onde mario foi atingido, entao coloco sua posição atual, para onde mario foi atingido)
        pipe.style.left = `${pipePosition}px`;

        /* parando a animação do mario exatamente onde ele caiu sobre o tubo */

        mario.style.animation = 'none';
        // utilizando px pois é o valor em pixels
        mario.style.bottom = `${marioPosition}px`;

        /* como peguei o elemento mario (que é uma imagem), tenho acesso a todos os atributos dela, como no caso, o src - quero alterar para esta imagem sempre que o mario tiver contato com o tubo e perder (perdeu, mostrara esta imagem, fora as condições colocadas acima)*/
        mario.src = './images/game-over.png';
        // alterando a largura da imagem que coloquei (que se tornou a imagem atual - sim, sei que é simples demais e pouco especifico, porem funciona)
        mario.style.width = '75px';
        // alterando o tamanho da margem esquerda da imagem (pois estava tendo um espaço em branco muito grande dela com o tubo quando aparecia)
        mario.style.marginLeft = '50px';

        clouds.style.animation = 'none';
        clouds.style.right = `${cloudsPosition}px`;

        /* cancelando a execulçao do intervalo de tempo em que o loop sera executado(verificando continuamente as posições do tubo e do mario, que acaba se repetindo ifinitamente quando as condições sao atendidas), passando o identificador do intervalo que quero cancelar, que esta armazenado dentro da variavel constante chamada 'loop' (ou seja, depois da função ser executada uma vez, nao sera executada novamente apos 10 milisegundos - o loop para de rodar)*/
        clearInterval(loop);
    }
}, 10);
