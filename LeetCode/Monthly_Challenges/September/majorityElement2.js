//* September 22: Majority Element II

// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

// Follow-up: Could you solve the problem in linear time and in O(1) space?

// Example 1:
// Input: nums = [3,2,3]
// Output: [3]

// Example 2:
// Input: nums = [1]
// Output: [1]

// Example 3:
// Input: nums = [1,2]
// Output: [1,2]
 
// Constraints:
// 1 <= nums.length <= 5 * 104
// -109 <= nums[i] <= 109

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
// Boyer-Moore Voting algorithm
// Time: O(n), Space: O(1)
    

// Brute force - store frequency of each num 
// Time: O(n), Space: O(n)
    const freqs = {};
    for (let i = 0; i < nums.length; i++) {
        freqs[nums[i]] = freqs[nums[i]] + 1 || 1;
    }
    const ans = [], majority = nums.length / 3;
    for (let num in freqs) {
        if (freqs[num] > majority) ans.push(num);
    }
    return ans;
};