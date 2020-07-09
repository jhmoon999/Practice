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