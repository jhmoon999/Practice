//* August 6: Find all duplicates in an array

// Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

// Find all the elements that appear twice in this array.

// Could you do it without extra space and in O(n) runtime?

// Example:
// Input:  [4,3,2,7,8,2,3,1]
// Output: [2,3]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
// Using nums array itself as an indicator of element reoccurence
// Time: O(n), Space: O(1)
    const duplicates = [];
    //* the key to this solution is in the restrictions of the problem:
    //* that all elements in array are 1 ≤ a[i] ≤ n (n = size of array)
    for (let i = 0; i < nums.length; i++) {
        // when we encounter nums[i], flip nums[i-1] to negative
        // if nums[i-1] is already negative, then i must have occurred twice
        let index = Math.abs(nums[i]) - 1;
        if (nums[index] > 0) nums[index] *= -1;
        else duplicates.push(index + 1);
    }
    return duplicates;
    
// Brute force - using auxilary object to store frequency
// Time: O(n), Space: O(n)
    // const auxObj = new Set(), ans = [];
    // for (let i = 0; i < nums.length; i++) {
    //     if (!auxObj.has(nums[i])) auxObj.add(nums[i]);
    //     else ans.push(nums[i]);
    // }
    // return ans;
};