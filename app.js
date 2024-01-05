const Board = document.querySelector(".board");
const scoreEle = document.querySelector(".score");
const highScoreEle = document.querySelector(".high-score");


let gameover=false;
let foodX, foodY;
let snakeX=5, snakeY=10;
let snakeBody = [];
let velocityX =0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreEle.innerText = `High-Score : ${highScore}`;


const changefoodpositon = () => {
    foodX = Math.floor(Math.random()*25)+1;
    foodY = Math.floor(Math.random()*25)+1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over !");
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown"  && velocityY != -1){
        velocityX =0;
        velocityY = 1;
    }
    else if(e.key === "ArrowLeft"  && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight"  && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

const initGame = () => {
    if(gameover) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    if(snakeX === foodX && snakeY === foodY){
        changefoodpositon();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreEle.innerText = `Score : ${score}`;
        highScoreEle.innerText = `High-Score : ${highScore}`;
    }

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    snakeBody[0] = [snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;
    if(snakeX <=0 || snakeX>25 || snakeY <=0 || snakeY>25){
        gameover = true;
    }

    for(let i=0; i<snakeBody.length; i++){
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if(i !==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]=== snakeBody[i][0]){
        gameover = true;
    }
    }
    Board.innerHTML = htmlMarkup;
}
changefoodpositon();
setIntervalId=setInterval(initGame, 150);
document.addEventListener("keydown", changeDirection);


const showStartMessage = () => { 
    const startMessage = document.createElement('div');
    startMessage.id = 'start-message';
    startMessage.innerHTML = 'Click the forward key to start';
    document.body.appendChild(startMessage);
    setTimeout(() => {
        startMessage.style.display = 'none';
    }, 2000);
}
showStartMessage();

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && !gameover) {
       
        setIntervalId = setInterval(initGame, 150);
    }
});
