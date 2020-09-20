//* September 19: Sequential Digits

// An integer has sequential digits if and only if each digit in the number is one more than the previous digit.

// Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.

// Example 1:
// Input: low = 100, high = 300
// Output: [123, 234]

// Example 2:
// Input: low = 1000, high = 13000
// Output: [1234, 2345, 3456, 4567, 5678, 6789, 12345]
 
// Constraints:
// 10 <= low <= high <= 10^9

/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function(low, high) {
// Funny way - given the constraint 10 <= low <= high <= 10^9, we can create   
// an array of all possible valid sequences and check which is within range
// Time: O(1), Space: O(1)
    // const allSeq = [12,23,34,45,56,67,78,89,
    //                 123,234,345,456,567,678,789,
    //                 1234,2345,3456,4567,5678,6789,
    //                 12345,23456,34567,45678,56789,
    //                 123456,234567,345678,456789,
    //                 1234567,2345678,3456789,
    //                 12345678,23456789,
    //                 123456789]
    // const ans = [];
    // for (let i = 0; i < allSeq.length; i++) {
    //     if (allSeq[i] >= low && allSeq[i] <= high) ans.push(allSeq[i]);
    // }
    // return ans;
    
// Generate all numbers with sequential digits (by fixing starting digit and
// recursively append valid digits) and check if they are in the given range.
// Time:  O(n) where n is number of digits of 'high'
// Space: O(n) - recursive stack
//* Technically due to the given constraint 10 <= low <= high <= 10^9, n is
//* at most 9 digits, so both time and space complexity is O(1).
    
    const allSeq = [];  // holds all valid sequences
    
    // helper function that generates valid sequences and pushes to allSeq
    const createSeq = function(num) {
        // if within bounds, num is a valid sequence
        if (num >= low && num <= high) allSeq.push(num);
        // once beyond upper limit, num will no longer be valid
        else if (num > high) return;
        
        // if below lower limit, recursively run createSeq on next num
        num = num.toString();
        // if last digit is 9, then no more can be appended
        if (num[num.length - 1] === '9') return;  
        num += parseInt(num[num.length - 1]) + 1;
        createSeq(num);
    }
    
    // run createSeq, fixing the starting digit from 1 to 9
    for (let i = 1; i <= 9; i++) {
        createSeq(i);
    }
    // sort the array before returning (ex. 12345 > 6789)
    return allSeq.sort((a, b) => a - b);
};