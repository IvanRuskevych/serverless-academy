const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function fo getting data from user
function getUserInput() {
  rl.question(
    "Hello! Enter a few words or numbers separated by a space (or type `exit` to quit): \n",
    (input) => {
      if (isUserExit(input)) return rl.close();

      const values = input.split(" ");

      getOperation().then((operation) => {
        performOperation(values, operation);
      });
    }
  );
}

// Function fo getting number of operation from user
function getOperation() {
  console.log("How would you like to sort values:");
  console.log("1. Sort words alphabetically");
  console.log("2. Show numbers from lesser to greater");
  console.log("3. Show numbers from bigger to smaller");
  console.log(
    "4. Display words in ascending order by number of letters in the word"
  );
  console.log("5. Show only unique words");
  console.log("6. Display only unique values");
  console.log("Type `exit` to quit");

  return new Promise((resolve, _) => {
    //   ask user
    rl.question("Select (1 - 6) and press ENTER: \n", (operation) => {
      if (isUserExit(operation)) return rl.close();

      const parsedOperation = parseInt(operation);

      // check for valid number of operation
      if (!isNaN(parsedOperation)) {
        resolve(parsedOperation);
      } else {
        console.log("Invalid operation. Please choose a valid operation.");

        // again ask user
        getOperation();
      }
    });
  });
}

// Function for executing of operation
function performOperation(values, operation) {
  switch (operation) {
    case 1:
      const sortedWords = filteredWords(values).sort();

      console.log("Sorted words alphabetically:", sortedWords);
      break;
    case 2:
      const numbersAscending = filteredNumbers(values).sort((a, b) => a - b);

      console.log("Numbers from lesser to greater:", numbersAscending);
      break;
    case 3:
      const numbersDescending = filteredNumbers(values).sort((a, b) => b - a);

      console.log("Numbers from bigger to smaller:", numbersDescending);
      break;
    case 4:
      const wordsByLength = filteredWords(values).sort(
        (a, b) => a.length - b.length
      );

      console.log(
        "Words in ascending order by number of letters:",
        wordsByLength
      );
      break;
    case 5:
      const uniqueWords = [...new Set(filteredWords(values))];

      console.log("Unique words:", uniqueWords);
      break;
    case 6:
      const uniqueValues = [...new Set(filteredNumbers(values))];

      console.log("Unique values:", uniqueValues);
      break;
    default:
      console.log("Invalid operation. Please choose a valid operation.");
      break;
  }

  getUserInput();
}

// HELPERS
function isUserExit(input) {
  if (input.trim().toLowerCase() === "exit") {
    console.log("Good bye! Come back again!");

    return true;
  }
}

function filteredWords(arr) {
  return arr.filter((item) => isNaN(item));
}

function filteredNumbers(arr) {
  return arr.filter((item) => !isNaN(item));
}

// Start
getUserInput();
