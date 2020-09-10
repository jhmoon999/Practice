//* August 18: Numbers with Same Consecutive Differences

// Return all non-negative integers of length N such that the absolute difference between every two consecutive digits is K.

// Note that every number in the answer must not have leading zeros except for the number 0 itself. For example, 01 has one leading zero and is invalid, but 0 is valid.

// You may return the answer in any order.

// Example 1:
// Input: N = 3, K = 7
// Output: [181,292,707,818,929]
// Explanation: Note that 070 is not a valid number, because it has leading zeroes.

// Example 2:
// Input: N = 2, K = 1
// Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]

/**
 * @param {number} N
 * @param {number} K
 * @return {number[]}
 */
var numsSameConsecDiff = function(N, K) {
// DFS choose digit and then choose subsequent valid digit (+/- K)
// Time: O(N * 2^N), Space: O(2^N)
    const ans = [];
    
    // remember, '00' is not valid, but '0' is
    if (N === 1) ans.push(0);
    
    // find subsequent valid digit
    const addDigit = function(numStr, digit) {
        if (numStr.length === N) {
            ans.push(parseInt(numStr));
            return;
        }
        //* Long way
        // for (let i = 0; i <= 9; i++) {
        //     if (Math.abs(digit - i) === K) {
        //         addDigit(numStr + i, i);
        //     }
        // }

        //* Shorter way
        if (digit - K >= 0) addDigit(numStr + (digit - K), digit - K);
        if (K !== 0) {
            if (digit + K <= 9) addDigit(numStr + (digit + K), digit + K);
        }
    }
    for (let i = 1; i <= 9; i++) {
        addDigit(i.toString(), i);
    }
    return ans;
};