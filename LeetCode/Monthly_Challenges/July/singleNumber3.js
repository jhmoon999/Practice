//* July 23: Single Number III

// Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.

// Example:
// Input:  [1,2,1,3,2,5]
// Output: [3,5]

// Note:
// The order of the result is not important. So in the above example, [5, 3] is also correct.
// Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function(nums) {
// Bit manipulation with XOR
// Run XOR through every element in nums array. Result should be a ^ b because 
// all other elements appear exactly twice and c ^ c = 0. Since we know a !== b,
// a ^ b cannot be 0, so result will have at least one bit that is 1 (index i). 
// a[i] and b[i] has to be different for (a ^ b)[i] to be 1. Thus, separate nums
// into two groups, those with 0 at index i and those with 1 at index i. This
// forces a and b to be in separate groups. Run XOR again through every element
// in each group to yield a and b. 
    // ex. nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 6]
    // Running XOR through every element: 5 ^ 6 => 101 ^ 110 = 011
    // The result is 1 at least signficant bit, so separate into two groups:
    // Group A (last significant bit = 1): [1, 1, 3, 3, 5]
    // Group B (last significant bit = 0): [2, 2, 4, 4, 6]
    // XOR through Group A yields 5, and XOR through Group B yields 6
// Time: O(n), Space: O(1)
    let result = 0;
    for (let i = 0; i < nums.length; i++) {
        result ^= nums[i];
    }
    // c & -c yields the least significant bit that is 1
    // ex.  c =  9 => 01001
    //     -c = -9 => 10111 (two's complement)
    //      c & -c => 00001
    result &= -result;
    let a = 0, b = 0;
    for (let i = 0; i < nums.length; i++) {
        // result is used to mask all irrelevant bits
        if (nums[i] & result) a ^= nums[i]; 
        else b ^= nums[i];
    }
    return [a, b];
    
// Brute force - store frequency of every number 
// Time: O(n), Space: O(n)
    // const freqs = {};
    // for (let i = 0; i < nums.length; i++) {
    //     if (freqs[nums[i]]) delete freqs[nums[i]];
    //     else freqs[nums[i]] = true;
    // }
    // return Object.keys(freqs);
};