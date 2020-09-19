//* September 12: Combination Sum III

// Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.

// Note:
// All numbers will be positive integers.
// The solution set must not contain duplicate combinations.

// Example 1:
// Input: k = 3, n = 7
// Output: [[1,2,4]]

// Example 2:
// Input: k = 3, n = 9
// Output: [[1,2,6], [1,3,5], [2,3,4]]

/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
// Brute force - DFS recursively create every valid combination 
// Time: O(9!*k / (9-k)!) - there are 9! total combinations, but divide that 
// by (9-k)! for combinations with all unique digits. Every combination takes
// O(k) time to process validity.
// Space: O(k) due to recursive stack

    // ans array holds all valid combinations
    // combo array holds current valid combination
    const ans = [], combo = [];
    
    const findComboSum = function(currSum) {
        // once penultimate digit is reached, the last digit is simply 
        // n - sum of all current digits in combo
        if (combo.length === k - 1) {
            let lastNum = n - currSum;
            // if lastNum is more than 9, it is not a digit
            // if lastNum is less than most recently added digit in combo,
            // then combo array is not in order and combination is invalid
            if (lastNum <= 9 && lastNum > combo[combo.length - 1]) {
                // if conditions reached, add combo into ans array
                combo.push(lastNum);
                ans.push(combo.slice());
                combo.pop();
            }
            return;
        }
        //* at the start when combo is empty, j = 1
        //* after that, j is the last digit in combo (because we know that 
        //* next digit will be larger due to combo being in order)
        for (let j = combo[combo.length - 1] + 1 || 1; j <= 9; j++) {
            if (currSum + j <= n) {
                combo.push(j);
                findComboSum(currSum + j);
                combo.pop();
            }
        }
    }
    
    findComboSum(0, 0);
    return ans;
};