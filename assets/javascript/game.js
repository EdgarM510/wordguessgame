var game = {};

game.wins = 0;
game.losses = 0;
game.remaining = 9;
game.guessLog = "";
game.rando;
game.datWord;
game.datWordStatus;
game.letters = "abcdefghijklmnopqrstuvwxyz";
game.words = ['accio', 'acromantula', 'alchemy', 'alohamora', 'animagus', 'apparate', 'arithmancy', 'astronomy', 'auror', 'azkaban', 'basilisk', 'beater', 'beauxbatons', 'bezoar', 'bludger', 'boggart', 'bowtruckle', 'bubotuber', 'burrow', 'butterbeer', 'centaur', 'charms', 'chaser', 'cleansweep', 'comet', 'cruciatus', 'dementor', 'diffindo', 'disillusionment', 'divination', 'doxy', 'dragon', 'durmstrang', 'engorgio', 'expelliarmus', 'fidelius', 'finite', 'firebolt', 'flobberworm', 'floo', 'galleon', 'ghoul', 'giant', 'gillyweed', 'gnome', 'goblin', 'snitch', 'grim', 'grindylow', 'gringotts', 'gryffindor', 'herbology', 'hinkypunk', 'hippogriff', 'hogsmeade', 'hogwarts', 'honeydukes', 'howler', 'hufflepuff', 'imperius', 'impervius', 'incendio', 'kappa', 'keeper', 'knut', 'legilimency', 'legilimens', 'mandrake', 'merpeople', 'metamorphmagus', 'mobilicorpus', 'morsmordre', 'muggle', 'murtlap', 'niffler', 'nimbus', 'obliviate', 'occlumency', 'parseltongue', 'patronus', 'pensieve', 'phoenix', 'pixies', 'portkey', 'potions', 'protego', 'quaffle', 'ravenclaw', 'reducto', 'relashio', 'rememberall', 'reparo', 'riddikulus', 'salamander', 'scourgify', 'seeker', 'seer', 'sickle', 'silencio', 'slytherin', 'sneakoscope', 'squib', 'stupefy', 'thestral', 'transfiguration', 'unicorn', 'vampire', 'veritaserum', 'wand', 'werewolf', 'wizengamot'];
    

            // newWord resets: random word, remaining guesses, guessLog
game.newWord = function() { 
            // store random word as a string
    this.rando = this.words[Math.floor(Math.random() * this.words.length)]
            // store as an array
    this.datWord = this.rando.split("");
    console.log('newWord is datWord is ' + this.datWord);

            // count the letters in rando, excluding duplicates
    var letterCount = 0;
    for (var l=0; l<this.letters.length; l++){
        if (this.rando.indexOf(this.letters.charAt(l)) > -1){
            letterCount++;
        }
    }
            // guesses remaining = half of the unused letters, so every game is losable
    this.remaining = Math.round((26 - letterCount) / 2);
            // clear the input log
    this.guessLog = "";

};


            // checkWord updates datWordStatus with _s to be displayed, then checks if you win
game.checkWord = function() {
    this.datWordStatus = "";
    for (var s=0; s<this.datWord.length; s++){
            // if this letter is in guessLog, print it
        if (this.guessLog.indexOf(this.datWord[s]) > -1){
            this.datWordStatus = this.datWordStatus + this.datWord[s] + " ";
        }
            // else _
        else {
            this.datWordStatus = this.datWordStatus + "_ ";
        };
    };
    console.log("datWordStatus is " + this.datWordStatus);

            //  win checker: if no _ = you win
    if (this.datWordStatus.indexOf('_') === -1){
        this.wins++;
        this.scoreboard();
        this.win();
    };
}


game.win = function(){
    alert('You win!\nYou revealed the word ' + this.rando + '.\nPress OK for a new word.');
    this.newWord();
    this.checkWord();
    this.scoreboard();
};


game.lose = function(){
    alert('You lose!\nYou failed to guess the word ' + this.rando + '.\nPress OK for a new word.');
    this.newWord();
    this.checkWord();
    this.scoreboard();
};


            // scoreboard prints all text to the page
game.scoreboard = function() {
    document.getElementById('guessLog').innerHTML = 'previous guesses:  ' + this.guessLog;
    document.getElementById('wins').innerHTML = 'wins: ' + this.wins;
    document.getElementById('losses').innerHTML = 'losses:' + this.losses;
    document.getElementById('remaining').innerHTML = 'guesses remaining:' + this.remaining;
    document.getElementById('datWordStatus').innerHTML = this.datWordStatus;
}


            // evaluate happens on every key press
game.evaluate = function() {
            // if input is a letter then continue
    if (this.letters.indexOf(whoDat) > -1){
            // if input already guessed then pause
        if (this.guessLog.indexOf(whoDat) > -1){
            alert('you already guessed ' + whoDat);
        }
        else{
            // valid input, so log it
            this.guessLog = this.guessLog + " " + whoDat;
            // if wrong -1 to guesses remaining
            if (this.rando.indexOf(whoDat) === -1){
                this.remaining--;
            // loss checker
                if (this.remaining === 0){
                    this.losses++;
                    this.lose();
                }
            }
        }
    }
            // if input is not a letter then pause
    else {
        alert('please input a lowercase letter')
    }
}