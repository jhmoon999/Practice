//* LC 46: Permutations
// Given a collection of distinct integers, return all possible permutations.
// Example:
// Input: [1,2,3]
// Output:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
// Time: O(n!) - the number of permutations for n elements is n!
// Space: O(n!) - recursive stack
    const perms = [];
    let temp;
    // helper function to create push permutations into perms array
    const createPerm = function(currPerm) {
        if (currPerm.length === nums.length) {
            perms.push(currPerm);
            return;
        }
        // put every number that is not already in currPerm into currPerm
        for (let i = 0; i < nums.length; i++) {
            if (!currPerm.includes(nums[i])) {
                temp = currPerm.slice();
                temp.push(nums[i]);
                createPerm(temp);
            }
        }
    }
    
    createPerm([]);
    return perms;
};