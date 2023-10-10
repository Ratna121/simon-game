// document.querySelector("#green").addEventListener("click",function(){
//     var audio = new Audio("sounds/green.mp3");
//     audio.play();
// });

// $("#green").click(function(){
//     var audio = new Audio("sounds/green.mp3");
//     audio.play();
// });

// $("#red").click(function(){
//     var audio = new Audio("sounds/red.mp3");
//     audio.play();
// });

// $("#yellow").click(function(){
//     var audio = new Audio("sounds/yellow.mp3");
//     audio.play();
// });

// $("#blue").click(function(){
//     var audio = new Audio("sounds/blue.mp3");
//     audio.play();
//     nextSequence();
// });

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started=true;
  }
});

$(".btn").click(function () {
  var userChosenColour = this.id;
  // alert("userChosenColour: "+userChosenColour);
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  // alert("random: "+randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  // alert("randomChosenColour: "+randomChosenColour);
  gamePattern.push(randomChosenColour);
  // alert("gamePattern: "+gamePattern);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // alert("currentLevel: " +currentLevel);

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    // console.log("success: " + userClickedPattern[currentLevel] + " and " + gamePattern[currentLevel]);

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  } else {
   
    // console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}

function startOver(){
 level =0;
 gamePattern = [];
 started= false;
}
