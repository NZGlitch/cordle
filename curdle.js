// Where the game board goes
var gameDiv;

// The dictionary of possible quiz words
var quiz_dict = [];

//The length of words to use
var wordLength = 5;

// Letters typed so far
//var guess = [];

// Index of current guess word
//var curGuess = -1;

// Index of current letter
//var curLetter = 0;

// The current word to guess
//var currentWord = [];


//The current Game State
var gameState = {
	quizWord: "",		//The word to guess
	guesses: [],		//The guesses so far
	solved: false,		//Successful solve?
	finished: false,	//Still playing?
};

//Load the dictionairies and initialise the game
window.onload = (event) => {
	//load 5 letter words
	quiz_dict = [];
	for (var i=0; i<common_dict.length; i++) {
		if (common_dict[i].length == wordLength) quiz_dict.push(common_dict[i]);
	}
  gameDiv = document.getElementById("game");
  initGame(null);

};

//Starts a new game, can be provided a code to load a previous state
function initGame(link) {
	gameDiv.innerHTML = "";
	gameDiv.focus();
  Keyboard.init();

	if (link != null) {
		//TODO load state from link
	} else {
		var word = quiz_dict[Math.floor(Math.random()*quiz_dict.length)];
		gameState = {
			quizWord: word.toUpperCase().split(''),
			guesses: [],
			solved: false,
			finished: false,
		};
	}
	initNextGuess();
}

//Prepare for the next guess (draws the boxes for the letters)
function initNextGuess() {
  Keyboard.active = true;
	var guessNum = gameState.guesses.length;
	var html = "<div class='wordle-line' id='WG-"+guessNum+"'>";
	for (var i=0; i<wordLength; i++) {
		html = html + "<div class='wletter' id='LD-"+guessNum+"-"+i+"'></div>";
	}
	html = html + "<div>";
	game.innerHTML = game.innerHTML + html;
	gameState.guesses.push([]);
}



function guessWord() {
	var guessNum = gameState.guesses.length-1;
	var guess = gameState.guesses[guessNum].slice(0); //make a copy
	var word = guess.join('');
	var wordDiv = document.getElementById("WG-"+guessNum);
	var test = gameState.quizWord.slice(0); // a copy of the correct word

	//check that the guess is the right length / valid
	if (!dict.includes(word.toLowerCase()) || word.length != wordLength) {
		wordDiv.classList.add("animate")
		setTimeout(function() {
			wordDiv.classList.remove("animate")
		}, 500);
		return;
	}	

	var solved = true;


	//check correct letters first
	for (var i = 0; i<wordLength; i++) {
		var letDiv = document.getElementById("LD-"+guessNum+"-"+i);

		//initialise to be 'wrong'
		letDiv.classList.add("wrong-letter");
		
		//check if exact match
		if (guess[i] == test[i]) {
			letDiv.classList.add("correct-letter");
			letDiv.classList.remove("wrong-letter");
			test[i] = "0"; //prevents letter from being matched again later
			Keyboard.setKeyStyle(guess[i], "correct-letter");
		} else {
			solved = false;
		}
	}

  if (!solved) {
  	//Check for correct letters in wrong positions
  	
    for (var i = 0; i<guess.length; i++) {
  		//See if we match another letter
  		for (var j=0; j<test.length; j++) {

        //Letter matches
  			if (guess[i] == test[j]) {
  				var letDiv = document.getElementById("LD-"+guessNum+"-"+i);
  				letDiv.classList.add("wrong-place");
  				letDiv.classList.remove("wrong-letter"); //would have been added on previous step
  				test[j] = "0"; //wont allow another match

  				//update keyboard if needed
          Keyboard.setKeyStyle(guess[i], "wrong-place");
  				
          //don't need to look any further
  				break; 
  			}
  		}
  	}

  	//update keyboard on wrong guesses
  	for (var i = 0; i<guess.length; i++) {
      if (!gameState.quizWord.includes(guess[i]))
        Keyboard.setKeyStyle(guess[i], "wrong-letter");
  	}
  }

  //Finished?
  if (solved) {
    gameState.solved = true;
    gameState.finished = true;
    Keyboard.active = false;
  } else if (guessNum >= 5) {
    gameState.finished = true;
    Keyboard.active = false;
  } else {
    initNextGuess();
  }
}
