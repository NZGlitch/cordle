var Keyboard = {
  //Weahter to respond to keyboard events
  active: false,

  //Initialise - called once only
	init: function() {
  	// Triggers when key is released
  	document.addEventListener('keyup', this.keyUp);
  	
  	var row1 = this.createKeyRow(["Q","W","E","R","T","Y","U","I","O","P"]);
  	row1.push(["DEL", 8])
  	var row2 = this.createKeyRow(["A","S","D","F","G","H","J","K","L"]);
  	row2.push(["ENTER",13]);
  	var row3 = this.createKeyRow(["Z","X","C","V","B","N","M"]);

  	var rows = [row1,row2,row3]
  	for (var i=0;i<3;i++) {
  		var kRow = document.getElementById("keyboard-r"+(i+1));	
      kRow.innerHTML = "";
  		for (var j=0;j<rows[i].length;j++) {
  			kRow.innerHTML = kRow.innerHTML + this.createKey(rows[i][j][0],rows[i][j][1]);
  		}
  	}
  },

  createKeyRow: function(keys) {
  	var res = [];
  	for(var i=0; i<keys.length; i++) {
  		res.push([keys[i], keys[i].charCodeAt(0)]);
  	}
  	return res;
  },

  createKey: function(name,code) {
  	return "<div class='kl' onclick='Keyboard.pressKey("+code+")' id=kb-"+name+">"+name+"</div>"
  },

  pressKey: function(code) {
    if (!this.active) return;

    var guessNum = gameState.guesses.length-1;
    var guess = gameState.guesses[guessNum];
    var word = guess.join('');
    var letterNum = word.length;

    //if lowercase, change to upper case
  	if (code >= 97 && code <= 122)
    	code = code - 32;

    //if not a letter, check if del or enter
    if (code < 65 || code > 91) {
    	if (code == 8 && word.length > 0) {
        //del
    		var letDiv = document.getElementById("LD-"+guessNum+"-"+(letterNum-1));
    		guess.pop();
    		letDiv.innerHTML = "";
    	} else if (code == 13) {
        //enter
    		guessWord();
    	}
    	return;
    }

    if (letterNum < wordLength) {
    	guess.push(String.fromCharCode(code));
    	var letDiv = document.getElementById("LD-"+guessNum+"-"+letterNum);
    	letDiv.innerHTML = guess[letterNum];
    }
  },

  keyUp: function(event) {
    game.focus();
    var code = event.which;
    Keyboard.pressKey(code);
  },

  setKeyStyle: function(key, style){
    var el = document.getElementById("kb-"+key)
    el.className = "";  //clears any previous classes
    el.classList.add("kl");
    el.classList.add(style);
  }
}