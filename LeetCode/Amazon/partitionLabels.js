//* LC 763: Partition Labels

// A string S of lowercase English letters is given. We want to partition this string into as many parts as possible so that each letter appears in at most one part, and return a list of integers representing the size of these parts.

// Example:
// Input: S = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits S into less parts.
 
// Note:
// S will have length in range [1, 500].
// S will consist of lowercase English letters ('a' to 'z') only.

/**
 * @param {string} S
 * @return {number[]}
 */

var partitionLabels = function(S) {
// First find the last index of each char before creating partitions    
// Time: O(n) - two passes through S and avoid using Array.includes
// Space: O(1) - array and object will hold at most 26 elements
    
    // create an object that holds the last index of each char in S
    const lastIndex = {}, ans = [];
    for (let i = 0; i < S.length; i++) {
        // we are given that S consists of only lowercase letters
        lastIndex[S[i]] = i;
    }
    
    // start with first char of S
    // ex. 'abaccbcd' => S[0] = 'a', endIndex = 2, ans = [3]
    let endIndex = lastIndex[S[0]]; 
    ans.push(endIndex + 1);
    
    // now move on to the rest of S
    // ex. 'abaccbcd' => S[1] = 'b', endIndex = 5, ans = [6]
    //                => S[2] = 'a', endIndex, ans don't change
    //                => S[3] = 'c', endIndex = 6, ans = [7]
    //                => S[4] = 'c', endIndex, ans don't change
    //                ...
    //                => S[7] = 'd', endIndex = 7, ans = [7, 1]
    
    for (let i = 1; i < S.length; i++) {
        // If lastIndex of S[i] is larger than endIndex, then the 
        // partition will extend. Update the parition size and endIndex.
        if (i < endIndex && lastIndex[S[i]] > endIndex) {
            ans[ans.length - 1] += lastIndex[S[i]] - endIndex;
            endIndex = lastIndex[S[i]];
        }
        // Once i is larger than endIndex, a new partition begins
        if (i > endIndex) {
            endIndex = lastIndex[S[i]];
            ans.push(endIndex - i + 1);
        }
    }
    return ans;
    

// Brute force - merge partitions once a previous char is encountered
// Time: O(n^2) - one pass through S, but each commits an Array.includes
// on current partitions which is an O(n) process
// Space: O(1) - strArray and lengthArray will hold at most 26 elements
    
    // // helper function to merge strArray into one partition    
    // const mergeHelper = function(strArray, startIndex, element) {
    //     let mergedString = '';
    //     for (let i = startIndex; i < strArray.length; i++) {
    //         mergedString += strArray[i];
    //     }
    //     strArray[startIndex] = mergedString + element;
    //     strArray = strArray.slice(0, startIndex + 1);
    //     return strArray;
    // }    
    
    // // create array that will hold string partitions
    // // first element is first letter of S
    // let strArray = [S[0]], lengthArray = [], newChar;
    // // iterate through every char in S (after first)
    // for (let i = 1; i < S.length; i++) {
    //     newChar = true;
    //     // iterate through every substring in array
    //     for (let j = 0; j < strArray.length; j++) {
    //         // if char is already in a substring held in array
    //         // then merge all substrings from j to last element
    //         if (strArray[j].includes(S[i])) {
    //             strArray = mergeHelper(strArray, j, S[i]); 
    //             newChar = false;
    //         }
    //     }
    //     // if no existing substring has char in it, 
    //     // then append char as last element in array
    //     if (newChar) {
    //         strArray.push(S[i]);
    //     }
    // }
    
    // // return length of substrings in array
    // for (let i = 0; i < strArray.length; i++) {
    //     lengthArray[i] = strArray[i].length;
    // }
    // return lengthArray;
};
    

/*
    a
    a, b
    aba
    abab
    abab, c
    ababcb
    ababacba
    ababacbac
    ababacbaca
    ababacbaca, d
    ababacbaca, d, e
    ababacbaca, d, e, f
    ababacbaca, d, efe
    ababacbaca, d, efe, g
    ababacbaca, defegd
    ababacbaca, defegde
    ababacbaca, defeged, h
*/