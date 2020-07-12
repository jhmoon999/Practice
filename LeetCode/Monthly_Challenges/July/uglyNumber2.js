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
    
    class PrioritySet {
        constructor() {
            this.storage = [];
            this.size = 0;
        }
        insert(num) {
            if (this.size === 0 ||
                num >= this.storage[this.size - 1]) {
                this.storage.push(num);
                this.size += 1;
            }
            else {
                for (let i = 0; i < this.size; i++) {
                    if (num === this.storage[i]) break;
                    if (num < this.storage[i]) {
                        this.storage.splice(i, 0, num);
                        this.size += 1;
                        break;
                    }
                }
            }
        }
        get(index) {
            return this.storage[index];
        }
    }
    
    const uglyNums = new PrioritySet();
    uglyNums.insert(1);
    let i = 0, currNum;
    while (i < n) {
        currNum = uglyNums.get(i);
        uglyNums.insert(currNum * 2);
        uglyNums.insert(currNum * 3);
        uglyNums.insert(currNum * 5);
        i += 1;
    }
    return uglyNums.get(n - 1);
};