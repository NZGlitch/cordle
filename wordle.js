// Where the game board goes
var game;

// Letters typed so far
var guess = [];

// Index of current guess word
var curGuess = -1;

// Index of current letter
var curLetter = 0;

// The current word to guess
var currentWord = [];

var quiz_dict = [];

function guessWord() {
	var test = currentWord.slice(0);
	
	//check entry is a valid word
	var word = guess.join('');
	if (!dict.includes(word.toLowerCase())) {
		alert(word+" Is not a valid word!");
		return;
	}

	var done = true;

	//check correct letter first
	for (var i = 0; i<5; i++) {
		var letDiv = document.getElementById("LD-"+curGuess+"-"+i);
		letDiv.classList.add("wrong-letter");
		//check exact match
		if (guess[i] == test[i]) {
			letDiv.classList.add("correct-letter");
			letDiv.classList.remove("wrong-letter");
			test[i] = "0"; //wont allow another match
			document.getElementById("kb-"+guess[i]).classList.add("correct-letter");
		} else {
			done = false;
		}
	}

	if (done) {
		return;
	}

	//Now for incorrect pos
	for (var i = 0; i<5; i++) {
		//See if we match another letter
		for (var j=0; j<5; j++) {
			if (guess[i] == test[j]) {
				var letDiv = document.getElementById("LD-"+curGuess+"-"+i);
				letDiv.classList.add("wrong-place");
				letDiv.classList.remove("wrong-letter");
				test[j] = "0"; //wont allow another match

				//update keyboard if needed
				var kbl = document.getElementById("kb-"+guess[i]);
				if (kbl.classList.length == 1) kbl.classList.add("wrong-place");
				break;
			}
		}
	}

	//Mark any used letters
	for (var i = 0; i<5; i++) {
		var kbl = document.getElementById("kb-"+guess[i]);
		if (kbl.classList.length == 1) kbl.classList.add("wrong-letter");
	}

	if (curGuess >= 5) {
		alert("Sorry - the word was "+currentWord.join(''));
		return;
	}

	initNextGuess();

}

function keyDown(event) {
//  curPress = event.key;
 }

function keyUp(event) {
  game.focus();
  var code = event.which;
  if (code >= 97 && code <= 122)
  	code = code - 32;
  if (code < 65 || code > 91) {
  	if (code == 8 && curLetter > 0) {
  		curLetter--;
  		var letDiv = document.getElementById("LD-"+curGuess+"-"+curLetter);
  		guess[curLetter] = "";  		
  		letDiv.innerHTML = "";

  		console.log("backspace!");	
  	} else if (code == 13) {
  		if (curLetter ==5) {
  			guessWord();
  		}
  		console.log("return!");
  	}
  	return;
  }

  if (curLetter <= 4) {
  	guess[curLetter] = String.fromCharCode(code);
  	var letDiv = document.getElementById("LD-"+curGuess+"-"+curLetter);
  	letDiv.innerHTML = guess[curLetter];
  	curLetter++;
  }
}

function initNextGuess() {
	curGuess++;
	var html = "<div class='wordle-line' id='WG"+curGuess+"'>";
	for (var i=0; i<5; i++) {
		html = html + "<div class='wletter' id='LD-"+curGuess+"-"+i+"'></div>";
	}
	html = html + "<div>";
	game.innerHTML = game.innerHTML + html;

	guess = [];
	curLetter = 0;

}

function initKeyboard() {
	var kb = document.getElementById("keyboard");
	kb.innerHTML = "";
	for (var i = 65; i<91; i++) {
		var l = String.fromCharCode(i);
		kb.innerHTML = kb.innerHTML + "<div class='kl' id=kb-"+l+">"+l+"</div>"
	}
}

function initGame() {
	// Triggers when key is depressed
	document.addEventListener('keydown', keyDown);

	// Triggers when key is released
	document.addEventListener('keyup', keyUp);

	game = document.getElementById("game");
	game.innerHTML = "";
	game.focus();
	guess = [];
	curGuess = -1;
	curLetter = 0;

	initKeyboard();

	var word = quiz_dict[Math.floor(Math.random()*quiz_dict.length)];
	currentWord = word.toUpperCase().split('');

	initNextGuess();
}

window.onload = (event) => {
	//load 5 letter words
	quiz_dict = [];
	for (var i=0; i<common_dict.length; i++) {
		if (common_dict[i].length == 5) quiz_dict.push(common_dict[i]);
	}
  initGame();
};

