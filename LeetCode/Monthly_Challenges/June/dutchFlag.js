//* June 11: Dutch National Flag Problem

// Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.
// Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

// Example:
// Input: [2,0,2,1,1,0]
// Output: [0,0,1,1,2,2]

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
    // three pointers: 
    // red points to beginning and moves forwward
    // blue points to end and move backward
    // white points from red to blue; serves as current pointer
    let r = 0, w = 0, b = nums.length - 1;
    while (w <= b) {
        // if 0, swap to red pointer 
        if (nums[w] === 0) {
            if (r !== w) [nums[w], nums[r]] = [nums[r], nums[w]];
            r += 1;
            w += 1;
        }
        // if 2, swap to blue pointer
        else if (nums[w] === 2) {
            [nums[w], nums[b]] = [nums[b], nums[w]];
            b -= 1;
        }
        // if 1, proceed because it should be in the middle
        else w += 1;
    }
};