//* August 4: Power of Four

// Given an integer (signed 32 bits), write a function to check whether it is a power of 4.

// Example 1:
// Input: 16
// Output: true

// Example 2:
// Input: 5
// Output: false

// Follow up: Could you solve it without loops/recursion?

/**
 * @param {number} num
 * @return {boolean}
 */
var isPowerOfFour = function(num) {
// Bit Manipulation
// Time: O(1), Space: O(1)
    return num > 0 
    // if num is a power of 2, then num & (num - 1) yields 0
    // ex. 8 => 1000        16 => 10000
    //     7 => 0111        15 => 01111
    // 8 & 7 => 0000   16 & 15 => 00000
        && (num & (num - 1)) === 0 
    // the difference between power of 2 and power of 4 is that 
    // a power of 4 has the bit set on an even power
    // ex. 4 = 4^1 = 2^2 => 0010, 16 = 4^2 = 2^4 = 1000
    // let mask = 0x55555555 (0101 0101 ... 0101 0101). since  
    // mask has bits set on all the even powers, num & mask = 0
    // if num is a power of 2, but not 4
        && (num & 0x55555555) !== 0;
    
// Brute force
// Time: O(log4(n)), Space: O(1)
    // while (num > 1) num /= 4;
    // return num === 1;
};