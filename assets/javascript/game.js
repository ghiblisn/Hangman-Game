 
$(document).ready(function(){ 
  var winCounter=0;
  var lostCounter=0;
  var randomNum=0;
  var wordsBankFull=
    ["BACKSTREETBOYS",
    "BRITNEYSPEARS",
    "DESTINYSCHILD",
    "CELINEDION", 
    "RICKYMARTIN",
    "WHITNEYHOUSTON",
    "EMINEM"];
  var musicBank=
    ['<iframe width="100%" src="https://www.youtube.com/embed/9x29MMkoxHk?autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>',
    '<iframe width="100%" src="https://www.youtube.com/embed/Paib17TLFCY?autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>',
    '<iframe width="100%" src="https://www.youtube.com/embed/zR79eht1SWg?autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>',
    '<iframe width="100%" src="https://www.youtube.com/embed/xohMVvOt5s8?autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>',
    '<iframe width="100%" src="https://www.youtube.com/embed/PnuHtrUDvWY?autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>',
    '<iframe width="100%" src="https://www.youtube.com/embed/9FygjkalAL4?autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>',
    '<iframe width="100%" src="https://www.youtube.com/embed/0915CYX5YVg?autoplay=1&iv_load_policy=3" frameborder="0" allowfullscreen></iframe>'
    ]
  var wordsBank=wordsBankFull;
  var totalGames = wordsBank.length;
  var currentMusic="";
  var previousMusic="Music never sleeps!"
  splitUpWordBank();

  var currentWord = [];
  var guessDisplay = "";
  var letterGuessed =[];
  var letterGuessedExcludeCorrect =[];
  var guessCorrect = 0;
  var numberGuessesRemain = 0;
  var html = "";
  //console.log(JSON.stringify(wordsBank));
  //console.log(wordsBank);

  resetVarForNewWord();
  generateNewWord();
  updateHTML();

  document.onkeyup = function(event) {
    if((winCounter+lostCounter)<totalGames){
      if(event.keyCode>64 && event.keyCode<91){
        updateLetterGuessed();
      }
      else{
        //alert("Please press a letter key!");
      };

      guessDisplay ="";
      guessCorrect =0;

      for(var j=0;j<currentWord.length;j++){
        if(letterGuessed.indexOf(currentWord[j])>-1){
          guessDisplay += currentWord[j];
          guessCorrect +=1;
        }
        else{
          guessDisplay += "_ ";
        }
      };

      if(guessCorrect==currentWord.length){
        winCounter+=1;
        previousMusic=currentMusic;
        $(".musicArea").html(previousMusic);
      };
        
      if((guessCorrect==currentWord.length && wordsBank.length>0)||numberGuessesRemain==0){
        resetVarForNewWord();
        generateNewWord();
      };

      updateHTML()
    }
    else{
      alert("Game Over!");
    };
  };
  
  //Function definitions

  function splitUpWordBank(){
    for(var n=0; n<wordsBankFull.length; n++){
      wordsBank[n]=wordsBankFull[n].split("");
    }
  };

  function generateNewWord (){
    randomNum=[Math.floor(Math.random() * wordsBank.length)];
    currentWord = wordsBank[randomNum];
    currentMusic = musicBank[randomNum];
    wordsBank.splice(wordsBank.indexOf(currentWord),1);
    musicBank.splice(randomNum,1);

    numberGuessesRemain = Math.floor(currentWord.length *1);
    for(var i=0; i<currentWord.length; i++){
      guessDisplay += "_ "
    };
  };

  function updateHTML(){
    html = "<p>Press any key to started!</p><br/>" +
      "Wins: "+winCounter+"<br/>" +
      "Current Word <br/>" +
      //currentWord +"<br/>" +
      guessDisplay +"<br/>" +
      "Number of guesses remaining <br/>" +
      numberGuessesRemain +"<br/>" +
      "Letters already guessed <br/>"+
      letterGuessedExcludeCorrect +"<br/>";
    $(".guessArea").html(html);
  };

  function resetVarForNewWord(){
    currentWord = [];
    guessDisplay = "";
    letterGuessed =[];
    letterGuessedExcludeCorrect=[];
    guessCorrect = 0;
  };

  function updateLetterGuessed(){
    if(letterGuessed.indexOf(event.key.toUpperCase()) ==-1){
      letterGuessed.push(event.key.toUpperCase());

      if(currentWord.indexOf(event.key.toUpperCase()) ==-1){
        numberGuessesRemain--;
        if(numberGuessesRemain==0){
          lostCounter++;
        };
        letterGuessedExcludeCorrect.push(event.key.toUpperCase());
      }
    }
    else{
      //alert("You already guessed this letter!");
    };
  };
});