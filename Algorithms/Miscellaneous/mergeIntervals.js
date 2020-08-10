//* LC 56: Merge Intervals

// Given a collection of intervals, merge all overlapping intervals.

// Example 1:
// Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
// Output: [[1,6],[8,10],[15,18]]
// Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

// Example 2:
// Input: intervals = [[1,4],[4,5]]
// Output: [[1,5]]
// Explanation: Intervals [1,4] and [4,5] are considered overlapping.

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
// Sort intervals by start time and merge intervals if one's end 
// time overlaps with an adjacent interval's start time
// Time: O(nlog(n)) due to sorting in the beginning
// Space: O(1)
    if (intervals.length === 0) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        // always use the most recent interval in merged array
        let [a1, a2] = merged[merged.length - 1];
        let [b1, b2] = intervals[i];
        // interval's end time overlaps with another's start time
        if (a2 >= b1) {
            merged[merged.length - 1][1] = Math.max(a2, b2);
        }
        // if no overlap, then just push into array
        else merged.push(intervals[i]);
    }
    return merged;
};