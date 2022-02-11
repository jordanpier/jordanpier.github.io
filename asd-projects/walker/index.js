
/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37, 
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  }
  // Game Item Objects
var positionX = 0; //the x-coordinate location for the box 
var positionY = 0; //the y-coordinate location for the box
var speedX = 0; // the speed for the box along the x-axis
var speedY = 0; //the speed for the box along the y-axis 
  
// one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repostionGameItem();
    redrawGameItem();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.LEFT){
      speedX = -5;
  }
    if(event.which === KEY.RIGHT){
      speedX = 5;
  }
    if(event.which === KEY.UP){
      speedY = -5;
  }
    if(event.which === KEY.DOWN){
      speedY = 5;
  }
}
  function handleKeyUp(){
    speedX = 0;
    speedY = 0; 
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

  

  function repostionGameItem(){
    positionX += speedX; //update the position of the box along the x-axis
    positionY += speedY; // update the position of the box along the y-axis
  }
  function redrawGameItem(){
    $("#walker").css("left", positionX); // draw box in new location, positionX pixels away 
    // from the left of the screen
    $("#walker").css("top", positionY); // draw box in new location, positionY pixels away 
    // from the top  of the screen
  }
}