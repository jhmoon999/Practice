//* September 13: Insert Interval

// Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

// You may assume that the intervals were initially sorted according to their start times.

// Example 1:
// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]

// Example 2:
// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
// First, all intervals that have end times before newInterval's start time can
// be inserted into answer array without alteration. Now we are left only with
// intervals that have end times after newInterval's start time. Add in the 
// condition that the start time has to be before newInterval's end time, and
// we have found all intervals that need to be merged into newInterval. Finally
// we are left only with intervals that have start times after newInterval's
// end time, and they can be inserted into answer array without alteration.
// Time: O(n), Space: O(1)
    let ans = [], i = 0;
    // intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        ans.push(intervals[i]);
        i += 1;
    }
    // intervals to be merged into newInterval
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i += 1;
    }
    ans.push(newInterval);
    // intervals after newInterval
    while (i < intervals.length) {
        ans.push(intervals[i]);
        i += 1;
    }
    return ans;
};