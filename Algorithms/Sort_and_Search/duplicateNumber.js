//* June 25: Find the Duplicate Number

// Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

// Example 1:
// Input: [1,3,4,2,2]
// Output: 2

// Example 2:
// Input: [3,1,3,4,2]
// Output: 3

/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
// Detecting a cycle (linked list)
// Time:  O(n)
// Space: O(1)
    let turtle = nums[0], rabbit = nums[nums[0]];
    while (turtle !== rabbit) {
        turtle = nums[turtle];
        rabbit = nums[nums[rabbit]];
    }
    rabbit = 0;
    while (rabbit !== turtle) {
        rabbit = nums[rabbit];
        turtle = nums[turtle];
    }
    return turtle;
    
// Use an auxilary object to detect first duplicate
// Time:  O(n)
// Space: O(n)
    // const set = new Set();
    // for (let i = 0; i < nums.length; i++) {
    //     if (set.has(nums[i])) return nums[i];
    //     else set.add(nums[i]);
    // }
    
// Sorting the array first - duplicates next to each other
// Time:  O(nlog(n))
// Space: O(1)
    // nums.sort();
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] === nums[i + 1]) return nums[i];
    // }
};