// https://leetcode.com/problems/integer-to-roman/description/

// Time complexity: O(1)
function intToRoman(num: number): string {
  // define map
  const romanMap = {
    M:1000,
    CM:900,
    D:500,
    CD:400,
    C:100,
    XC:90,
    L:50,
    XL:40,
    X:10,
    IX:9,
    V:5,
    IV:4,
    I:1
  };
  
  let result = '';
  for(let romanNum in romanMap){
    while (num >= romanMap[romanNum]) {
      result += romanNum;
      num -= romanMap[romanNum];
    }
  }
  return result;
};

// Test cases
console.log(intToRoman(3)); // "III"
console.log(intToRoman(4)); // "IV"
console.log(intToRoman(9)); // "IX"
console.log(intToRoman(58)); // "LVIII"
console.log(intToRoman(1994)); // "MCMXCIV"
console.log(intToRoman(3999)); // "MMMCM"
