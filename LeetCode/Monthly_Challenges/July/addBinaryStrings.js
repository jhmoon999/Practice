//* July 19: Add Binary

// Given two binary strings, return their sum (also a binary string).
// The input strings are both non-empty and contains only characters 1 or 0.

// Example 1:
// Input: a = "11", b = "1"
// Output: "100"

// Example 2:
// Input: a = "1010", b = "1011"
// Output: "10101"
 
// Constraints:
// Each string consists only of '0' or '1' characters.
// 1 <= a.length, b.length <= 10^4
// Each string is either "0" or doesn't contain any leading zero.

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
// Manually adding up the binary bits with a carry
// Time: O(n) where n is the number of bits of larger input, Space: O(n)
    const sum = [];  // array that will hold all combined bits in reverse order
    let i = a.length - 1, j = b.length - 1, carry = 0;
    while (i >= 0 || j >= 0) {
        if (i >= 0) carry += parseInt(a[i--]);
        if (j >= 0) carry += parseInt(b[j--]);
        // a[i] + b[j] + carry = 0, 1, 2, or 3
        // if total is 0 or 1, then carry = 0 and just push total into sum arr
        // if total is 2 or 3, then carry = 1 and push remainder into sum arr
        sum.push((carry % 2).toString());
        carry = Math.floor(carry / 2);
    }
    // if carry = 1 after the most significant bits of a and b are added, 
    // then push an extra bit into sum arr
    if (carry) sum.push('1');
    return sum.reverse().join(''); 
    
// Ugh, this one-liner only passed 194/294 cases
// When num is too large, parseInt(num) loses some digits at the end
    // return (parseInt(a, 2) + parseInt(b, 2)).toString(2);
};