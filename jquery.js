var playing = false;
var score;
var trialsLeft;
var step;
var action;//used for setInterval
var fruits = ['apple', 'banana', 'cherry', 'grape', 'mango', 'orange', 'peach', 'pear', 'pineapple'];

$("#instruction").show();

$(function(){//click on start reset button
    $("#startreset").click(function(){//we are playing
        if(playing == true){//reload page
            location.reload();
        }
        else{//we are not playing
            playing = true;//game initiated
            //set score to 0
            score=0;
            //set score to 0
            $("#scorevalue").html(score);
            //show trials left 
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();//hide game over box
            $("#gameover").hide();//change button text to reset game
            $("#startreset").html("RESET");//start sending fruits
            startAction();
            $("#gamestart")[0].play();
            $("#instruction").hide();
        }
    });
    
    //slice a fruit
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);//update score//    document.getElementById("slicesound").play();
        $("#squish")[0].play();//play sound
        //stop fruit
        clearInterval(action);
        //hide fruit
        $("#fruit1").hide("explode",300);//slice fruit
        //send new fruit
        setTimeout(startAction,300);});//functions
    
    //fill trialLeft box with hearts
    function addHearts(){
        $("#trialsLeft").empty();
        for(i = 0; i<  trialsLeft; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    }//start sending fruits
    
    function startAction(){//generate a fruit
        $("#fruit1").show();
        chooseFruit();//choose a random fruit
        $("#fruit1").css({'left': Math.round(400 * Math.random()), 'top': -50});//random position//generate a random step
        step = 1 + Math.round(5 * Math.random());// change step// Move fruit down by one step every 10ms
        action = setInterval(function(){//move fruit by one step
            $("#fruit1").css('top', $("#fruit1").position().top + step);//check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){//check if we have trials left
                if(trialsLeft > 1){//generate a fruit
                    $("#fruit1").show();
                    chooseFruit();//choose a random fruit
                    $("#fruit1").css({'left': Math.round(400 * Math.random()), 'top': -50});//random position//generate a random step
                    step = 1 + Math.round(5 * Math.random());// change step
//reduce trials by one 
                    trialsLeft--;//populate trialsLeft box
                    addHearts();
                    $("#wrong")[0].play();
                }
                else{// game over
                    playing = false;//we are not playing anymore
                    $("#startreset").html("START");// change button to Start Game
                    $("#gameover").show();
                    $("#gameover").html('<p>Game Over!</p><p>Your score is '+score+'<br>Press start for new game</p>');
                    $("#trialsLeft").hide();
                    $("#gameend")[0].play();
                    stopAction();
                }
            }
        },10);
    }// generate a random fruit
    
    function chooseFruit(){
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
        }//Stop dropping fruits
    
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});