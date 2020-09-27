//* September 26: Teemo Attacking

//* This question is fairly straight forward, but I love that someone from Leetcode made a question about League of Legends. :D 

// In LOL world, there is a hero called Teemo and his attacking can make his enemy Ashe be in poisoned condition. Now, given the Teemo's attacking ascending time series towards Ashe and the poisoning time duration per Teemo's attacking, you need to output the total time that Ashe is in poisoned condition.

// You may assume that Teemo attacks at the very beginning of a specific time point, and makes Ashe be in poisoned condition immediately.

// Example 1:

// Input: [1,4], 2
// Output: 4
// Explanation: At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned immediately. 
// This poisoned status will last 2 seconds until the end of time point 2. 
// And at time point 4, Teemo attacks Ashe again, and causes Ashe to be in poisoned status for another 2 seconds. 
// So you finally need to output 4.
 
// Example 2:

// Input: [1,2], 2
// Output: 3
// Explanation: At time point 1, Teemo starts attacking Ashe and makes Ashe be poisoned. 
// This poisoned status will last 2 seconds until the end of time point 2. 
// However, at the beginning of time point 2, Teemo attacks Ashe again who is already in poisoned status. 
// Since the poisoned status won't add up together, though the second poisoning attack will still work at time point 2, it will stop at the end of time point 3. 
// So you finally need to output 3.
 
// Note:
// You may assume the length of given time series array won't exceed 10000.
// You may assume the numbers in the Teemo's attacking time series and his poisoning time duration per attacking are non-negative integers, which won't exceed 10,000,000.

/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function(timeSeries, duration) {
// Find total time in one pass by creating and merging intervals
// Time: O(n) where n is length of timeSeries, Space: O(1);
    if (timeSeries.length === 0 || duration === 0) return 0;
    let totalTime = duration, currPoisonEnd = timeSeries[0] + duration;
    for (let i = 1; i < timeSeries.length; i++) {
        // if the next time Teemo poisons Ashe is still within the duration of
        // the previous poison attack, then only add the difference
        if (timeSeries[i] <= currPoisonEnd) {
            totalTime += timeSeries[i] + duration - currPoisonEnd;
        }
        // otherwise, if Ashe isn't taking damage, add the full duration
        else totalTime += duration;
        // set the new end time of this poison attack
        currPoisonEnd = timeSeries[i] + duration;
    }
    return totalTime;
    
// Extremely inefficient brute force method
// Time:  O(nm) where n is length of timeSeries and m is duration
// Space: O(k + m) where k is last element in timeSeries
// Time Limit Exceeded - Passed 23/39 cases
    // if (timeSeries.length === 0 || duration === 0) return 0;
    // const poisonStatus = new Array(timeSeries[timeSeries.length - 1] + 1).fill(0);
    // // this nested for loop is inefficient because the same elements in 
    // // poisonStatus array can be set to 1 multiple times
    // for (let i = 0; i < timeSeries.length; i++) {
    //     for (let j = 0; j < duration; j++) {
    //         poisonStatus[timeSeries[i] + j] = 1;
    //     }
    // }
    // return poisonStatus.reduce((prev, curr) => curr += prev, 0);
};