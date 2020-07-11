//* June 19: Longest Duplicate Substring

// Given a string S, consider all duplicated substrings: (contiguous) substrings of S that occur 2 or more times.  (The occurrences may overlap.)

// Return any duplicated substring that has the longest possible length.  (If S does not have a duplicated substring, the answer is "".)

// Example 1:
// Input: "banana"
// Output: "ana"

// Example 2:
// Input: "abcd"
// Output: ""

/**
 * @param {string} S
 * @return {string}
 */
var longestDupSubstring = function(S) {
    
    const n = S.length;
    const nums = [];
    for (let i = 0; i < n; i++) {
        nums[i] = S[i].charCodeAt(0) - 97;
    }
    const mod = Math.pow(2, 32);
    
    const rabinKarp = function(len) {
        let hash = 0;
        for (let i = 0; i < len; i++) {
            hash = (hash * 26 + nums[i]) % mod;
        }
        const seen = new Set();
        seen.add(hash);
        let aL = 1;
        for (let i = 1; i <= len; i++) {
            aL = (aL * 26) % mod;
        }
        for (let j = 1; j < n - len + 1; j++) {
            hash = ((hash * 26 - nums[j - 1] * aL % mod + mod) % mod + nums[j - 1 + len]) % mod;
            if (seen.has(hash)) return j;
            seen.add(hash);
        }
        return -1;
    }
    
    let i = 0, j, k = n;
    while (i < k) {
        j = Math.floor((i + k) / 2);
        if (rabinKarp(j) !== -1) i = j + 1;
        else k = j;
    }
    const start = rabinKarp(i - 1);
    return S.slice(start, start + i - 1);
};