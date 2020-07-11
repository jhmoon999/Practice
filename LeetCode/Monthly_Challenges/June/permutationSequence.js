//* June 20: Permutation Sequence

// The set [1,2,3,...,n] contains a total of n! unique permutations.
// By listing and labeling all of the permutations in order, we get the following sequence for n = 3:
// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// Given n and k, return the kth permutation sequence.

// Note:
// Given n will be between 1 and 9 inclusive.
// Given k will be between 1 and n! inclusive.

// Example 1:
// Input: n = 3, k = 3
// Output: "213"

// Example 2:
// Input: n = 4, k = 9
// Output: "2314"

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
// Using math - O(n)
    const fact = [1], nums = [];
    let sum = 1, index, str = '';
    for (let i = 1; i <= n; i++) {
        sum *= i;
        fact[i] = sum;
        nums.push(i);
    }
    k -= 1;
    for (let i = n; i > 0; i--) {
        index = k / fact[i - 1];
        k = k % fact[i - 1];
        str += nums.splice(index, 1);
    }
    return str;
    
// Using recursion - O(k*n)
    // const nextNum = function(currStr) {
    //     // trims down the unnecessary permutations
    //     if (perms.length === k) return;
    //     if (currStr.length === n) {
    //         perms.push(currStr);
    //         return;
    //     }
    //     for (let i = 1; i <= n; i++) {
    //         if (!currStr.includes(i.toString())) {
    //             nextNum(currStr + i.toString());
    //         }
    //     }
    // }
    // const perms = [];
    // nextNum('');
    // return perms[k - 1];
};