//* LC 42: Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.
// Example:
// Input: [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
// Sliding window - O(n^2)
// * Check out its DP approach in DP folder - O(n)
    let volume = 0;
    // for each element in the array, find the max height
    // of its left wall and its right wall
    for (let i = 0; i < height.length; i++) {
        let leftWall = 0, rightWall = 0;
        for (let j = i; j >= 0; j--) {
            leftWall = Math.max(leftWall, height[j]);
        }
        for (let j = i; j < height.length; j++) {
            rightWall = Math.max(rightWall, height[j]);
        }
        // the volume of water trapped at that location
        // in the array is the smaller height of the 
        // walls - the height at that location
        volume += Math.min(leftWall, rightWall) - height[i];
    }
    return volume;
};