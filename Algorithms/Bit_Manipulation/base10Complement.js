//* October 5: Complement of Base 10 Integer

// Every non-negative integer N has a binary representation.  For example, 5 can be represented as "101" in binary, 11 as "1011" in binary, and so on.  Note that except for N = 0, there are no leading zeroes in any binary representation.

// The complement of a binary representation is the number in binary you get when changing every 1 to a 0 and 0 to a 1.  For example, the complement of "101" in binary is "010" in binary.

// For a given number N in base-10, return the complement of it's binary representation as a base-10 integer.

// Example 1:
// Input: 5
// Output: 2
// Explanation: 5 is "101" in binary, with complement "010" in binary, which is 2 in base-10.

// Example 2:
// Input: 7
// Output: 0
// Explanation: 7 is "111" in binary, with complement "000" in binary, which is 0 in base-10.

// Example 3:
// Input: 10
// Output: 5
// Explanation: 10 is "1010" in binary, with complement "0101" in binary, which is 5 in base-10.

/**
 * @param {number} N
 * @return {number}
 */
var bitwiseComplement = function(N) {
// A binary number plus its complement will equal 111...111 in binary.
// Thus, we can find the first number consisting of only high bits that is
// larger than N. The difference will be the complement.
// Time: O(log(N)), Space: O(log(N))
    let X = 1;
    while (N > X) X = X * 2 + 1;
    return X - N;
    
// Find binary string of N and iterate through each bit to turn '0' to '1'
// and '1' to '0', yielding its complement. Return complement as base 10.
// Time: O(n), Space: O(n), where n is length of binary string of N
// which is actually the floor of log(N) + 1 (so similar complexities)
    // const binary = N.toString(2);
    // let complement = '0';
    // for (let i = 0; i < binary.length; i++) {
    //     complement += binary[i] === '0' ? '1' : '0';
    // }
    // return parseInt(complement, 2);
};