//* July 5: Hamming Distance

// The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

// Given two integers x and y, calculate the Hamming distance.

// Note:
// 0 ≤ x, y < 231.

// Example:
// Input: x = 1, y = 4
// Output: 2
// Explanation:
// 1   (0 0 0 1)
// 4   (0 1 0 0)
//        ↑   ↑
// The above arrows point to positions where the corresponding bits are different.

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function(x, y) {
// Bit manipulation - O(n) where n is length of binary string
// XOR describes Hamming Distance perfectly because the operation
// compares corresponding bits and returns 1 if different, 0 if same
// ex. 7 ^ 10 => 0111 ^ 1010 = 1101 => 3 bits different
    let ans = 0, xorStr = (x ^ y).toString(2);  // binary string
    for (let i = 0; i < xorStr.length; i++) {
        if (xorStr[i] === '1') ans += 1;
    }
    return ans;
    
// Without using bit manipulation (dividing by 2 = shifting)
    // let ans = 0;
    // while (x > 0 || y > 0) {
    //     // corresponding bit is different
    //     if (x % 2 !== y % 2) ans += 1;
    //     // move on to the next bit
    //     x = Math.floor(x / 2);
    //     y = Math.floor(y / 2);
    // }
    // return ans;
};