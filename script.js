//lista de todas as cartas disponíveis para a partida
const cardsAvailable = 
[
    'bobrossparrot.gif', 
    'fiestaparrot.gif', 
    'revertitparrot.gif',
    'metalparrot.gif',
    'explodyparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
]; 
//lista de cartas que farão parte da partida
let cardsList = []; 
//quantidade de cartas escolhidas pelo jogador
let qtdOfCards;
//variável de iteração
let j;
let k;
//lista que representa o par de cartas de cada jogada (é populada e resetada a cada par de cartas escolhidas)
let pairOfCards = [];
let numberOfCardsFlipped = 0;
let numberOfPlays = 0;
let limite = 0;

//função que define a quantidade de cartas escolhidas
function setQtdOfCards(){
    //pergunta ao jogador com quantas cartas ele quer jogar, e armazena em uma variável
    qtdOfCards = prompt("Com quantas cartas você quer jogar?");
    //verifica os requisitos de partida
    if(qtdOfCards <= 14 && qtdOfCards >= 4 && qtdOfCards % 2 == 0){
        //devemos adicionar as cartas disponíveis na lista das cartas da partida, 
        //de acordo com a quantidade que o jogador escolheu (precisamos fazer 2 
        //push por vez para adicionar um par de carta igual)
        for(j = 1; j <= (qtdOfCards/2); j++){
            cardsList.push(cardsAvailable[j-1]);
            cardsList.push(cardsAvailable[j-1]);
        }
    }else{
        //caso não cumpra os requisitos, alerta o jogador
        alert("Insira um número par entre 4 e 14");
        //e então, pergunta novamente
        return setQtdOfCards();
    }
    //randomiza a lista de cartas
    cardsList = cardsList.sort(randomize);
    console.log(cardsList);
    //inicia o jogo
    startParrot();
}

//função que inicia o jogo
function startParrot(){

    //buscando o elemento 'allCards que vamos manipular
    const allCardsElem = document.getElementById("idAllCards");
    //variável que armazena o HTML
    let allCardsTextHTML = '';
    //vamos adicionar cada carta participante da partida no HTML, usando um 'for'
    for(k = 1; k <= cardsList.length; k++){
        allCardsTextHTML = allCardsTextHTML +
        `
        <div class="singleCard" onclick="flipCard(this)" id="${cardsList[k-1]}">
            <div class="cardCommon cardFront">
                <img src="./arquivos/${cardsList[k-1]}">
            </div>
            <div class="cardCommon cardBack">
                <img src="./arquivos/back.png">
            </div>
        </div>
        `;
    }
    //alterar o html interno, passando o texto 'allCardsTextHTML' 
    //montado acima como conteúdo
    allCardsElem.innerHTML = allCardsTextHTML;
}

function flipCard(card){
    //caso já tenhamos feito duas ou mais jogadas, retorna
    if(pairOfCards.length >= 2){
        return;
    }
    //flipa a carta, adicionando a classe que faz o transform
    card.classList.add("cardFlipped");
    //adiciona a carta clicada na lista 'pairOfCards'
    pairOfCards.push(card);
    //chama a função que verifica se acertamos ou erramos a jogada
    verifyCards();
}

function verifyCards(){
    //caso a segunda jogada ainda não tenha sido feita, retorna
    if(pairOfCards[1] === undefined){
        return;
    }
    //verifica se acertamos ou erramos, comparando o id das duas cartas
    if(pairOfCards[0].id === pairOfCards[1].id){ //ACERTAMOS
        //acrescenta o numero de jogadas
        numberOfPlays++;
        //acrescenta em 2 o número de cartas viradas
        numberOfCardsFlipped = numberOfCardsFlipped + 2;
        //zera o par de cartas da jogada
        pairOfCards = [];
        //verifica se ganhamos ou ainda não
        verifyWin();
    }else{ //ERRAMOS
        //acrescenta o numero de jogadas
        numberOfPlays++;
        //esperamos um segundo e desviramos os cards
        setTimeout(unflipCard, 1500);
    }
}

function unflipCard(){
    //desvira todas as cartas da lista de jogadas
    for(let i = 0; i < pairOfCards.length; i++){
        pairOfCards[i].classList.remove("cardFlipped");
    }
    //reseta a lista
    pairOfCards = [];
}

function verifyWin(){
    //caso o número de cartas viradas é igual ao número de cartas em jogo, você venceu
    if(numberOfCardsFlipped == qtdOfCards){
        alert(`Você ganhou em ${numberOfPlays*2} jogadas`);
        //resetamos o número de jogadas
        numberOfPlays = 0;
    }
}

function randomize(){
    return Math.random() - 0.5; 
}

//ao abrir a página, a função que pergunta é chamada e pergunta
//ao jogador com quantas cartas ele quer jogar setQtdOfCards()
setQtdOfCards();