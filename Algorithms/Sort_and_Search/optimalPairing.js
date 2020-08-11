//* Optimal Utilization

// Given 2 lists a and b. Each element is a pair of integers where the first integer represents the unique id and the second integer represents a value. Your task is to find an element from a and an element form b such that the sum of their values is less or equal to target and as close to target as possible. Return a list of ids of selected elements. If no pair is possible, return an empty list.

// Example 1:

// Input:
// a = [[1, 2], [2, 4], [3, 6]]
// b = [[1, 2]]
// target = 7

// Output: [[2, 1]]

// Explanation:
// There are only three combinations [1, 1], [2, 1], and [3, 1], which have a total sum of 4, 6 and 8, respectively.
// Since 6 is the largest sum that does not exceed 7, [2, 1] is the optimal pair.

// Example 2:

// Input:
// a = [[1, 3], [2, 5], [3, 7], [4, 10]]
// b = [[1, 2], [2, 3], [3, 4], [4, 5]]
// target = 10

// Output: [[2, 4], [3, 2]]

// Explanation:
// There are two pairs possible. Element with id = 2 from the list `a` has a value 5, and element with id = 4 from the list `b` also has a value 5.
// Combined, they add up to 10. Similarily, element with id = 3 from `a` has a value 7, and element with id = 2 from `b` has a value 3.
// These also add up to 10. Therefore, the optimal pairs are [2, 4] and [3, 2].

// Example 3:

// Input:
// a = [[1, 8], [2, 7], [3, 14]]
// b = [[1, 5], [2, 10], [3, 14]]
// target = 20

// Output: [[3, 1]]

// Example 4:

// Input:
// a = [[1, 8], [2, 15], [3, 9]]
// b = [[1, 8], [2, 11], [3, 12]]
// target = 20

// Output: [[1, 3], [3, 2]]

// Time: O(mlog(m) + nlog(n)) where m is a.length and n is b.length
// Space: O(1) 
var optimalPairing = function(a, b, target) {
    // two pointer approach requires nums to be sorted
    // the elements we care about are the values, not the ids
    a = a.sort((a, b) => a[1] - b[1]);
    b = b.sort((a, b) => b[1] - a[1]);

    // pointers start at beginning of array, but remember that
    // a is sorted ascending and b is sorted descending
    let aP = 0, bP = 0, diff = Infinity, sum, ans = [];
    while (aP < a.length && bP < b.length) {
        sum = a[aP][1] + b[bP][1];
        // sum should be less than target and as close to target as possible
        if (sum <= target) {
            // if target - sum is less than current diff, update diff and ans
            if (target - sum < diff) {
                diff = target - sum;
                ans = [[a[aP][0], b[bP][0]]];
            }
            // if target - sum = diff, this pair is also an answer
            else if (target - sum === diff) {
                ans.push([a[aP][0], b[bP][0]]);
            }
            aP += 1;  // because sum <= target, increment aP so sum increases
        }
        // otherwise sum > target, so increment bP so sum decreases
        else bP += 1;
    }
    return ans;
}

const a1 = [[1, 2], [2, 4], [3, 6]];
const b1 = [[1, 2]];
console.log(optimalPairing(a1, b1, 7));

const a2 = [[1, 3], [2, 5], [3, 7], [4, 10]];
const b2 = [[1, 2], [2, 3], [3, 4], [4, 5]];
console.log(optimalPairing(a2, b2, 10));

const a3 = [[1, 8], [2, 7], [3, 14]];
const b3 = [[1, 5], [2, 10], [3, 14]];
console.log(optimalPairing(a3, b3, 20));

const a4 = [[1, 8], [2, 15], [3, 9]];
const b4 = [[1, 8], [2, 11], [3, 12]];
console.log(optimalPairing(a4, b4, 20));