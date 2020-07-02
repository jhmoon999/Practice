//* LC 22: Generate Parentheses

// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
// For example, given n = 3, a solution set is:
// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
// We need to generate n '('s and n ')'s, so time complexity should be
// O(2^2n) = O(4^n). Apparently this is the nth Catalan number and can
// be further bounded as O(4^n / sqrt(n)).
    const parenthesisSet = [];
    const addParenthesis = function(str, numL, numR) {
        // once str has n left parentheses and n right parentheses, str
        // is complete and we can return and backtrack for the next one
        if (str.length === 2 * n) {
            parenthesisSet.push(str);
            return;
        }
        // number of left (and right) parentheses cannot exceed n
        if (numL < n) {
            addParenthesis(str + '(', numL + 1, numR);
        }
        // if number of right parentheses exceed that of left at any
        // point, str will be invalid because not all are closed
        if (numR < numL) {
            addParenthesis(str + ')', numL, numR + 1);
        }
    }
    addParenthesis('', 0, 0);
    return parenthesisSet;
};