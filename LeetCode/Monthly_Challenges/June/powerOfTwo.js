//* June 8: Power of Two
// Given an integer, write a function to determine if it is a power of two.

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function(n) {
// Bitwise - O(1)
// so clever! a power of 2 will always have only 1 set bit 
// and the number immediately less than that will have all set bits
// ex. 2 = 10    8 = 1000    32 = 100000
//     1 =  1    7 =  111    31 =  11111
    return n > 0 ? (n & (n - 1)) === 0 : false;

// Iterative - O(log(n))
    // while (n > 1) n /= 2;
    // return n === 1;
};