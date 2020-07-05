//Initialize Dictionary
let fileInput = document.getElementById('fileinput');
fileInput.addEventListener('change', start, false);

function start(event) {
    console.log(event);
    var file = event.target.files[0];
    var secondFile = new File([""], "data.txt", {type: "text/plain"});
    secondFile.name = "data.txt";
    console.log(file);
    console.log(secondFile);
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        let contents = event.target.result;
        let dictionary = initDictionary(contents);
        console.log(dictionary);
        var word = new Word("DONUT", ["D", "OW1", "N", "AH2", "T"]);
        console.log("IDENTICAL PRON");
        console.log("DONUT:");
        console.log(dictionary.determineIdenticalPronunciation(["D", "OW1", "N", "AH2", "T"]));

        console.log("GET PRON");
        console.log("DONUT:");
        console.log(dictionary.getPronunciation("DONUT"));

        // console.log("SIMILAR");
        // console.log(word);
        // console.log(dictionary.similarWordsWithAddedPhonemes(word));
        // console.log("\n");
    };
    fileReader.readAsText(secondFile);
}

const SPELLING = 0;
const PRONUNCIATION = 1;

function initDictionary(contents) {
    var spellingToWord = new Map();
    let index = 0;
    var line = "";
    while (contents.length > index) {
        var character = contents[index];
        if (character === "\n") {
            if (isValidLine(line)) {
                var partsOfLine = line.split("  ");
                var spelling = partsOfLine[SPELLING];
                var pronunciationTogether = partsOfLine[PRONUNCIATION];
                var pronunciation = pronunciationTogether.split(" ");
                var word = new Word(spelling, pronunciation);
                spellingToWord.set(spelling, word);
            }
            line = "";
        } else if (character !== "\r") {
            line += character;
        }
        index++;
    }
    return new Dictionary(spellingToWord);
}

//https://stackoverflow.com/questions/8334606/check-if-first-letter-of-word-is-a-capital-letter
function isValidLine(line) {
    return /[A-Z]/.test(line[0]);
}


class Dictionary {
    constructor(spellingToWord) {
        this._spellingToWord = spellingToWord;
    }

    get words() {
        return this._spellingToWord.values();
    }

    getPronunciation(spelling){
        return this._spellingToWord.get(spelling).pronunciation;
    }

    determineSimilarWords(word) {
        var similarWords = new Set();
        var similarWordsWithAddedPhonemes = similarWordsWithAddedPhonemes(word);
        for(var index = 0; similarWordsWithAddedPhonemes.length > index; index++){
            similarWords.add(similarWordsWithAddedPhonemes[index]);
        }
        var similarWordsWithReplacedPhonemes = similarWordsWithReplacedPhonemes(word);
        for(var index = 0; similarWordsWithReplacedPhonemes.length > index; index++){
            similarWords.add(similarWordsWithReplacedPhonemes[index]);
        }
        return similarWords;
    }

    //returns a list of phonetically identical words.
    determineIdenticalPronunciation(pronunciation) {
        var exactWords = new Array(0);

        for (var index = 0; this.words.length > index; index++) {
            var word = this.words[index];
            if (word.isExactPronunciation(pronunciation)) {
                exactWords.push(word);
            }
        }
        return exactWords;
    }

    determineIdentical

    //return a list of near-phonetically-identical words with additional Phonemes added.
    similarWordsWithAddedPhonemes(word) {
        var similarWords = new Array(0);

        for (var index = 0; this.words.length > index; index++) {
            var otherWord = this.words[index];
            if (word.spelling !== otherWord.spelling && word.similarWord(otherWord) > word.pronunciation.length) {
                similarWords.push(otherWord);
            }
        }
        return similarWords;
    }

    similarWordsWithReplacedPhonemes(word) {
        var similarWordsWithReplacedPhonemes = new Array(0);

        for (var index = 0; this.words.length > index; index++) {
            var otherWord = this.words[index];
            if (word.spelling !== otherWord.spelling && word.pronunciation.length === otherWord.pronunciation.length && word.similarWord(otherWord) > word.pronunciation.length / 2) {
                similarWordsWithReplacedPhonemes.push(otherWord);
            }
        }
        return similarWordsWithReplacedPhonemes;
    }

    display(word) {

    }

}

class Word {
    constructor(spelling, pronunciation) {
        this._spelling = spelling;
        this._pronunciation = pronunciation;
    }

    get spelling() {
        return this._spelling;
    }


    //list of strings representative of the Phonemes of this word.
    //Indices of the respective list should be indicative of their order of annunciation
    get pronunciation() {
        return this._pronunciation;
    }

    isExactPronunciation(otherPronunciation) {
        if (otherPronunciation.length != this.pronunciation.length) {
            return false;
        }
        var similarCount = this.similarPronunciation(otherPronunciation);
        return this.similarPronunciation(otherPronunciation) === otherPronunciation.length;
    }

    similarWord(word) {
        return this.similarPronunciation(word.pronunciation);
    }

    similarPronunciation(otherPronunciation) {
        var smallerPronunciation;
        var largerPronunciation;
        if (this.pronunciation.length < otherPronunciation) {
            smallerPronunciation = this.pronunciation;
            largerPronunciation = otherPronunciation;
        } else {
            smallerPronunciation = otherPronunciation;
            largerPronunciation = this.pronunciation;
        }

        var count = 0;
        var smallerIndex = 0;
        var largerIndex = 0;
        while (smallerPronunciation.length > smallerIndex && largerPronunciation.length > largerIndex) {
            var smallerPhonemes = smallerPronunciation[smallerIndex];
            var largerPhonemes = largerPronunciation[largerIndex];
            if (smallerPhonemes === largerPhonemes) {
                count++;
                smallerIndex++;
            }
            largerIndex++;
        }
        console.log(this.pronunciation + " " + otherPronunciation + ": " + count);
        return count;
    }

    toString() {
        var pronunciationAsString = "[";
        for (var index = 0; this.pronunciation.length > index; index++) {
            pronunciationAsString += this.pronunciation[index];
            if (index + 1 != this.pronunciation.length) {
                pronunciationAsString += ",";
            }
        }
        pronunciationAsString += "]";
        return "{" + this.spelling + " : " + pronunciationAsString + "}";
    }
}