// Create a big object to set up the Hangman game
var hangmanGame = {
  // Words to guess
  wordsToGuess: {
    eggs: {},
    bread: {},
    milk: {},
    bacon: {},
    noodles: {},
    sauce: {},
    pie: {},
    cake: {}
  },
  // Setup the initial values for the game
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,
  // Set up the randomWord to guess
  setupGame: function() {
    // Created and Array within Obj
    var objKeys = Object.keys(this.wordsToGuess);
    console.log(objKeys);
    // Now setting up game to pick a random word from above.
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
    console.log(this.wordInPlay);
    // Then you need to split the word into letters
    this.lettersOfTheWord = this.wordInPlay.split("");
    // Setup the WordView during the game in process
    this.rebuildWordView();
    // This function sets up the amount of guesses a user gets
    this.processUpdateTotalGuesses();
  },
  // This Function will run whenever the user guesses
updatePage: function(letter){
    //it the user does not have anymore guesses, the game will restart
if(this.guessesLeft === 0){
    this.restartGame();
} else {
    // Checking for and handling incorrect guesses
    this.updateGuesses(letter);
    //Checking for and handling corret guesses
    this.updateMatchLetters(letter)
    // Rebuild the view of the word. Showing the letters and non-guessed letters "_"
    this.rebuildWordView();
    // If the user wins, restarts the game.
    if (this.updateWins() === true){
        this.restartGame();
    }
}
},
    // This is function to show when a player guesses incorrectly and what they haven't guessed
    updateGuesses: function(letter){
        //if the letter is not in the guessed letter array, and the letter is not in the Letters of the Word array
        if((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)){
            // Adding the letters to the guessedLetter array
            this.guessedLetters.push(letter);
            // Decrease the guesses by one
            this.guessesLeft--;
            // Update guesses remaining and guesses left on the page.
            document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
            document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(",");
        }
    },
    // function to set the initial guesses the user gets
    processUpdateTotalGuesses: function(){
        // the user will get more guesses dependant on the word length
        this.totalGuesses = this.lettersOfTheWord.length + 1;
        this.guessesLeft = this.totalGuesses;
        // Render the guesses left 
        document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
    },
    // this function is for when a player makes a sucessful guess
    updateMatchLetters: function(letter) {
        // loop thru the letters
        for (var i = 0; i < this.lettersOfTheWord.length; i++){
            if((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                // Pushing into the array for matchedLetters
                this.matchedLetters.push(letter);
            }
        }
    },
    rebuildWordView: function (){
        // the wordView is empty
        var wordView = "";
        // loop thru the letters of the word we are to guess
        for (var i=0; i < this.lettersOfTheWord.length; i++){
            // If the current letter has been guessed, display the letter
            if(this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1){
                wordView += this.lettersOfTheWord[i];
            } // if it hasn't been guessed, display "_"
            else{
                wordView += "&nbsp;_&nbsp;";
            }
        }
        //Update the page with the new string we built
        document.querySelector("#current-word").innerHTML = wordView;
    },
    restartGame: function(){
        document.querySelector("#guessed-letters").innerHTML = "";
        this.wordInPlay = null;
        this.lettersOfTheWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setupGame();
        this.rebuildWordView();
    },
    // function to check the wins
    updateWins: function(){
        var win;

        // if you haven't guessed a correct letter
        if (this.matchedLetters.length === 0){
            win = false;
        }
        // if guessed correctly
        else {
            win = true;
        }
        // If you don't guess all the letters
        for (var i = 0; i < this.lettersOfTheWord.length; i++){
            if(this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1){
                win = false;
            }
        }

        // If you do win
        if(win){
            // adding a win
            this.wins = this.wins + 1;
            //Updating the win on the page
            document.querySelector('#wins').innerHTML = this.wins;
            // True will trigger the restart of the game
            return true;
        }
        // False the game will go on
        return false;
    }
};
// Initialize the game 
hangmanGame.setupGame();

document.onkeyup = function(event) {
    // Capture pressed key is a letter
    if (event.keyCode >= 49 && event.keyCode <= 90) {
        // capture the key and make it lowercase
        hangmanGame.letterGuessed = event.key.toLowerCase();
        // Pass the guessed letter
        hangmanGame.updatePage(hangmanGame.letterGuessed);
    }
}
