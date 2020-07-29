//* July 28: Task Scheduler

// You are given a char array representing tasks CPU need to do. It contains capital letters A to Z where each letter represents a different task. Tasks could be done without the original order of the array. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

// However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

// You need to return the least number of units of times that the CPU will take to finish all the given tasks.

// Example 1:
// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation: 
// A -> B -> idle -> A -> B -> idle -> A -> B
// There is at least 2 units of time between any two same tasks.

// Example 2:
// Input: tasks = ["A","A","A","B","B","B"], n = 0
// Output: 6
// Explanation: On this case any permutation of size 6 would work since n = 0.
// ["A","A","A","B","B","B"]
// ["A","B","A","B","A","B"]
// ["B","B","B","A","A","A"]
// ...
// And so on.

// Example 3:
// Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
// Output: 16
// Explanation: 
// One possible solution is
// A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
// Given an array of tasks and a cooldown period between same tasks, we can
// order the tasks in a way such that the most frequent tasks become a frame
// that other tasks can be inserted in between to reduce idle time ('_').
    // ex. [A, A, A, B, B], 1 => ABABA
    // ex. [A, A, A, B, B], 2 => AB_AB_A
    // ex. [A, A, B, B, B], 3 => BA__BA__B
// Time: O(nlog(n)), Space: O(26) => O(1)
    
    // First find the frequency of each task (A-Z)
    const freqs = new Array(26).fill(0);
    tasks.forEach(t => freqs[t.charCodeAt() - 65] += 1);
    // Sort by most frequent task
    // freqs[0] will be used as the frame
    freqs.sort((a, b) => b - a);
    
    // frame will consist of multiple chunks separated by freqs[0]
    // ex. [A, A, A], 3 => A___A___A
    //     Here you can see 'A' is what separates the chunks 
    //     Each chunk is 'A___' of length 4 (1 from 'A' and 3 from cooldown)
    //     We can see that the chunk length is n + 1
    //     There are two chunks in the frame (because there are 3 A's)
    //     We can see that the number of chunks is freqs[0] - 1
    // => frame length can be calculated as (freqs[0] - 1) * (n + 1)
    // ex. [A, A, A, B, B], 2 => AB_AB_A
    //     Two chunks of 'AB_' = frame length of 6
    
    // i will indicate how many tasks are outside the frame due to one or more
    // tasks sharing the same highest frequency
    // ex. [A, A, A, B, B, B, C, C], 2 => ABCABCAB
    //     That's 'ABC' x 2 and then an extra 'AB' (i = 2)
    // ex. [A, A, A, B, B, B, C, C, C, D], 4 => ABCD_ABC__ABC
    //     That's 'ABC__' x 2 and then an extra 'ABC' (i = 3)
    let i = 0;
    while (freqs[i] === freqs[0]) i += 1;
    
    // thus, least number of units of time = (freqs[0] - 1) * (n + 1) + i
    // however, if n is small enough, then the cooldown period is negligible
    // and the least number of units of time is just length of tasks array
    // ex. [A, A, A, B, B, B, C, C], 0 => ABCABCAB (length 8)
    // ex. [A, A, A, B, B, B, C, C], 3 => ABC_ABC_AB (length 10)
    return Math.max(tasks.length, (freqs[0] - 1) * (n + 1) + i);
};