//* LC 126: Single Number
// Given a non-empty array of integers, every element appears twice except for one. Find that single one.

// Note:
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Example 1:
// Input: [2,2,1]
// Output: 1

// Example 2:
// Input: [4,1,2,1,2]
// Output: 4

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
// Using XOR on all elements
// O(n) time complexity and O(1) space complexity
    // *) a ^ b => (a & ~b) | (~a & b)
    // ex. 7 ^ 5 => (111 & ~101) | (~111 & 101)
    //           =  (111 & 010) | (000 & 101)
    //           =  010 | 000 = 010 => 2
    
    // 1) a ^ a = 0
    // ex. 7 ^ 7 => (111 & 000) | (000 & 111) = 0 | 0 = 0
    
    // 2) XOR is commutative
    // ex. a ^ b ^ a ^ b = (a ^ a) ^ (b ^ b)
    
    // 3) a ^ 0 = a
    // ex. 7 ^ 0 => (111 & ~000) | (~111 & 000)
    //           =  (111 & 111) | (000 & 000)
    //           =  111 | 000 = 111 => 7
    
    let single = 0;
    for (let i = 0; i < nums.length; i++) {
        single ^= nums[i];
    }
    return single;

// Using a dictionary to keep track of element frequency
// O(n) time complexity, but also O(n) space complexity
    // const auxObj = {};
    // for (let i = 0; i < nums.length; i++) {
    //     if (auxObj[nums[i]]) delete auxObj[nums[i]];
    //     else auxObj[nums[i]] = true;
    // }
    // return Object.keys(auxObj)[0];
};