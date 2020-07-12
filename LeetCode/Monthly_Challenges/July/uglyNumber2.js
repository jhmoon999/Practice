// July 4: Ugly Number II

// Write a program to find the n-th ugly number.
// Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

// Example:
// Input: n = 10
// Output: 12
// Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
// Note: 1 is typically treated as an ugly number.

/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
// Using three pointers to find the next ugly number
// Time:  O(n)
// Space: O(n)
    const uglyNums = [1];   // first ugly number is 1
    let i2 = 0, i3 = 0, i5 = 0;
    for (let i = 1; i < n; i++) {
        uglyNums[i] = Math.min(uglyNums[i2] * 2,
                               uglyNums[i3] * 3,
                               uglyNums[i5] * 5);
        // There should be no duplicate ugly numbers in the array
        // ex. if the current uglyNum is 6, both i2 and i3 would increment
        if (uglyNums[i2] * 2 === uglyNums[i]) i2 += 1;
        if (uglyNums[i3] * 3 === uglyNums[i]) i3 += 1;
        if (uglyNums[i5] * 5 === uglyNums[i]) i5 += 1;
    }
    return uglyNums[n-1];
    
// Using a priority queue to insert ugly numbers in ascending order
// Time:  O(n^2) because inserting into a priority queue is O(n)
// Space: O(n)
    // class PriorityQueue {
    //     constructor() {
    //         this.storage = [];
    //         this.size = 0;
    //     }
    //     insert(num) {
    //         if (this.size === 0 ||
    //             num >= this.storage[this.size - 1]) {
    //             this.storage.push(num);
    //             this.size += 1;
    //         }
    //         else {
    //             for (let i = 0; i < this.size; i++) {
    //                 if (num === this.storage[i]) break;
    //                 if (num < this.storage[i]) {
    //                     this.storage.splice(i, 0, num);
    //                     this.size += 1;
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     get(index) {
    //         return this.storage[index];
    //     }
    // }
    // const uglyNums = new PriorityQueue();
    // uglyNums.insert(1);
    // let i = 0, currNum;
    // while (i < n) {
    //     currNum = uglyNums.get(i);
    //     uglyNums.insert(currNum * 2);
    //     uglyNums.insert(currNum * 3);
    //     uglyNums.insert(currNum * 5);
    //     i += 1;
    // }
    // return uglyNums.get(n - 1);
};