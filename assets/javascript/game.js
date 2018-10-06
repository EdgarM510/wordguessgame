var game = {};
// game.whoDat;
game.guessLog = "";
game.wins = 0;
game.loses = 0;
game.remaining = 9;
game.rando;
game.datWord;
game.datWordStatus;
game.letters = "abcdefghijklmnopqrstuvwxyz";
game.words = ['accio', 'acromantula', 'alchemy', 'alohamora', 'animagus', 'apparate', 'arithmancy', 'astronomy', 'auror', 'azkaban', 'basilisk', 'beater', 'beauxbatons', 'bezoar', 'bludger', 'boggart', 'bowtruckle', 'bubotuber', 'burrow', 'butterbeer', 'centaur', 'charms', 'chaser', 'cleansweep', 'comet', 'cruciatus', 'dementor', 'diffindo', 'disillusionment', 'divination', 'doxy', 'dragon', 'durmstrang', 'engorgio', 'expelliarmus', 'fidelius', 'finite', 'firebolt', 'flobberworm', 'floo', 'galleon', 'ghoul', 'giant', 'gillyweed', 'gnome', 'goblin', 'snitch', 'grim', 'grindylow', 'gringotts', 'gryffindor', 'herbology', 'hinkypunk', 'hippogriff', 'hogsmeade', 'hogwarts', 'honeydukes', 'howler', 'hufflepuff', 'imperius', 'impervius', 'incendio', 'kappa', 'keeper', 'knut', 'legilimency', 'legilimens', 'mandrake', 'merpeople', 'metamorphmagus', 'mobilicorpus', 'morsmordre', 'muggle', 'murtlap', 'niffler', 'nimbus', 'obliviate', 'occlumency', 'parseltongue', 'patronus', 'pensieve', 'phoenix', 'pixies', 'portkey', 'potions', 'protego', 'quaffle', 'ravenclaw', 'reducto', 'relashio', 'rememberall', 'reparo', 'riddikulus', 'salamander', 'scourgify', 'seeker', 'seer', 'sickle', 'silencio', 'slytherin', 'sneakoscope', 'squib', 'stupefy', 'thestral', 'transfiguration', 'unicorn', 'vampire', 'veritaserum', 'wand', 'werewolf', 'wizengamot'];
    
game.newWord = function() { 
    this.rando = this.words[Math.floor(Math.random() * this.words.length)]
        this.datWord = this.rando.split("");
    console.log('newWord is datWord is ' + this.datWord);
    var letterCount = 0;
    for (var l=0; l<this.letters.length; l++){
        if (this.rando.indexOf(this.letters.charAt(l)) > -1){
            letterCount++;
        }
    }
    this.remaining = Math.round((26 - letterCount) / 2);
    this.guessLog = "";

};

game.checkWord = function() {
    this.datWordStatus = "";
    for (var s=0; s<this.datWord.length; s++){
        console.log('loop #' + s + ' for the letter ' + this.datWord[s] + '. in guessLog = ' + this.guessLog.indexOf(this.datWord[s]));
        if (this.guessLog.indexOf(this.datWord[s]) > -1){
            this.datWordStatus = this.datWordStatus + this.datWord[s] + " ";
        }
        
        else {
            this.datWordStatus = this.datWordStatus + "_ ";
        };
    };
    console.log("datWordStatus is " + this.datWordStatus);

    //  the WIN checker
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

game.scoreboard = function() {
    document.getElementById('guessLog').innerHTML = 'previous guesses:  ' + this.guessLog;
    document.getElementById('wins').innerHTML = 'wins: ' + this.wins;
    document.getElementById('loses').innerHTML = 'loses:' + this.loses;
    document.getElementById('remaining').innerHTML = 'guesses remaining:' + this.remaining;
    document.getElementById('datWordStatus').innerHTML = this.datWordStatus;
}

game.evaluate = function() {
    // if input is a letter then run
    if (this.letters.indexOf(whoDat) > -1){
        // if input already guessed then pause
        if (this.guessLog.indexOf(whoDat) > -1){
            alert('you already guessed ' + whoDat);
        }
        else{
            this.guessLog = this.guessLog + " " + whoDat;
            
            if (this.rando.indexOf(whoDat) === -1){
                this.remaining--;
                if (this.remaining === 0){
                    this.loses++;
                    this.lose();
                }
            }
        }
    }
    else {
        alert('please input a lowercase letter')
    }
}