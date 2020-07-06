const SPELLING = 0;
const PRONUNCIATION = 1;
const DICTIONARY = null;

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

    getWord(spelling) {
        return this._spellingToWord.get(spelling);
    }

    getPronunciation(spelling) {
        return this._spellingToWord.get(spelling).pronunciation;
    }

    determineSimilarWords(word) {
        var similarWords = new Set();
        var similarWordsWithAddedPhonemes = this.similarWordsWithAddedPhonemes(word);
        for (var index = 0; similarWordsWithAddedPhonemes.length > index; index++) {
            similarWords.add(similarWordsWithAddedPhonemes[index]);
        }
        var similarWordsWithLessPhonemes = this.similarWordsWithLessPhonemes(word);
        for (var index = 0; similarWordsWithLessPhonemes.length > index; index++) {
            similarWords.add(similarWordsWithLessPhonemes[index]);
        }
        var similarWordsWithReplacedPhonemes = this.similarWordsWithReplacedPhonemes(word);
        for (var index = 0; similarWordsWithReplacedPhonemes.length > index; index++) {
            similarWords.add(similarWordsWithReplacedPhonemes[index]);
        }
        //       var identicalPhonemes = this.determineIdenticalPronunciation(word.pronunciation);
        // for (var index = 0; identicalPhonemes.length > index; index++) {
        //     similarWords.add(identicalPhonemes[index]);
        // }
        // var similarWordsWithAddedPhonemes = this.similarWordsWithAddedPhonemes(word);
        // for (var index = 0; similarWordsWithAddedPhonemes.length > index; index++) {
        //     var similarWord = similarWordsWithAddedPhonemes[index];
        //     if (similarWord.spelling === "CORD") {
        //         console.log("TIOGIORGRIOIO4343");
        //     }
        //     //similarWords.add(similarWord);
        // }
        // var similarWordsWithLessPhonemes = this.similarWordsWithLessPhonemes(word);
        // for (var index = 0; similarWordsWithLessPhonemes.length > index; index++) {
        //     var similarWord = similarWordsWithLessPhonemes[index];
        //     if (similarWord.spelling === "DAFT") {
        //         console.log("TIOGIORGRIOIO4");
        //     }
        //     //similarWords.add(similarWord);
        // }
        // var similarWordsWithReplacedPhonemes = this.similarWordsWithReplacedPhonemes(word);
        // for (var index = 0; similarWordsWithReplacedPhonemes.length > index; index++) {
        //     var similarWord = similarWordsWithReplacedPhonemes[index];
        //     if (similarWord.spelling === "CORD") {
        //         console.log("TIOGIORGRIOIO1");
        //     }
        //     //similarWords.add(similarWord);
        // }
  
        return similarWords;
    }

    //returns a list of phonetically identical words.
    determineIdenticalPronunciation(pronunciation) {
        var exactWords = new Array(0);
        for (let iterator = this._spellingToWord.values(), r; !(r = iterator.next()).done;) {
            var word = r.value;
            if (word.isExactPronunciation(pronunciation)) {
                exactWords.push(word);
            }
        }
        return exactWords;
    }

    //FOR TESTS
    // if (firstWord.spelling === "DRAFT" && secondWord.spelling === "DAFT") {
    //     var otherPronunciation = secondWord.pronunciation;
    //     console.log("D" + (firstWord.spelling !== secondWord.spelling));
    //     console.log("D" + (firstWord.pronunciation.length === secondWord.pronunciation.length));
    //     console.log("D" + (firstWord.similarWord(secondWord) + 1 === firstWord.pronunciation.length));
    //     console.log(firstWord.similarWord(secondWord) + 1);
    //     console.log(firstWord.pronunciation.length);
    //     console.log("D" + firstWord.similarWord(secondWord));
    //     console.log(firstWord.pronunciation);
    //     console.log(secondWord.pronunciation);

    //     var firstPronunciation = firstWord.pronunciation;
    //     var secondPronunciation = otherPronunciation;
    //     var count = 0;
    //     var secondNext = 0;
    //     var cantGoBack = true;

    //     for (var firstIndex = 0; firstPronunciation.length > firstIndex; firstIndex++) {
    //         for (var secondIndex = cantGoBack ? firstIndex : secondNext; secondPronunciation.length > secondIndex; secondIndex++) {
    //             //                for (var secondIndex = cantGoBack ? (firstIndex > secondNext ? firstIndex : secondNext) :secondNext; secondPronunciation.length > secondIndex; secondIndex++) {
    //             var phoneme = firstPronunciation[firstIndex];
    //             var otherPhoneme = secondPronunciation[secondIndex];
    //             if (phoneme === otherPhoneme) {
    //                 count++;
    //                 secondNext = secondIndex + 1;
    //                 break;
    //             }
    //             if (cantGoBack) {
    //                 break;
    //             }
    //         }
    //     }
    //     console.log("TESTDRE: " + (count));
    // }
  

    similarWordsWithLessPhonemes(word) {
        return this.similarWordsWith(word, function (firstWord, secondWord) {
            return firstWord.spelling !== secondWord.spelling && firstWord.similarWord(secondWord, false) === firstWord.pronunciation.length - 1 && firstWord.pronunciation.length > secondWord.pronunciation.length;
        });
    }

    similarWordsWithAddedPhonemes(word) {
        return this.similarWordsWith(word, function (firstWord, secondWord) {
            return firstWord.pronunciation.length === secondWord.pronunciation.length - 1 && firstWord.similarWord(secondWord, false) === firstWord.pronunciation.length;
        });
    }
    //AH0 L AY1 N D
    //AH0 P L AY1 D

  //D R AE1 F T
    //D AE1 F T

    similarWordsWithReplacedPhonemes(word) {
        return this.similarWordsWith(word, function (firstWord, secondWord) {
            
            return firstWord.spelling !== secondWord.spelling && firstWord.pronunciation.length === secondWord.pronunciation.length && firstWord.similarWord(secondWord, true) === firstWord.pronunciation.length - 1;
        });
    }

    similarWordsWith(word, predicate) {
        var words = new Array();
        for (let iterator = this._spellingToWord.values(), r; !(r = iterator.next()).done;) {
            var otherWord = r.value;
            if (predicate(word, otherWord)) {
                words.push(otherWord);
            }
        }
        return words;
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

    similarWord(word, cantGoBack) {
        return this.similarPronunciation(word.pronunciation, cantGoBack);
    }

    similarPronunciation(otherPronunciation, cantGoBack) {
        var firstPronunciation = this.pronunciation;
        var secondPronunciation = otherPronunciation;
        var count = 0;
        var secondNext = 0;

        for (var firstIndex = 0; firstPronunciation.length > firstIndex; firstIndex++) {
            for (var secondIndex = cantGoBack ? firstIndex : secondNext; secondPronunciation.length > secondIndex; secondIndex++) {
                //                for (var secondIndex = cantGoBack ? (firstIndex > secondNext ? firstIndex : secondNext) :secondNext; secondPronunciation.length > secondIndex; secondIndex++) {
                var phoneme = firstPronunciation[firstIndex];
                var otherPhoneme = secondPronunciation[secondIndex];
                if (phoneme === otherPhoneme) {
                    count++;
                    secondNext = secondIndex + 1;
                    break;
                }
                if (cantGoBack) {
                    break;
                }
            }
        }
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


//Initialize Dictionary
var node = document.getElementById("data");
var contents = node.textContent;
var dictionary = initDictionary(contents);
console.log(dictionary);
