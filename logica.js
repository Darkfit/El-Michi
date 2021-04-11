
//elementos html 
//botones
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
//celdas
const cellDivs =  document.querySelectorAll('.game-cell');

//constantes del juego

const xSymbol = 'x';
const oSymbol = 'o';

//variables para la logica del juego
let gameIsLive = true;
let xIsNext = true;
//let winner = null; borra xq no se usa mucho ni es taan necesario

//funciones para el juego

const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === 'x') {
      statusDiv.innerHTML = `${letter} ha ganado!`;
      // se hace con alt gr + } q esta al costado del enter

    } else {
      statusDiv.innerHTML = `<span>${letter} ha ganado!</span>`;
    }
  };


const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    //verificar ganador

    console.log(topLeft,topMiddle,topRight,middleLeft,middleMiddle,
        middleRight,bottomLeft,bottomMiddle,bottomRight);

    //funcion de logica para un ganador
   
   
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
      } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
      } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
      } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
      } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
      } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
      } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = 'Empate!';
      } else {
        xIsNext = !xIsNext;
        if (xIsNext) {
          statusDiv.innerHTML = `${xSymbol} es siguiente`;
        } else {
          statusDiv.innerHTML = `<span>${oSymbol} es siguiente</span>`;
        }
      }

     
};


//event handlers
const handleReset = (e) => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} es siguiente`;
    gameIsLive = true;
    //winner = null;
    for(cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
       
};

const handleCellClick = (e) =>{
    //console.log(e.target.classList);//se borro en el videaso ps
    const classList = e.target.classList;
    //const location = e.target.classList[1]; //se borro en el videaso ps

    if(!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
        return;//para no hacer nada
    } 
    if(xIsNext)
    {
        classList.add('x');/*agregar una clase x*/
        checkGameStatus();
    }else{
        classList.add('o');
        checkGameStatus();
    }
    

};

//event listenners
resetDiv.addEventListener('click',handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click',handleCellClick)
}
