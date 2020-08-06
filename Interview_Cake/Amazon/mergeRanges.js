// Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.

// To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as objects ↴ with integer properties startTime and endTime. These integers represent the number of 30-minute blocks past 9:00am.

// For example:

// { startTime: 2, endTime: 3 }  // meeting from 10:00 – 10:30 am
// { startTime: 6, endTime: 9 }  // meeting from 12:00 – 1:30 pm

// Write a function mergeRanges() that takes an array of multiple meeting time ranges and returns an array of condensed ranges.

// For example, given:
// [
//   { startTime: 0,  endTime: 1 },
//   { startTime: 3,  endTime: 5 },
//   { startTime: 4,  endTime: 8 },
//   { startTime: 10, endTime: 12 },
//   { startTime: 9,  endTime: 10 },
// ]

// your function would return:
// [
//   { startTime: 0, endTime: 1 },
//   { startTime: 3, endTime: 8 },
//   { startTime: 9, endTime: 12 },
// ]

// Do not assume the meetings are in order. The meeting times are coming from multiple teams.

// Write a solution that's efficient even when we can't put a nice upper bound on the numbers representing our time ranges. Here we've simplified our times down to the number of 30-minute slots past 9:00 am. But we want the function to work even for very large numbers, like Unix timestamps. In any case, the spirit of the challenge is to merge meetings where startTime and endTime don't have an upper bound.


//* My solution - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Time: O(nlog(n)) - due to sorting the array first before merging
// Space: O(n) - at worst, no ranges are merged and array has n meeting times
var mergeRanges = function(meetings) {
    // meetings is array with objects {startTime, endTime}
    // sort the meetings by startTime
    meetings = meetings.sort((a, b) => a.startTime - b.startTime);

    merged = [meetings[0]];
    for (let i = 1; i < meetings.length; i++) {
        let meeting1 = merged[merged.length - 1], meeting2 = meetings[i];
        // if overlap, then merge the meeting ranges
        if (meeting2.startTime <= meeting1.endTime) {
            merged[merged.length - 1].startTime = meeting1.startTime;
            merged[merged.length - 1].endTime = Math.max(meeting1.endTime, 
                                                         meeting2.endTime);
        }
        // if no overlap, then push meeting range to merged array
        else merged.push(meetings[i]);
    }
    return merged;
}