//* June 13: Largest Divisible Subset

// Given a set of distinct positive integers, find the largest subset such that every pair (Si, Sj) of elements in this subset satisfies:

// Si % Sj = 0 or Sj % Si = 0.

// If there are multiple solutions, return any subset is fine.

// Example 1:
// Input: [1,2,3]
// Output: [1,2] (of course, [1,3] will also be ok)

// Example 2:
// Input: [1,2,4,8]
// Output: [1,2,4,8]

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function(nums) {
// Method 2 - O(n^2)
// Very similar to Method 1, but uses an extra array to keep track 
// of index of previous divisor for every num.
// This way, after iterating through nums to find maxCount, 
// the ans array can be created just by skipping through the 
// indices array. For example:
//       nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
// ->  counts = [ 1, 2, 2, 3, 2, 3, 2, 4, 3 ]
// -> indices = [-1, 0, 0, 1, 0, 2, 0, 3, 2 ]
// After iterating through, we find that the max count in counts
// array is 4. This means the max num in largest divisible subset
// is 8 -> ans = [8]. The corresponding slot in indices array 
// shows the index of next largest num in ans: 3. So push nums[3]
// into array -> ans = [8, 4]. Corresponding slot is 1, so push
// nums[1]. Corresponding slot is 0, so push nums[0]. Corresponding
// slot is -1, so stop. Final answer is [8, 4, 2, 1].
    
    // Finding max count of largest divisible subset
    if (nums.length === 0) return [];
    nums = nums.sort((a, b) => a - b);
    const counts = new Array(nums.length).fill(1);
    const indices = new Array(nums.length).fill(-1);
    let maxCount = 1;
    for (let i = 1; i < nums.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] % nums[j] === 0) {
                if (counts[j] + 1 > counts[i]) {
                    counts[i] = counts[j] + 1;
                    indices[i] = j;
                    maxCount = Math.max(maxCount, counts[i]);
                }
            }
        }
    }
    // Constructing the largest divisible subset
    const maxCountIndex = counts.indexOf(maxCount);
    const ans = [nums[maxCountIndex]];
    let currIndex = indices[maxCountIndex];
    while (currIndex >= 0) {
        ans.push(nums[currIndex]);
        currIndex = indices[currIndex];
    } 
    return ans;
    
// Method 1 - O(n^2)
    // nums = nums.sort((a, b) => a - b);
    // // counts starts off with all 1's because each can be a subset of 
    // // at least 1 (itself)
    // const counts = new Array(nums.length).fill(1);
    // // for each num, iterate the nums smaller than it (nums is sorted)
    // for (let i = 1; i < nums.length; i++) {
    //     for (let j = i - 1; j >= 0; j--) {
    //         // If nums[i] is a dividend of nums[j], then counts[i] can  
    //         // adopt counts[j] and add 1 due to itself
    //         // There could be multiple divisors, but we want the nums[j] 
    //         // with the largest counts[j]
    //         if (nums[i] % nums[j] === 0) {
    //             counts[i] = Math.max(counts[i], counts[j] + 1);
    //         }
    //     }
    // }
    // // we know the largest num in the largest divisible subset 
    // const maxCountIndex = counts.indexOf(Math.max(...counts)), ans = [];
    // let currNum = nums[maxCountIndex], currCount = counts[maxCountIndex];
    // // now construct the ans array with the correct divisors
    // for (let i = maxCountIndex; i >= 0; i--) {
    //     if (currNum % nums[i] === 0 && currCount === counts[i]) {
    //         ans.push(nums[i]);
    //         currNum = nums[i];  // next largest num in subset
    //         currCount -= 1;     // count decrements because we added another
    //                             // number to the ans array
    //     } 
    // }
    // return ans;
};