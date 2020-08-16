//* August 15: Non-overlapping intervals

// Given a collection of intervals, find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

// Example 1:
// Input: [[1,2],[2,3],[3,4],[1,3]]
// Output: 1
// Explanation: [1,3] can be removed and the rest of intervals are non-overlapping.

// Example 2:
// Input: [[1,2],[1,2],[1,2]]
// Output: 2
// Explanation: You need to remove two [1,2] to make the rest of intervals non-overlapping.

// Example 3:
// Input: [[1,2],[2,3]]
// Output: 0
// Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 
// Note:
// You may assume the interval's end point is always bigger than its start point.
// Intervals like [1,2] and [2,3] have borders "touching" but they don't overlap each other.

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
// Time: O(nlog(n)), Space: O(1)
    if (intervals.length === 0) return 0;
    // sort intervals by end time
    intervals.sort((a, b) => a[1] - b[1]);
    // count is number of intervals that will be removed
    let count = 0, end = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        // if the interval overlaps with end, remove it
        if (intervals[i][0] < end) count += 1;
        // if not, update end
        // (remember, intervals are sorted by end time)
        else end = intervals[i][1];
    }
    return count;
};