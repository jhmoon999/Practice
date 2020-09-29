//* September 29: Word Break

// Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

// Note:
// The same word in the dictionary may be reused multiple times in the segmentation.
// You may assume the dictionary does not contain duplicate words.

// Example 1:
// Input: s = "leetcode", wordDict = ["leet", "code"]
// Output: true
// Explanation: Return true because "leetcode" can be segmented as "leet code".

// Example 2:
// Input: s = "applepenapple", wordDict = ["apple", "pen"]
// Output: true
// Explanation: Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.

// Example 3:
// Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// Output: false

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
// Dynamic programming - Use an array to keep track of whether 
// substring of s from 0 to i consists only of words in wordDict. 
// Time: O(m*n^2) where m is length of wordDict and n is length of s
// We use nested for loops to compute substrings of s which is O(n^2)
// and then check if wordDict includes that substring which is O(m).
// Space: O(n) - length of dp array
    
    // dp array starts off with first element true and the rest false
    // since dp[0] = true, we check all substrings from 0 to j
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    // we want to compute the substring of s from i to j
    // s.slice is not end-inclusive which is why 1 <= j <= s.length
    // and why 0 <= i < j
    for (let j = 1; j <= s.length; j++) {
        for (let i = 0; i < j; i++) {
            
            // only check if substring is in wordDict if dp[i] = true
            // ex. s = "wifi", wordDict = ["wi", "fi"]
            // at start: dp = [true, false, false, false, false]
            // substr = "w"     check because dp[0] = true
            //        = "wi"    check because dp[0] = true
            //                  "wi" is in wordDict, so dp[2] = true
            //        = "i"     skip because dp[1] = false
            //        = "wif"   check because dp[0] = true
            //        = "if"    skip because dp[1] = false
            //        = "f"     check because dp[2] = true
            //        = "wifi"  check because dp[0] = true
            //        = "ifi"   skip because dp[1] = false
            //        = "fi"    check because dp[2] = true
            //                  "fi" is in wordDict, so dp[4] = true
            // end result: dp = [true, false, true, false, true]
            
            if (dp[i] && wordDict.includes(s.slice(i, j))) {
                dp[j] = true;
                break;  // once dp[j] = true, j iteration is done
            }
        }
    }
    return dp[s.length];
};