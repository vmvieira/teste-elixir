// Node's file system import and variables parsing from json format.

const fs = require("fs");

const itemData = fs.readFileSync("data/itemData.json");
const items = JSON.parse(itemData);

const maildata = fs.readFileSync("data/emailData.json");
const emails = JSON.parse(maildata);

// -----------------------------------------------------------------------------

const returnMapFunction = (listOfItems, listOfEmails) => {
  // Testing if the lists are empty or not in order to execute the function

  if (
    Array.isArray(listOfItems) &&
    listOfItems.length &&
    Array.isArray(listOfEmails) &&
    listOfEmails.length
  ) {
    // The function should:

    // Calculate the total sum of the values in the purchase list (itemData.json), that is, multiply the item's quantity by it's price and add all of them.

    let sumInitialValue = 0;
    const sumTotal = listOfItems.reduce(
      (accumulator, currentObject) =>
        accumulator + currentObject.quantity * currentObject.value,
      sumInitialValue
    );
    console.log(sumTotal);

    // -----------------------------------------------------------------------------

    // Divide the total sum equally between the number of users (emailData.json)

    const distributeEvenly = (totalToDistribute, usersToReceive) => {
      var total = totalToDistribute * 100,
        remainder = total % usersToReceive,
        valueWithoutRemainder = Math.floor(total / usersToReceive) / 100,
        valueWithRemainder = Math.floor(total / usersToReceive + 1) / 100;

      // This for loop will distribute the value with the remainder from the division as long as there are remainders to distribute and will assign their values in an output array

      for (
        var i = 0, outputArr = new Array(usersToReceive);
        i < usersToReceive;
        ++i
      ) {
        outputArr[i] =
          i < remainder ? valueWithRemainder : valueWithoutRemainder;
      }
      return outputArr;
    };

    const dividedTotal = distributeEvenly(sumTotal, listOfEmails.length);

    // -----------------------------------------------------------------------------

    // Return a map/dictionary where the key is the user's email and the value is how much he has to pay

    const mappedTotal = {};
    listOfEmails.map(
      (eachObj, idx) => (mappedTotal[eachObj.email] = dividedTotal[idx])
    );

    const finalMap = new Map(
      Object.keys(mappedTotal).map((key) => [key, mappedTotal[key]])
    );

    return finalMap;
  } else if (listOfItems.length === 0 && listOfEmails.length === 0) {
    console.log("Invalid input, both lists are empty");
  } else if (listOfEmails.length === 0) {
    console.log("Invalid input, the list of emails is empty");
  } else if (listOfItems.length === 0) {
    console.log("Invalid input, the list of items is empty");
  }
};

// -----------------------------------------------------------------------------

// Invoking the function with the real arguments

console.log(returnMapFunction(items, emails));
