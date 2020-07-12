//* June 22: Single Number II

// Given a non-empty array of integers, every element appears three times except for one, which appears exactly once. Find that single one.

// Note: Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Example 1:
// Input: [2,2,3,2]
// Output: 3

// Example 2:
// Input: [0,1,0,1,0,1,99]
// Output: 99

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
// Same as bitwise method, but more concise coding    
    // const ans = [];
    // for (let i = 0; i < 32; i++) {
    //     ans.unshift(nums.reduce((acu, cur) => acu + (cur >> i & 1), 0) % 3);
    // }
    // return parseInt(ans.join(''), 2) >> 0;
    
// Bitwise method: The logic here is that if we add up the binary representation
// of all the input numbers and mod each bit by 3, the outlier will remain.
// ex. [9, 9, 9, 6] =>  1 0 0 1
    //                  1 0 0 1
    //                  1 0 0 1
    //                  0 1 1 0
    //                  -------
    //                  3 1 1 3 => 0 1 1 0 when you mod each bit by 3
// We do this to all 32 bits of every integer in nums array, giving us
// Time:  O(32n) -> O(n)
// Space: O(1)
    const ans = []; // this array will have all 32 bits of a binary string 
    for (let i = 0; i < 32; i++) {
        let bitSum = 0;
        for (let j = 0; j < nums.length; j++) {
            //  & 1 : masks all the bits except for the rightmost one
            bitSum += nums[j] & 1;
            // >> 1 : right shift by one bit (same as multiplying by 2)
            nums[j] >>= 1;
        }
        // mod by 3 once all the bits at index (31 - i) have been summed up
        ans[31 - i] = bitSum % 3;
    }
    // >>> 0 : converts a signed int to unsigned
    //  >> 0 : converts an unsigned int to signed
    // In the event that the outlier is a negative number, we want to convert
    // the answer to signed integer (ex. 4294967292 becomes -4).
    return parseInt(ans.join(''), 2) >> 0;
    
// Using auxilary object to keep track of number frequency
// Time:  O(n)
// Space: O(n)
    // const freqs = {};
    // for (let i = 0; i < nums.length; i++) {
    //     if (freqs.hasOwnProperty(nums[i])) {
    //         freqs[nums[i]] === 2 ? 
    //             delete freqs[nums[i]] :
    //             freqs[nums[i]] += 1;            
    //     }
    //     else freqs[nums[i]] = 1;
    // }
    // return Object.keys(freqs)[0];
};