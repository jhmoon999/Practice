//* LC 1438: Longest continuous subarray with diff less than or equal to limit

// Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to limit.

// Example 1:
// Input: nums = [8,2,4,7], limit = 4
// Output: 2 
// Explanation: All subarrays are: 
// [8] with maximum absolute diff |8-8| = 0 <= 4.
// [8,2] with maximum absolute diff |8-2| = 6 > 4. 
// [8,2,4] with maximum absolute diff |8-2| = 6 > 4.
// [8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
// [2] with maximum absolute diff |2-2| = 0 <= 4.
// [2,4] with maximum absolute diff |2-4| = 2 <= 4.
// [2,4,7] with maximum absolute diff |2-7| = 5 > 4.
// [4] with maximum absolute diff |4-4| = 0 <= 4.
// [4,7] with maximum absolute diff |4-7| = 3 <= 4.
// [7] with maximum absolute diff |7-7| = 0 <= 4. 
// Therefore, the size of the longest subarray is 2.
// Example 2:

// Input: nums = [10,1,2,4,7,2], limit = 5
// Output: 4 
// Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.

// Example 3:
// Input: nums = [4,2,2,2,4,4,2,2], limit = 0
// Output: 3

/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function(nums, limit) {
// Using a priority queue to always know the max and min of a subarray 
// Time:  O(n^2) since nums array is iterated through once and each element is
// inserted into priority queue, which can be a O(n) process
// Space: O(n) because priority queue will hold up to n elements (which means
// longest continuous valid subarray is just the array)

    class PriorityQueue {
        constructor() {
            this.storage = [];
        }
        // priority queue will be sorted in ascending order
        insert(num) {
            if (this.storage.length === 0 ||
                this.storage[this.storage.length - 1] <= num) {
                this.storage.push(num);
                return;
            }
            for (let i = 0; i < this.storage.length; i++) {
                if (num < this.storage[i]) {
                    this.storage.splice(i, 0, num);
                    return;
                }
            }
        }
        remove(num) {
            for (let i = 0; i < this.storage.length; i++) {
                if (num === this.storage[i]) {
                    this.storage.splice(i, 1);
                    return;
                }
            }
        }
    }
    
    const pq = new PriorityQueue();
    // i points to the start of subarray, and j points to the end
    let i = 0, j = 0, size = 1, min = nums[0], max = nums[0];
    while (j < nums.length) {
        // insert new number into priority queue to be sorted in
        pq.insert(nums[j]);
        max = Math.max(max, nums[j]);   // if new num is largest, max updates
        min = Math.min(min, nums[j]);   // if it's smallest, min updates

        // if max - min is more than the limit, then we slide the window
        if (max - min > limit) {
            while (max - min > limit) {
                // i increments which means subarray loses first element
                i += 1;
                // thus, the element is no longer in the priority queue
                pq.remove(nums[i - 1]);  
                // if the element lost was the min, then min updates to the
                // new smallest element in the priority queue
                if (nums[i - 1] === min) {
                    min = pq.storage[0];
                }
                // same with max
                if (nums[i - 1] === max) {
                    max = pq.storage[pq.storage.length - 1];
                }
                // this process of removing the first element of the subarray
                // continues until the new (max - min) is less than or equal
                // to limit, making subarray from i to j valid
            }
        }
        // if number was accepted into subarray successfully, then length of
        // subarray increases by 1. Update size if new length is larger.
        else size = Math.max(size, j - i + 1);
        // move on to next number 
        j += 1;
    }
    return size;
    
// Brute force - Check every subarray if valid 
// Time:  O(n^2) - Time Limit Exceeded at Case 54/57
// Space: O(1)
    // let size = 1;
    // for (let i = 0; i < nums.length; i++) {
    //     let temp = [nums[i]], min = nums[i], max = nums[i];
    //     for (let j = i + 1; j < nums.length; j++) {
    //         min = Math.min(min, nums[j]);
    //         max = Math.max(max, nums[j]);
    //         // if difference is larger than limit, subarray is invalid
    //         if (max - min > limit) break;
    //         temp.push(nums[j]);
    //         size = Math.max(size, temp.length);
    //     }
    // }
    // return size;
};