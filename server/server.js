const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//MIDDLEWARE

app.use(cors());
app.use(bodyParser.json());

//ROTUES

app.get("/api/home", (req, res) => {
  res.json({ message: "Hellou world!" });
});

app.post("/convert", (req, res) => {
  const numString = req.body.numString;
  const result = convertToWords(numString);
  res.json({ result });
  console.log("numString :", numString);
});

// DATA HANDLING

function convertToWords(numString) {
  const phoneWordsMap = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const numericArray = numString.split("");
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
