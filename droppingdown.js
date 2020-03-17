
var older_onload=window.onload;
window.onload=rekenen_onload;
function rekenen_onload()
{
  if (older_onload != null)
  {
    older_onload();
  }
  startGame();

}

var score=0;
var correctAnswer=6;
var nrAnswers=0;
var count=0;
var van=1;
var tot=10;
var fullcount=0;
var cyclecount=0;
var lives=3;


var paused=false;


function startGame()
{
  fullcount=0;
  cyclecount=0;
  score=0;
  lives=3;
  paused=false;
  document.getElementById('mainfield').innerHTML="";
  generateQuestion();
  showScore();
  doCycle();
}


function pauseResume()
{
  var element=document.getElementById('pauseresume');
  if (paused)
  {
    element.innerHTML="&nbsp;PAUZE";
  }
  else
  {
    element.innerHTML="&nbsp;VERVOLG";
  }
  paused=!paused;
  if (!paused)
  {
    doCycle();
  }
}


function formatScore(number)
{
  var text="0000000000000"+score;
  return "&nbsp;" + text.substring(text.length-5);
}

function showScore()
{
  document.getElementById('totalscore').innerHTML=formatScore(score);
  var i;
  var livesText="";
  for (i=0;i<lives;i++)
  {
    livesText += "&#9817; ";
  }
  document.getElementById('lives').innerHTML=livesText;
}


var offerSolution=0.95;
var solutionOffered=false;

function addAnswer()
{
  var width=document.getElementById('mainfield').offsetWidth;
  var number=correctAnswer;
  var pos=Math.floor(0.9*width*Math.random());

console.log("offerSolution="+offerSolution);

//offerSolution=0.2; //@@@ mechanisme werkt nog niet

  if (solutionOffered || Math.random()<offerSolution)
  {
    number=-tot+Math.floor((1+3*tot)*Math.random());
    if (number==correctAnswer)
    {
      number++;
    }
    offerSolution*=0.85;
  }
  else
  {
    solutionOffered=true;
    offerSolution=1;
  }

  var text="<div id='a"+count+"' class='answer unselectable' style='left:"+pos+"; top:0;' data-speed='"+(0.5+1.5*Math.random())+"' data-top='0' onclick='giveAnswer(\"a"+count+"\","+number+");'>"+number+"</div>";
//alert(text);
  document.getElementById('mainfield').innerHTML += text;
  
  count++;
}


function doCycle()
{
  var height=document.getElementById('mainfield').offsetHeight;
  var answers = document.getElementsByClassName("answer");

  cyclecount--;
  if (cyclecount<0)
  {
    cyclecount=90;
    addAnswer();
  }
  
  var i;
  for (i = 0; i < answers.length; i++)
  {
    var speed=parseFloat(answers[i].dataset.speed);
    var top=parseFloat(answers[i].dataset.top)+speed;
    answers[i].dataset.top = ""+top;

    if  (top>=height)
    {
      refuseAnswer(answers[i].id, parseInt(answers[i].innerHTML));
    }
    else
    {
      answers[i].style.top = ""+Math.floor(top);
    }
  }

  fullcount++;

  if (!paused)
  {
    var timut=25-((5*fullcount)/5000);
    if (timut<10) timut=5;
    setTimeout(function(){ doCycle(); }, timut);
  }
}

function removeElement(elementid)
{
  var element = document.getElementById(elementid);
  if (element)
  {
    element.parentNode.removeChild(element);
    nrAnswers--;
  }
}

function giveAnswer(elementid,a)
{
  var absa=(a<0) ? -a : a;
  if (correctAnswer==a)
  {
    score+=absa;
    generateQuestion();
  }
  else
  {
    score-=absa;
    if (score<0)
    {
      score=0;
    }
    alert("Jij gaf het antwoord "+a+". Het juiste antwoord was "+correctAnswer+".");
    lives--;
    generateQuestion();
  }
  showScore();
  removeElement(elementid);
  if (lives==0)
  {
    alert("Einde spel. Opnieuw?");
    startGame();
  }
}


function refuseAnswer(elementid,a)
{
  var absa=(a<0) ? -a : a;
  if (correctAnswer==a)
  {
    score-=absa;
    if (score<0)
    {
      score=0;
    }
    alert("Het juiste antwoord was "+correctAnswer+".");
    lives--;
    generateQuestion();
  }
  showScore();
  removeElement(elementid);
  if (lives==0)
  {
    alert("Einde spel. Opnieuw?");
    startGame();
  }
}
