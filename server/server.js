const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const validWordsFileContent = fs.readFileSync("./3000EngWords.txt", "utf-8");
const validWordsList = validWordsFileContent.split(/\r?\n/);

//MIDDLEWARE

app.use(cors());
app.use(bodyParser.json());

//ROTUES

app.post("/convert", (req, res) => {
  const numString = req.body.numString;
  const wordList = convertToWords(numString);
  const isFilter = req.body.isFilter;
  console.log("isFilter :", isFilter);
  const result = isFilter
    ? filterValidWords(wordList, validWordsList)
    : wordList;
  res.json({ result });
});

// DATA HANDLING

function convertToWords(numString) {
  const phoneWordsMap = {
    0: ["0"],
    1: ["1"],
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const numericArray = numString.replace(/[^0-9]/g, "").split("");
  const result = [];

  function generateWords(index, currentWord) {
    if (index === numericArray.length) {
      result.push(currentWord);
      return;
    }

    const currentDigit = numericArray[index];
    const letters = phoneWordsMap[currentDigit] || [];

    for (const letter of letters) {
      generateWords(index + 1, currentWord + letter);
    }
  }

  generateWords(0, "");

  return result;
}

function filterValidWords(wordList, validWordsList) {
  return wordList.filter((word) => validWordsList.includes(word));
}
