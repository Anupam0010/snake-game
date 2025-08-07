
let gameContainer=document.querySelector(".game-container");
let scoreContainer=document.querySelector(".score-container");
let score=0;
let foodX,foodY;
let headX=12,headY=12;
let snakeBody=[]
let velocityX=0,velocityY=0;
let gameSpeed=150;
let gameloop;
let sound=new Audio("beep.wav");


function generateFood(){
    foodX=Math.floor(Math.random()*25)+1;
    foodY=Math.floor(Math.random()*25)+1;
    for(let i=0; i<snakeBody.length; i++){
        if(snakeBody[i][1]==foodY && snakeBody[i][0]==foodX){
            generateFood();
        }
    } 
}
function gameOver(){
    clearInterval(gameloop);
    velocityX=0;
    velocityY=0;
    headX=12;
    headY=12;
   
    snakeBody=[]
    score=0;
    scoreContainer.innerHTML="score:"+score;
    gameSpeed=150;
    gameloop=setInterval(renderGame,gameSpeed);
     alert("Game over");
}
function updateSpeed(){
    if(score>50 && gameSpeed==150){
gameSpeed=100;
clearInterval(gameloop);
gameloop=setInterval(renderGame,gameSpeed);
    }

}
function renderGame(){
    let updateGame= `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    if(foodX==headX && foodY==headY){
        sound.play();
        snakeBody.push([foodX,foodY])
        generateFood();
        score+=10;
        scoreContainer.innerHTML="score:"+score;
        updateSpeed();
     
    }
    snakeBody.pop();
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY])
    if(headX==0 || headX==26 || headY==0 || headY==26){
       gameOver();
    }
    for(let i=1; i<snakeBody.length; i++){
        if(headX==snakeBody[i][0] && headY==snakeBody[i][1]){
            gameOver();
            
        }
    }
    for(let i=0; i<snakeBody.length; i++){
      updateGame+=`<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }
    
    gameContainer.innerHTML=updateGame;

}
generateFood();
// setInterval(renderGame,150);
gameloop=setInterval(renderGame,gameSpeed);


document.addEventListener("keydown",function(e){
  
    let key=e.key;
    if(key=="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
        
    }
    else if(key=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
    }
    else if(key=="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }
    else if(key=="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
    
    }
})