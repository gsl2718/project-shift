// Problem 1
// Write a function, that when invoked, alerts "Durham is awesome!"

function awesomeDurham () {
  alert('Durham is awesome!');
}

// Problem 2
// Write some JavaScript that loops through the following bands array and alerts, 
// "I love [bandName]", obviously with the current band name string replacing the [bandName].
const bands = ['Kiss', 'Aerosmith', 'ACDC', 'Led Zeppelin', 'Nickelback'];

bands.forEach((band) => alert(`I love ${band}`));

// Problem 3
// In the above challenge, when the loop gets to 'Nickelback', alert, 
// "I DON'T love Nickelback!", but still alert the previous message for all other bands.

bands.forEach((band) => {
  (band !== 'Nickelback') ? alert(`I love ${band}`) : alert("I DON'T love Nickelback!");
});

// Problem 4
// Write some JavaScript that finds the average of the following array:

let array = [34, 203, 16, 46, 34, 432, 342, 124, 33, 188, 12];

let averageArr = array.reduce((acc, currValue) => acc + currValue) / array.length;

console.log(averageArr); // 133.0909...

// Problem 5
// Write some JavaScript to find the MOST frequent item, and the LEAST frequent item in the following array. 
// The return should look like: The most frequent item is: b. The least frequent item is : d

array = ['a', 'b', 'c', 'd', 'c', 'b', 'b', 'c', 'a', 'e', 'b', 'e'];

const getMostAndLeastFrequent = function (array) {
  let maxChar = '', minChar = '';
  
  // collect the characters and the associated total of each as key-value pairs 
  const accumulateChars = array.reduce((characters, character) => { 
    if (character in characters) characters[character]++;
    else characters[character] = 1;
    
    return characters;
    }, {});
  
  // gather the most and least frequent counts  
  const counts = Object.values(accumulateChars);
  const maxCount = Math.max(...counts); 
  const minCount = Math.min(...counts);
  
  // get associated character for most and least frequent counts  
  for (let character in accumulateChars) {
    const charCount = accumulateChars[character];
    if (charCount === maxCount) maxChar += character;
    if (charCount === minCount) minChar += character;
  }

  return `The most frequent item is: ${maxChar}. The least frequent item is: ${minChar}`;  
}

console.log(getMostAndLeastFrequent(array));

// Problem 6
// Imagine that you have two arrays, each with single letter strings in the arrays. For example:
// ['a', 'b', 'c', 'a', 'a', 'b', 'd'];
// ['a', 'b', 'b', 'a', 'e', 'c', 'c', 'g'];
//
// Write some JavaScript to create a new array based on the overlapping items and the number of times 
// the overlap occurs. For example, our new array would look like this:
// ['a', 'a', 'c', 'b', 'b'];
//
// To explain further, the string 'a' appears 3 times in the first array and 2 times in the second array.
// Therefore, there are only 2 overlaps. The string 'c' appears 1 time in the first array and 2 times in 
// the second array. Therefore, there is only 1 overlap. The same pattern follows with 'b'. 
// Our new array is based on those overlaps.

const getOverlaps = (arr1, arr2) => {
  let overlapArr = [];

  // collect the characters and the associated total of each as key-value pairs 
  const accumulateCharsArr1 = arr1.reduce((characters, character) => { 
    if (character in characters) characters[character]++;
    else characters[character] = 1;
    
    return characters;
    }, {});

  const accumulateCharsArr2 = arr2.reduce((characters, character) => { 
    if (character in characters) characters[character]++;
    else characters[character] = 1;
    
    return characters;
    }, {});
  
  for (let char in accumulateCharsArr1) {
    const charCount1 = accumulateCharsArr1[char];
    if (char in accumulateCharsArr2) {
      const charCount2 = accumulateCharsArr2[char];
      for (let i = 1; i <= Math.min(charCount1, charCount2); i++) {
        overlapArr.push(char);
      }
    }
  }
  return overlapArr;
}

let arr1 = ['a', 'b', 'c', 'a', 'a', 'b', 'd'];
let arr2 =  ['a', 'b', 'b', 'a', 'e', 'c', 'c', 'g'];
console.log(getOverlaps(arr1, arr2)); // ['a', 'a', 'b', 'b', 'c']

// Problem 7
// Imagine that you're wanting to withdraw cash from the bank to cover specific costs. 
// You want to withdraw the exact dollar amount, using the largest bills possible. 
// For example, if the cost you were trying to cover is $1,745, you would need to withdraw 
// 17 $100 bills, 2 $20 bills and 1 $5 bill. We'll leave change (anything less than a dollar)
// out of it for the sake of the exercise.
//
// To solve this, write a function that takes one argument, cost, and returns an object with 
// the bill breakdown. For example, the object returned for $1,744, would like look this:
// {
//   100: 17,
//   20: 2,
//   1: 4
// }
//
// If you want to take it a step further, enable your function to take a second argument, bills, 
// which is an array of the bills you want your budget broken down in to. For example:
// budgetToBills(1754, [20, 10, 5, 1]); // { 20: 87, 10: 1, 1: 4 }
// budgetToBills(1754, [100, 20, 50, 10, 5, 1]; // { 100: 17, 50: 1, 4: 1 }
//
// What if you someone passes in the wrong arguments?

const getBillBreakdown = (cost, billArr = [100,50,20,10,5,1]) => {
  
  if (typeof cost !== 'number') throw Error ('Please provide a number for the first argument!');
  if (!Array.isArray(billArr)) throw Error ('Please provide an array of numbers for the second argument!')
  
  let billBreakdown = {};
  if (billArr.includes(100)) var countOf100bills = Math.floor(cost / 100);
  if (billArr.includes(50)) var countOf50bills = Math.floor((cost - 100 * (countOf100bills || 0)) / 50);
  if (billArr.includes(20)) var countOf20bills = Math.floor((cost - 100 * (countOf100bills || 0) - 50 * (countOf50bills || 0)) / 20);
  if (billArr.includes(10)) var countOf10bills = Math.floor((cost - 100 * (countOf100bills || 0) - 50 * (countOf50bills || 0) - 20 * (countOf20bills || 0)) / 10);
  if (billArr.includes(5)) var countOf5bills = Math.floor((cost - 100 * (countOf100bills || 0) - 50 * (countOf50bills || 0) - 20 * (countOf20bills || 0) - 10 * (countOf10bills || 0)) / 5);
  if (billArr.includes(1)) var countOf1bills = Math.floor((cost - 100 * (countOf100bills || 0) - 50 * (countOf50bills || 0) - 20 * (countOf20bills || 0) - 10 * (countOf10bills || 0) - 5 * (countOf5bills || 0)));

  if (countOf100bills) billBreakdown[100] = countOf100bills;
  if (countOf50bills) billBreakdown[50] = countOf50bills;
  if (countOf20bills) billBreakdown[20] = countOf20bills;
  if (countOf10bills) billBreakdown[10] = countOf10bills;
  if (countOf5bills) billBreakdown[5] = countOf5bills;
  if (countOf1bills) billBreakdown[1] = countOf1bills;
  
  return billBreakdown;
}

console.log(getBillBreakdown(1745)); // {5: 1, 20: 2, 100: 17}
console.log(getBillBreakdown(1744)); // {1: 4, 20: 2, 100: 17}
console.log(getBillBreakdown(1754, [20, 10, 5, 1])); // { 1:4, 10: 1, 20: 87}
