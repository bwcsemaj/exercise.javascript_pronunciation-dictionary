class PronunciationTest {
    static _test(expected, spelling) {
        let word = dictionary.getWord(spelling);

        // when
        let actual = word.pronunciation;

        // then
        let pass = arraysEqual(expected, actual);

        console.log('input = ' + spelling);
        console.log('expected = ' + expected);
        console.log('actual = ' + actual);
        console.log('test passed = ' + pass);
        return pass;
    }

    static test1() {
        let expected = ['D', 'OW1', 'N', 'AH2', 'T'];
        let input = 'DONUT';
        return  PronunciationTest._test(expected, input);
    }

    static test2() {
        let expected = ['P', 'R', 'OW1', 'G', 'R', 'AE2', 'M'];
        let input = 'PROGRAM';
        return  PronunciationTest._test(expected, input);
    }


    static test3() {
        let expected = ['AH0', 'K', 'AO1', 'R', 'D'];
        let input = "ACCORD";
        return PronunciationTest._test(expected, input);
    }
}

function arraysEqual(a1, a2) {
    return JSON.stringify(a1) == JSON.stringify(a2);
}

class IdenticalPronunciationTest {
    static _test(expected, pronunciation) {

        // when
        let actual = dictionary.determineIdenticalPronunciation(pronunciation).map(word => word.spelling);

        // then
        let pass = arraysEqual(expected, actual);

        console.log('input = ' + pronunciation);
        console.log('expected = ' + expected);
        console.log('actual = ' + actual);
        console.log('test passed = ' + pass);
        return pass;
    }

    static test1() {
        let expected = ["DONUT", "DOUGHNUT"];
        let input = ['D', 'OW1', 'N', 'AH2', 'T'];
        return  IdenticalPronunciationTest._test(expected, input);
    }

    static test2() {
        let expected = ["PROGRAM", "PROGRAMME"];
        let input = ['P', 'R', 'OW1', 'G', 'R', 'AE2', 'M'];
        return  IdenticalPronunciationTest._test(expected, input);
    }


    static test3() {
        let expected = ["ACCORD", "ACORD"];
        let input = ['AH0', 'K', 'AO1', 'R', 'D'];
        return IdenticalPronunciationTest._test(expected, input);
    }
}


class SimilarWordsWithLessPhonemesTest {
    static _test(expected, spelling) {
        let word = dictionary.getWord(spelling);

        // when
        let actual = dictionary.similarWordsWithLessPhonemes(word).map(word => word.spelling);

        // then
        let pass = arraysEqual(expected, actual);

        console.log('input = ' + spelling);
        console.log('expected = ' + expected);
        console.log('actual = ' + actual);
        console.log('test passed = ' + pass);
        return pass;
    }
    //DONUT
    //D OW1 N AH2 T
    //DON'T
    //D OW1 N T
    //DON'TS
    //D OW1 N EY2 T
    //DONAT
    //D OW1 N AH0 T
    static test1() {
        let expected = ["DON'T"];
        let input = 'DONUT';
        return  SimilarWordsWithLessPhonemesTest._test(expected, input);
    }

    static test2() {
        let expected = ["DRAFT", "DRAUGHT", "RAFFETY"];
        let input = 'DRAFTY';
        return  SimilarWordsWithLessPhonemesTest._test(expected, input);
    }


    static test3() {
        let expected = ["ALIGN", "ALINE", "ALLIED", "LINED"];
        let input = 'ALIGNED';
        return  SimilarWordsWithLessPhonemesTest._test(expected, input);
    }
}


class SimilarWordsWithAddedPhonemesTest {
    static _test(expected, spelling) {
        let word = dictionary.getWord(spelling);

        // when
        let actual = dictionary.similarWordsWithAddedPhonemes(word).map(word => word.spelling);

        // then
        let pass = arraysEqual(expected, actual);

        console.log('input = ' + spelling);
        console.log('expected = ' + expected);
        console.log('actual = ' + actual);
        console.log('test passed = ' + pass);
        return pass;
    }

    static test1() {
        let expected = ["ACCORD'S", "ACCORDS", "MCCORD", "RECORD"];
        let input = 'ACCORD';
        return SimilarWordsWithAddedPhonemesTest._test(expected, input);
    }

