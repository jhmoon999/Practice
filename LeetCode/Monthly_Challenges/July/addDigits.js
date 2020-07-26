//* July 26: Add Digits

// Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

// Example:
// Input: 38
// Output: 2 
// Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2. 
//              Since 2 has only one digit, return it.
// Follow up:
// Could you do it without any loop/recursion in O(1) runtime?

/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function(num) {
// Math - digit root congruence formula:
    // if n = 0: dr(n) = 0
    // else:     dr(n) = 1 + (n - 1) % (b - 1) where b is base 10
// Time: O(1), Space: O(1)
    return num === 0 ? 0 : 1 + (num - 1) % 9;

// Brute force
// Time: O(nlog10(n)) - first pass: n digits, second pass: log10(n) digits
// Space: O(1) 
    // num = num.toString();
    // while (num.length > 1) {
    //     let temp = 0;
    //     for (let i = 0; i < num.length; i++) {
    //         temp += parseInt(num[i]); 
    //     }
    //     num = temp.toString();
    // }
    // return num;
};