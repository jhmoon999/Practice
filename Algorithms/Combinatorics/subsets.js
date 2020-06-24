//* LC 78: Subsets
// Given a set of distinct integers, nums, return all possible subsets (the power set).
// Note: The solution set must not contain duplicate subsets.
// Example:
// Input: nums = [1,2,3]
// Output:
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    
    const findSubsets = function(subStr, i) {
        if (i === nums.length) {
            combinations.push(subStr);
            return;
        }
        findSubsets(subStr, i + 1);
        // IMPORTANT:
            // can't do:
            // temp = subStr;
            // temp.push(nums[i]);
            // subStr is an array which is unlike a string variable
            // because pushing to temp will push to subStr address.
            // Thus we have to copy the subStr array as temp using slice()
        temp = subStr.slice();
        temp.push(nums[i]);
        findSubsets(temp, i + 1);
    }
    
    const combinations = [];
    let temp;
    findSubsets([], 0);
    return combinations;
};