//* June 10: Search, Insert, Position
// Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
// You may assume no duplicates in the array.

// Example 1:
// Input: [1,3,5,6], 5
// Output: 2

// Example 2:
// Input: [1,3,5,6], 2
// Output: 1

// Example 3:
// Input: [1,3,5,6], 7
// Output: 4

// Example 4:
// Input: [1,3,5,6], 0
// Output: 0

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
// Binary search - O(log(n))
    // edge case
    if (nums.length === 2) {
        if (target <= nums[0]) return 0;
        if (target <= nums[1]) return 1;
        return 2;
    }
    
    let i = 0, j, k = nums.length - 1;
    while (i <= k) {
        j = Math.floor((i + k) / 2);
        if (nums[j] === target) return j;
        // target is either first or last element
        else if (j === 0 || j === nums.length - 1) {
            return target < nums[j] ? j : j + 1;
        }
        else if (target < nums[j]) {
            // target found between two elements
            if (target > nums[j - 1]) return j;
            k = j - 1;
        }
        else if (target > nums[j]) {
            // target found between two elements
            if (target < nums[j + 1]) return j + 1;
            i = j + 1;
        }
    }
    
// Searching from start to end of array - O(n) 
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] >= target) return i;
    // }
    // return nums.length;
};