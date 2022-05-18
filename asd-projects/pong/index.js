/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BoardWidth = $('#board').width();
  const BoardHeight = $('#board').height();
  const KEY_CODE = {
    UP: 38,
    DOWN: 40,
    S: 83,
    W: 87
  }
  
  // Game Item Objects
  var ball = factory('#ball');
  var paddle1 = factory('#paddle1');
  var paddle2 = factory('#paddle2');


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);  
  $(document).on('keyup', handleKeyUp);
  var player1Score = 0;
  var player2Score = 0;
  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    wallCollision(ball);
    DoCollide(ball, paddle1);
    DoCollide(ball, paddle2)
    moveObject(ball);
    moveObject(paddle1);
    moveObject(paddle2);

  }
  
  /* 
  Called in response to events.
  */
  
  function handleKeyDown(event) {
    if(event.which === KEY_CODE.UP) {
      paddle1.speedY = -5;
    }
    else if (event.which === KEY_CODE.DOWN){
      paddle1.speedY = 5;
    }
    else if (event.which === KEY_CODE.W){
      paddle2.speedY = -5;
    }
    else if (event.which === KEY_CODE.S) {
      paddle2.speedY = 5;
    }
  }
  function handleKeyUp(event){
    if(event.which === KEY_CODE.UP) {
      paddle1.speedY = 0;
    }
    else if (event.which === KEY_CODE.DOWN){
      paddle1.speedY = 0;
    }
    else if (event.which === KEY_CODE.W){
      paddle2.speedY = 0;
    }
    else if (event.which === KEY_CODE.S) {
      paddle2.speedY = 0;
    }
  }


  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function factory(id){
    var gameItem = {};
     gameItem.id = id;
     gameItem.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
     gameItem.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
     gameItem.width = $('id').width();
     gameItem.height = $('id').height();
     gameItem.speedX = 0;
     gameItem.speedY = 0;
   return gameItem;
 }
 function startBall(){
  ball.x = (BoardWidth/2) - (ball.width/2);
  ball.y = (BoardHeight/2) - (ball.height/2);
  ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
}
function moveObject(gameItem){
  gameItem.x += gameItem.speedX;
  gameItem.y += gameItem.speedY;

  $(gameItem.id).css('left',gameItem.x);
  $(gameItem.id).css('top',gameItem.y);
}
function doCollide(obj1 , obj2) {
  obj1.leftX = obj1.x;
  obj1.topY = obj1.y;
  obj1.rightX = obj1.x + $(obj1.id).width();
  obj1.bottomY = obj1.y + $(obj1.id).height();
  
  obj2.leftX = obj2.x;
  obj2.topY = obj2.y
  obj2.rightX = obj2.x + $(obj2.id).width();
  obj2.bottomY = obj2.y + $(obj2.id).height();

  if (obj1.rightX > obj2.leftX &&
    obj1.leftX < obj2.rightX &&
    obj1.bottomY > obj2.topY &&
    obj1.topY < obj2.bottomY)  {
      return true;
    
    }
  else {
    return false;
  }
  
}
function wallCollision(gameItem){
  if(gameItem.x <= 0){
    player2Score += 1;
    $('#paddle2').text(player2Score);
    if (player2Score >= 11){
      alert("Player 2 WINS");
      endGame();
    }else{
    startBall();
    }
  
  }
  if(gameItem.y <= 0){
    gameItem.speedY = -gameItem.speedY;
    gameItem.y = 0;
  }
  if(gameItem.x + gameItem.width >= BoardWidth){
    player1Score += 1;
    $('#paddle1').text(player1Score);
    if (player1Score >= 11){
      alert("Player 1 WINS");
      endGame();
    }else{
    startBall();
    }
  }
  if(gameItem.y + gameItem.height >= BoardHeight){
    gameItem.speedY = -gameItem.speedY;
    gameItem.y = BoardHeight - gameItem.height;
  }
  }
  function DoCollide(obj1, obj2){
    if (doCollide(obj1, obj2)){
      ball.speedX *= -1.5;
    };
  }
  
}
