//* LC 739: Daily Temperatures

// Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

// For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

/**
 * @param {number[]} T
 * @return {number[]}
 */
var dailyTemperatures = function(T) {
// Using a stack instead of an auxilary object (almost the same)
// Time: O(N) - the temperatures array is iterated through once
// Space: O(N) - the stack may store N temperatures
    const stack = [], ans = new Array(T.length).fill(0);
    for (let i = 0; i < T.length; i++) {
        // if top of stack is less than current temperature, then we 
        // can update ans array at that index
        while (stack.length > 0 && T[stack[stack.length - 1]] < T[i]) {
            // pop and repeat for the new top of stack if valid
            let j = stack.pop();
            ans[j] = i - j;
        }
        // push current temperature in stack where it will wait until
        // a higher temperature is encountered
        stack.push(i);
    }
    return ans;
    
// Using an auxilary object to keep track of the lower temperatures
// until a higher temperature is encountered, updating the ans array
// Time: O(N) - the temperatures array is iterated through once
// Space: O(N) - the auxilary object may store N temperatures 
    // const obj = {}, ans = new Array(T.length).fill(0);
    // obj[T[0]] = [0];
    // for (let i = 1; i < T.length; i++) {
    //     for (temp in obj) {
    //         // once a higher temperature is found, update ans and
    //         // remove from object because it won't be used anymore
    //         if (temp < T[i]) {
    //             obj[temp].forEach(j => ans[j] = i - j);
    //             delete obj[temp];
    //         }
    //     }
    //     // if temperature has multiple instances, save all indices
    //     if (obj.hasOwnProperty(T[i])) {
    //         obj[T[i]].push(i);
    //     }
    //     else obj[T[i]] = [i];
    // }
    // return ans;
};