    static test2() {
        let expected = ["DRAFT'S", "DRAFTEE", "DRAFTER", "DRAFTS", "DRAFTY", "DRAUGHTS"];
        let input = 'DRAFT';
        return SimilarWordsWithAddedPhonemesTest._test(expected, input);
    }


    static test3() {
        let expected = ["MALIGNED", "UNLINED"];
        let input = 'ALIGNED';
        return SimilarWordsWithAddedPhonemesTest._test(expected, input);
    }
}

class SimilarWordsWithReplacedPhonemesTest {
    static _test(expected, spelling) {
        let word = dictionary.getWord(spelling);

        // when
        let actual = dictionary.similarWordsWithReplacedPhonemes(word).map(word => word.spelling);

        // then
        let pass = arraysEqual(expected, actual);

        console.log('input = ' + spelling);
        console.log('expected = ' + expected);
        console.log('actual = ' + actual);
        console.log('test passed = ' + pass);
        return pass;
    }

    static test1() {
        let expected = ["ABOARD", "ADORED", "AFFORD", "AWARD", "SCORED"];
        let input = 'ACCORD';
        return SimilarWordsWithReplacedPhonemesTest._test(expected, input);
    }

    static test2() {
        let expected = ["CRAFT", "DRIFT", "GRAFT", "KRAFFT", "KRAFT"];
        let input = 'DRAFT';
        return SimilarWordsWithReplacedPhonemesTest._test(expected, input);
    }


    static test3() {
        let expected = ["AFFINED","ALIGNS","ALINES","ASSIGNED","BLIND"];
        let input = 'ALIGNED';
        return SimilarWordsWithReplacedPhonemesTest._test(expected, input);
    }
}

class SimilarWordsTest{
	static _test(expected, spelling) {
        let word = dictionary.getWord(spelling);

        // when
        var spellings = new Array();
        dictionary.determineSimilarWords(word).forEach(word => spellings.push(word.spelling));
        spellings.sort();
		let actual = spellings;
		
		// then
		let pass = arraysEqual(expected, actual);

		console.log('input = ' + spelling);
		console.log('expected = ' + expected);		
		console.log('actual = ' + actual);
        console.log('test passed = ' + pass);
        return pass;
	}

	static test1() {
		let expected = ["ACCORD'S", "ACCORDS", "MCCORD", "RECORD","ABOARD","ADORED","AFFORD","AWARD","SCORED", "CHORD","CORD"];
        expected.sort();
        let input = 'ACCORD';
		return SimilarWordsTest._test(expected, input);
	}

	static test2() {
        let expected = ["DRAFT'S", "DRAFTEE", "DRAFTER", "DRAFTS", "DRAFTY", "DRAUGHTS","CRAFT","DRIFT","GRAFT","KRAFFT","KRAFT", "DAFT", "RAFT"]
        expected.sort();
		let input = 'DRAFT';
		return SimilarWordsTest._test(expected, input);
	}


	static test3() {
		let expected = [
			"AFFINED","ALIGN","ALIGNS","ALINE",
			"ALINES","ALLIED","ASSIGNED","BLIND",
			"LINED", "MALIGNED","UNLINED"];
            expected.sort();
		let input = 'ALIGNED';
		return SimilarWordsTest._test(expected, input);
	}
}

var allTestResults = PronunciationTest.test1()
    && PronunciationTest.test2()
    && PronunciationTest.test3()
    && IdenticalPronunciationTest.test1()
    && IdenticalPronunciationTest.test2()
    && IdenticalPronunciationTest.test3()
    && SimilarWordsWithLessPhonemesTest.test1()
    && SimilarWordsWithLessPhonemesTest.test2()
    && SimilarWordsWithLessPhonemesTest.test3()
    && SimilarWordsWithReplacedPhonemesTest.test1()
    && SimilarWordsWithReplacedPhonemesTest.test2()
    && SimilarWordsWithReplacedPhonemesTest.test3()
    && SimilarWordsWithAddedPhonemesTest.test1()
    && SimilarWordsWithAddedPhonemesTest.test2()
    && SimilarWordsWithAddedPhonemesTest.test3()
    && SimilarWordsTest.test1()
    && SimilarWordsTest.test2()
    && SimilarWordsTest.test3();
console.log("ALL TESTS:" + allTestResults);