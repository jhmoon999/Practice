//* July 17: Top K Frequent Elements

// Given a non-empty array of integers, return the k most frequent elements.

// Example 1:
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]

// Example 2:
// Input: nums = [1], k = 1
// Output: [1]

// Note:
// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
// It's guaranteed that the answer is unique, in other words the set of the top k frequent elements is unique.
// You can return the answer in any order.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {   
// Using auxilary object to store frequency of each num
// Then use a heap so next most frequent num will bubble up
// Time:  O(nlog(n)) - log(n) to insert or remove an element in heap
// Space: O(n) - both frequency object and heap can have n elements
    
    // Inserts new element [freq, num] at end of heap and lets it bubbleup to 
    // correct location. This is a maxHeap and root will have greatest freq.
    const heapInsert = function(arr, element) {
        arr.push(element);
        let i = arr.length - 1, parent = Math.floor((i - 1) / 2);
        while (parent >= 0 && i !== parent) {
            if (arr[i][0] > arr[parent][0]) {
                [arr[i], arr[parent]] = [arr[parent], arr[i]];
                i = parent;
                parent = Math.floor((i - 1) / 2);
            }
            else break;
        }
    }
    
    // Swaps first element with last element and lets the last element (root) 
    // bubbledown to correct location. Then pops and returns the original.
    const heapRemove = function(arr) {
        [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
        let i = 0, child1 = 2 * i + 1, child2 = 2 * i + 2;

        //* edge case for when only two numbers in heap
        if (child1 < arr.length - 1 && child2 === arr.length - 1) {
            if (arr[i][0] < arr[child1][0]) 
                [arr[i], arr[child1]] = [arr[child1], arr[i]];
        }

        // for all other cases:
        while (child1 < arr.length - 1 && child2 < arr.length - 1) {
            //* We have to check that arr[child1] >= arr[child2] so that
            //* if child1 = child2, the bubbledown step is not skipped
            if (arr[i][0] < arr[child1][0] && 
                arr[child1][0] >= arr[child2][0]) {
                [arr[i], arr[child1]] = [arr[child1], arr[i]];
                i = child1;
            }
            else if (arr[i][0] < arr[child2][0] && 
                arr[child2][0] >= arr[child1][0]) {
                [arr[i], arr[child2]] = [arr[child2], arr[i]];
                i = child2;
            }
            else break;
            child1 = 2 * i + 1;
            child2 = 2 * i + 2;
        }
        return arr.pop();
    }
    
    // find the frequency of each num
    const freqs = {};
    nums.forEach(num => {
        if (freqs.hasOwnProperty(num)) freqs[num] += 1;
        else freqs[num] = 1;
    });
    
    // create a heap for each frequency
    const heap = [];
    Object.keys(freqs).forEach(num => {
       heapInsert(heap, [freqs[num], num]);
    });
    
    // remove k elements from heap
    const ans = [];
    for (let i = 0; i < k; i++) {
        let element = heapRemove(heap);
        // element = [freq, num]
        ans.push(element[1]);
    }
    return ans;
    

// Brute force - use auxilary object to store frequencies
// Then sort by most frequent and return the first k
// Time: O(nlog(n)), Space: O(n)
    // const obj = {};
    // for (let i = 0; i < nums.length; i++) {
    //     if (obj.hasOwnProperty(nums[i])) obj[nums[i]] += 1;
    //     else obj[nums[i]] = 1;
    // }
    // const temp = [], ans = [];
    // for (key in obj) {
    //     // temp elements: [freq, num]
    //     temp.push([obj[key], key]);
    // }
    // // sort by most frequent
    // temp.sort(function(a, b) {return b[0] - a[0]});
    // for (let i = 0; i < k; i++) {
    //     ans.push(temp[i][1]);
    // }
    // return ans;
};