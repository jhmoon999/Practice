//* August 27: Find right interval

// You are given an array of intervals, where intervals[i] = [starti, endi] and each starti is unique.

// The right interval for an interval i is an interval j such that startj >= endi and startj is minimized.

// Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.

// Example 1:

// Input: intervals = [[1,2]]
// Output: [-1]
// Explanation: There is only one interval in the collection, so it outputs -1.

// Example 2:
// Input: intervals = [[3,4],[2,3],[1,2]]
// Output: [-1,0,1]
// Explanation: There is no right interval for [3,4].
// The right interval for [2,3] is [3,4] since start0 = 3 is the smallest start that is >= end1 = 3.
// The right interval for [1,2] is [2,3] since start1 = 2 is the smallest start that is >= end2 = 2.

// Example 3:
// Input: intervals = [[1,4],[2,3],[3,4]]
// Output: [-1,2,-1]
// Explanation: There is no right interval for [1,4] and [3,4].
// The right interval for [2,3] is [3,4] since start2 = 3 is the smallest start that is >= end1 = 3.
 
// Constraints:
// 1 <= intervals.length <= 2 * 104
// intervals[i].length == 2
// -106 <= starti <= endi <= 106
// The start point of each interval is unique.

/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function(intervals) {
// Brute force - for each interval, check the rest of array for right intervals
// Time: O(n^2), Space: O(1)
    const rightInts = new Array(intervals.length).fill(-1);
    for (let i = 0; i < intervals.length; i++) {
        let [a1, a2] = intervals[i], currMin = Infinity;
        for (let j = 0; j < intervals.length; j++) {
            if (i === j) continue;  // skip if encounters itself
            let [b1, b2] = intervals[j];
            if (b1 >= a2 && b1 < currMin) {
                currMin = b1;       // update current minimum right interval
                rightInts[i] = j;
            } 
        }
    }
    return rightInts;
};