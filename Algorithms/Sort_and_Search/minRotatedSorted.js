//* LC 153: Find Minimum in Rotated Sorted Array

// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

// Find the minimum element.

// You may assume no duplicate exists in the array.

// Example 1:
// Input: [3,4,5,1,2] 
// Output: 1

// Example 2:
// Input: [4,5,6,7,0,1,2]
// Output: 0

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
// Binary Search - Time: O(log(n)), Space: O(log(n))
    // helper function returns the smallest element in subarray
    const arrMin = function(i, k) {
        // if only one element, it's the smallest
        if (i === k) return nums[i];
        // if sorted, smallest element is first
        if (nums[i] < nums[k]) return nums[i];
        // if subarray is unsorted due to rotation, split it into 
        // two subarrays and run helper function on each half
        else {
            let j = Math.floor((i + k) / 2);
            // recursive stack will hold at most log(n) elements
            return Math.min(arrMin(i, j), arrMin(j + 1, k)); 
        }
    }
    return arrMin(0, nums.length - 1);
};