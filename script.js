
//ao abrir a página, já chamamos a função que pergunta 
//ao jogador com quantas cartas ele quer jogar setQtdOfCards()
setQtdOfCards();

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
        console.log(cardsList);
    }else{
        //caso não cumpra os requisitos, alerta o jogador
        alert("Insira um número par entre 4 e 14");
        //e então, pergunta novamente
        return setQtdOfCards();
    }
    //inicia o jogo
    startParrot();
}

//função que inicia o jogo
function startParrot(){
    //quando o jogo começa, precisamos alterar o html interno da classe 'allCards'
    //para que o mesmo insira a quantidade exata de cards de acordo com valor escolhido

    //elemento que vamos manipular
    const allCardsElem = document.getElementById("idAllCards");
    //variável que armazena o HTML
    let allCardsTextHTML = '';
    //vamos adicionar cada carta participante da partida no HTML, usando um 'for'
    for(k = 1; k <= cardsList.length; k++){
        allCardsTextHTML = allCardsTextHTML +
        `
        <div class="singleCard">
            <div class="cardCommon cardBack">
                <img src="./arquivos/back.png">
            </div>
            <div class="cardCommon cardFront">
                <img src="./arquivos/${cardsList[k-1]}">
            </div>
        </div>
        `;
    }
    //vamos alterar o html interno, passando o texto 'allCardsTextHTML' 
    //montado acima como conteúdo
    allCardsElem.innerHTML = allCardsTextHTML;
}