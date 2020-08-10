//* LC 937: Reorder Data in Log Files

// You have an array of logs.  Each log is a space delimited string of words.

// For each log, the first word in each log is an alphanumeric identifier.  Then, either:

// Each word after the identifier will consist only of lowercase letters, or;
// Each word after the identifier will consist only of digits.
// We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

// Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

// Return the final order of the logs.

// Example:
// Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
// Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
 
// Constraints:
// 0 <= logs.length <= 100
// 3 <= logs[i].length <= 100
// logs[i] is guaranteed to have an identifier, and a word after the identifier.

/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
// Separate logs into letter-logs and digit-logs. Sort the letter-logs.
// Time: O(mn) - splitting and joining strings is O(m) where m is average
// length of a log, and this is done for all n logs  
// Space: O(n)
    const letterLog = [], digitLog = [];
    logs.forEach(log => {
        log = log.split(' ');
        // if element after identifier is not a number, put in letterLog
        if (isNaN(parseInt(log[1]))) {
            // log is separated into two parts for later sorting:
            // 1) identifier and 2) all words after identifier
            letterLog.push([log[0]].concat(log.slice(1).join(' ')));
        }
        // otherwise, put in digitLog (rejoin because original order)
        else digitLog.push(log.join(' '));
    });
    // sort lexicographically (by words after identifier and then identifier)
    letterLog.sort((a, b) => a[1].localeCompare(b[1]) || 
                             a[0].localeCompare(b[0]));
    // concatenate letterLog and digitLog
    return letterLog.map(log => log = log.join(' ')).concat(digitLog);
};