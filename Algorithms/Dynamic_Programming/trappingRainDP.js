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
// Dynamic programming - O(n) time, O(n) space
// Store max height of wall from the left end in array
// Store max height of wall from the right end in array
// The overlapping area of the two arrays is the trapped water
    const maxLeftWall = [], maxRightWall = [];
    // The leftmost height is the first element of maxLeftWall.
    // Populate the rest by comparing previous max height to height[i]
    // going from left to right.
    maxLeftWall[0] = height[0];
    for (let i = 1; i < height.length; i++) {
        maxLeftWall[i] = Math.max(maxLeftWall[i - 1], height[i]);
    }
    // The rightmost height is the last element of maxRightWall.
    // Populate the rest by comparing previous max height to height[i]
    // going from right to left.
    maxRightWall[height.length - 1] = height[height.length - 1];
    for (let i = height.length - 2; i >= 0; i--) {
        maxRightWall[i] = Math.max(maxRightWall[i + 1], height[i]);
    }
    // The overlapping area is the minimum of height at maxLeftWall and 
    // maxRightWall, excluding the original height of elevation at i
    let volume = 0;
    for (let i = 0; i < height.length; i++) {
        volume += Math.min(maxLeftWall[i], maxRightWall[i]) - height[i];
    }
    return volume;
    
// Sliding window - O(n^2) time, O(1) space
    // let volume = 0;
    // // for each element in the array, find the max height
    // // of its left wall and its right wall
    // for (let i = 0; i < height.length; i++) {
    //     let leftWall = 0, rightWall = 0;
    //     for (let j = i; j >= 0; j--) {
    //         leftWall = Math.max(leftWall, height[j]);
    //     }
    //     for (let j = i; j < height.length; j++) {
    //         rightWall = Math.max(rightWall, height[j]);
    //     }
    //     // the volume of water trapped at that location
    //     // in the array is the smaller height of the 
    //     // walls - the height at that location
    //     volume += Math.min(leftWall, rightWall) - height[i];
    // }
    // return volume;
};