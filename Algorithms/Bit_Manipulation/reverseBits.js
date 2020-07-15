//* July 12: Reverse Bits

// Reverse bits of a given 32 bits unsigned integer.

// Example 1:
// Input: 00000010100101000001111010011100
// Output: 00111001011110000010100101000000
// Explanation: The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 which its binary representation is 00111001011110000010100101000000.

// Example 2:
// Input: 11111111111111111111111111111101
// Output: 10111111111111111111111111111111
// Explanation: The input binary string 11111111111111111111111111111101 represents the unsigned integer 4294967293, so return 3221225471 which its binary representation is 10111111111111111111111111111111.

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
// Layman's terms: Iterate through n (starting from last bit to first) 
// and append each bit to a new binary string

// Bitwise terms: Mask n except for the last bit and perform OR with
// new binary string to append the bit. Right shift n by 1 to set
// the next bit to be appended as the new rightmost bit. Left shift
// new binary string by 1 so rightmost bit is cleared for OR operation.

    let reversed = 0;   // new binary string to hold reversed bits
    for (let i= 0; i < 32; i++){
        // Left shift 'reversed' by 1 to clear rightmost bit
        reversed <<= 1;
        // Mask n except for last bit and then OR it with 'reversed'
        // to set its rightmost bit 
        reversed |= n & 1;
        // Right shift n by 1 for a new rightmost bit
        n >>= 1;
    }
    // convert to unsigned int
    return reversed >>> 0;
};