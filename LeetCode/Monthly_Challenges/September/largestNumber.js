//* September 25: Largest Number

// Given a list of non negative integers, arrange them such that they form the largest number.

// Example 1:
// Input: [10,2]
// Output: "210"

// Example 2:
// Input: [3,30,34,5,9]
// Output: "9534330"

// Note: The result may be very large, so you need to return a string instead of an integer.

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
// Given two strings a and b, compare whether a + b or b + a is bigger
// ex. a = '1', b = '24'
//     a + b = '1' + '24' = '124'
//     b + a = '24' + '1' = '241'
// b + a > a + b, so in an array, b should be before a
// Apply this logic to entire nums array and join them all for largest number
// Time: O(nlog(n)), Space: O(1)
    nums.sort((a, b) => (b + '' + a) - (a + '' + b));
    // there is an edge case that every element in nums array is '0'
    // we don't want '000000', we just want '0'
    // if '0' is in the array, it should be the last element
    // if '0' is the first element, then all elements are '0'
    if (nums[0] === 0) return "0";
    // if not all elements are '0', then return the combined number
    return nums.join('');
};