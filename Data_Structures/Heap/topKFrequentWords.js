//* LC 692: Top K Frequent words

// Given a non-empty list of words, return the k most frequent elements.

// Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency, then the word with the lower alphabetical order comes first.

// Example 1:
// Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
// Output: ["i", "love"]
// Explanation: "i" and "love" are the two most frequent words.
// Note that "i" comes before "love" due to a lower alphabetical order.

// Example 2:
// Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
// Output: ["the", "is", "sunny", "day"]
// Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
// with the number of occurrence being 4, 3, 2 and 1 respectively.
// Note:
// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Input words contain only lowercase letters.

// Follow up:
// Try to solve it in O(n log k) time and O(n) extra space.

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
// Using auxilary object to store frequency of each num
// Then use a heap so next most frequent num will bubble up
// Time:  O(nlog(n)) - log(n) to insert or remove an element in heap
// Space: O(n) - both frequency object and heap can have n elements
    
    // Inserts new element [freq, num] at end of heap and lets it bubbleup to 
    // correct location. This is a maxHeap and root will have greatest freq.
    // const heapInsert = function(arr, element) {
    //     arr.push(element);
    //     let i = arr.length - 1, parent = Math.floor((i - 1) / 2);
    //     while (parent >= 0 && i !== parent) {
    //         if ((arr[i][0] > arr[parent][0]) || 
    //             (arr[i][0] === arr[parent][0] &&
    //             arr[i][1].localeCompare(arr[parent][1]) === -1)) {
    //             [arr[i], arr[parent]] = [arr[parent], arr[i]];
    //             i = parent;
    //             parent = Math.floor((i - 1) / 2);
    //         }
    //         else break;
    //     }
    // }
    
    // Swaps first element with last element and lets the last element (root) 
    // bubbledown to correct location. Then pops and returns the original.
    // const heapRemove = function(arr) {
    //     [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
    //     let i = 0, child1 = 2 * i + 1, child2 = 2 * i + 2;

    //     //* edge case for when only two elements in heap
    //     if (child1 < arr.length - 1 && child2 === arr.length - 1) {
    //         if ((arr[i][0] < arr[child1][0]) ||
    //             (arr[i][0] === arr[child1][0] &&
    //              arr[i][1].localeCompare(arr[child1][1]) === 1)) {
    //             [arr[i], arr[child1]] = [arr[child1], arr[i]];
    //         }
    //     }

    //     // for all other cases:
    //     while (child1 < arr.length - 1 && child2 < arr.length - 1) {
    //         //* We have to check that arr[child1] >= arr[child2] so that
    //         //* if child1 = child2, the bubbledown step is not skipped
    //         if ((arr[i][0] < arr[child1][0] && 
    //              arr[child1][0] >= arr[child2][0]) ||
    //             (arr[i][0] === arr[child1][0] && 
    //              arr[i][1].localeCompare(arr[child1][1]) === 1 &&
    //              arr[child1][0] >= arr[child2][0])) {
    //             [arr[i], arr[child1]] = [arr[child1], arr[i]];
    //             i = child1;
    //         }
    //         else if ((arr[i][0] < arr[child2][0] && 
    //              arr[child2][0] >= arr[child1][0]) || 
    //             (arr[i][0] === arr[child2][0] && 
    //              arr[i][1].localeCompare(arr[child2][1]) === 1 &&
    //              arr[child2][0] >= arr[child1][0])) {
    //             [arr[i], arr[child2]] = [arr[child2], arr[i]];
    //             i = child2;
    //         }
    //         else break;
    //         child1 = 2 * i + 1;
    //         child2 = 2 * i + 2;
    //     }
    //     return arr.pop();
    // }
    
    // // find the frequency of each word
    // const freqs = {};
    // words.forEach(word => {
    //     freqs[word] = freqs[word] + 1 || 1;
    // });
    
    // // create a heap for each frequency
    // const heap = [];
    // Object.keys(freqs).forEach(word => {
    //     heapInsert(heap, [freqs[word], word]);
    // });
    
    // // remove k elements from heap
    // const ans = [];
    // for (let i = 0; i < k; i++) {
    //     let element = heapRemove(heap);
    //     // element = [freq, word]
    //     ans.push(element[1]);
    // }
    // return ans;    
    
// More concise version of brute force method (forget using a heap)
    const freqs = {};
    words.forEach(word => {
        // if freqs[word] is undefined, freqs[word] = 1
        freqs[word] = freqs[word] + 1 || 1;
    });
    const sorted = Object.keys(freqs).sort((a, b) => {
        // sort by frequency first, then alphabetically
        return freqs[b] - freqs[a] || a.localeCompare(b);
    });
    return sorted.slice(0, k);
    
// Brute force - store frequency of each word and sort them
// Time: O(nlog(n)), Space: O(n)
    // const freqs = {}, ans = [];
    // for (let i = 0; i < words.length; i++) {
    //     if (freqs[words[i]]) freqs[words[i]][0] += 1;
    //     else freqs[words[i]] = [1, words[i]];
    // }
    // const sorted = Object.values(freqs).sort((a, b) => {
    //     // sort by two fields: 
    //     // least frequent, then reverse alphabetical
    //     // (we will be popping elements off sorted array)
    //     return a[0] - b[0] || b[1].localeCompare(a[1]);
    // });
    // for (let i = 0; i < k; i++) {
    //     ans.push(sorted.pop()[1]);
    // }
    // return ans;
};