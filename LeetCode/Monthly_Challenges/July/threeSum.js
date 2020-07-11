/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
// Sorting the array before Two-Sum - O(n^2 + nlog(n))
// By sorting the array first, we can use a 2-pointer method to 
// select which values to sum up to 0 and skip any duplicates
    nums = nums.sort((a, b) => a - b);
    const ans = {}, cache = new Set();
    for (let i = 0; i < nums.length; i++) {
        // cache is specifically to avoid repeating this process for duplicates
        if (!cache.has(nums[i])) {
            let j = i + 1, k = nums.length - 1, sum, temp;
            while (j < k) {
                sum = nums[i] + nums[j] + nums[k];
                if (sum < 0) j += 1;        // < 0: nums[j] should be larger
                else if (sum > 0) k -= 1;   // > 0: nums[k] should be smaller
                else {                      // = 0: store the combination
                    temp = [nums[i], nums[j], nums[k]];
                    ans[temp.sort((a, b) => a - b)] = true;
                    j += 1;
                    k -= 1;
                }
            }
            cache.add(nums[i]);
        }
    }
    return Object.keys(ans).map(key => key.split(',').map(Number));
    
// Simplifying to Two-Sum - O(n^2)
// Two-Sum is O(n) if we use an auxilary object
// We fix one number from nums and apply Two-Sum to the rest
// We do this for all nums, so time complexity is O(n^2)
// Time Limit Exceeded - 312/313 cases passed
// Last case is just an array of thousands of 0's
    // const twoSum = function(arr, target) {
    //     const auxObj = new Set(), combinations = [];
    //     for (let i = 0; i < arr.length; i++) {
    //         if (auxObj.has(arr[i])) {
    //             combinations.push([target - arr[i], arr[i]]);
    //         }
    //         else auxObj.add(target - arr[i]);
    //     }
    //     return combinations;
    // }
    // const ans = {};
    // for (let i = 0; i < nums.length; i++) {
    //     let temp = twoSum(nums.slice(i + 1), 0 - nums[i]);
    //     for (let j = 0; j < temp.length; j++) {
    //         temp[j].push(nums[i]);
    //         ans[temp[j].sort((a, b) => a - b)] = true;
    //     }
    // }
    // return Object.keys(ans).map(key => key.split(',').map(Number));
    
// Take it or leave it Recursion - O(2^n)
// Time Limit Exceeded - 229/313 cases passed
    // let ans = {}, temp;
    // const recursive = function(curr, sum, i) {
    //     if (curr.length === 3 && sum === 0) {
    //         ans[curr.sort()] = true;
    //         return;
    //     }
    //     if (curr.length > 3 || i === nums.length) return;
    //     recursive(curr, sum, i + 1);
    //     temp = curr.slice();
    //     temp.push(nums[i]);
    //     recursive(temp, sum + nums[i], i + 1)
    // }
    // recursive([], 0, 0);
    // return Object.keys(ans).map(key => key.split(',').map(Number));
};