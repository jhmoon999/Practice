//* LC 1046: Last Stone Weight

// We have a collection of stones, each stone has a positive integer weight.

// Each turn, we choose the two heaviest stones and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

// If x == y, both stones are totally destroyed;
// If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
// At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)

// Example 1:
// Input: [2,7,4,1,8,1]
// Output: 1
// Explanation: 
// We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
// we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
// we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
// we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    // Heapsort - The heaviest stone keeps bubbling up 
    // Time: It takes log(n) to remove from heap and log(n) to insert
    // We have to remove and insert n times, so time complexity is O(nlog(n))

        stones = stones.sort((a, b) => b - a);  // 'heapify'
        
        // Swaps first number with last number and lets the
        // last number bubbledown to correct location.
        // Then pops out the original number and returns it.
        const heapRemove = function(arr) {
            [arr[0], arr[arr.length - 1]] = [arr[arr.length - 1], arr[0]];
            let i = 0, child1 = 2 * i + 1, child2 = 2 * i + 2;
            
            //* edge case for when only two numbers in heap
            if (child1 < arr.length - 1 && child2 === arr.length - 1) {
                if (arr[i] < arr[child1]) 
                    [arr[i], arr[child1]] = [arr[child1], arr[i]];
            }
            
            // for all other cases:
            while (child1 < arr.length - 1 && child2 < arr.length - 1) {
                //* We have to check that arr[child1] >= arr[child2] so that
                //* if child1 = child2, the bubbledown step is not skipped
                if (arr[i] < arr[child1] && arr[child1] >= arr[child2]) {
                    [arr[i], arr[child1]] = [arr[child1], arr[i]];
                    i = child1;
                }
                else if (arr[i] < arr[child2] && arr[child2] >= arr[child1]) {
                    [arr[i], arr[child2]] = [arr[child2], arr[i]];
                    i = child2;
                }
                else break;
                child1 = 2 * i + 1;
                child2 = 2 * i + 2;
            }
            return arr.pop();
        }
        
        // Inserts new number at end of heap and lets it 
        // bubbleup to correct location.
        const heapInsert = function(arr, s) {
            arr.push(s);
            let i = arr.length - 1, parent = Math.floor((i - 1) / 2);
            while (parent >= 0 && i !== parent) {
                if (arr[i] > arr[parent]) {
                    [arr[i], arr[parent]] = [arr[parent], arr[i]];
                    i = parent;
                    parent = Math.floor((i - 1) / 2);
                }
                else break;
            }
        }
        
        while (stones.length > 1) {
            // heaviest stone - second heaviest stone
            let diff = heapRemove(stones) - heapRemove(stones);
            // insert the difference back into stones array if it exists
            if (diff !== 0) heapInsert(stones, diff);
        }
        return stones.length === 0 ? 0 : stones[0];
    
        
    // Brute force - Keep sorting and smashing the last two stones
    // Time: Sorting is nlog(n) and we have to do this for every stone, so
    // time compexity is O(n^2 * log(n))
        // while (stones.length > 1) {
        //     let len = stones.length;
        //     stones.sort((a, b) => a - b);
        //     stones[len - 2] = stones[len - 1] - stones[len - 2];
        //     stones.pop();
        // }
        // return stones[0];
    };