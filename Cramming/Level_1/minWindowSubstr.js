//* LC 76: Minimum Window Substring

// Given a string S and a string T, find the minimum window in S which will contain all the characters in T in complexity O(n).

// Example:
// Input: S = "ADOBECODEBANC", T = "ABC"
// Output: "BANC"

// Note:
// If there is no such window in S that covers all characters in T, return the empty string "".
// If there is such window, you are guaranteed that there will always be only one unique minimum window in S.

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    const counts = {};
    for (let i = 0; i < t.length; i++) {
        counts[t[i]] = counts[t[i]] + 1 || 1;
    }
    let l = 0, r = 0, minWin = s, fulfilled = false;
    while (r < s.length) {
        if (counts.hasOwnProperty(s[r])) counts[s[r]] -= 1;
        while (Object.values(counts).every(count => count <= 0) && l <= r) {
            fulfilled = true;
            if (r - l + 1 < minWin.length) minWin = s.slice(l, r + 1);
            l += 1;
            if (counts.hasOwnProperty(s[l - 1])) counts[s[l - 1]] += 1;
        }
        r += 1;
    }
    return fulfilled ? minWin : '';
};