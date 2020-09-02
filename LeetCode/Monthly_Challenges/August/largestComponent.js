//* August 30: Largest Component Size by Common Factor

// Given a non-empty array of unique positive integers A, consider the following graph:

// There are A.length nodes, labelled A[0] to A[A.length - 1];
// There is an edge between A[i] and A[j] if and only if A[i] and A[j] share a common factor greater than 1.
// Return the size of the largest connected component in the graph.

// Example 1:
// Input: [4,6,15,35]
// Output: 4
// Explanation:  4--6--15--35

// Example 2:
// Input: [20,50,9,63]
// Output: 2
// Explanation:  20--50  9--63

// Example 3:
// Input: [2,3,6,7,4,12,21,39]
// Output: 8

// Note:
// 1 <= A.length <= 20000
// 1 <= A[i] <= 100000

/**
 * @param {number[]} A
 * @return {number}
 */
var largestComponentSize = function(A, N = 100001, m = {}) {
    
    let P = [...Array(N).keys()],     // parent representative of disjoint sets
        L = Array(N).fill(1);         // length of parent representative's set
    let find = x => P[x] = x == P[x] ? P[x] : find(P[x]);
    let union = (a, b) => {
        a = find(a);
        b = find(b);
        if (a == b)
            return;
        P[b] = a;  // arbitrary choice
        L[a] += L[b];
    }
    for (let x of A) {
        m[x] ? union(m[x], x) : m[x] = x;      // case 1: x as a factor of itself
        for (let i = 2; i * i <= x; ++i) {
            if (x % i)
                continue;
            let j = Math.floor(x / i);
            m[i] ? union(m[i], x) : m[i] = x;  // case 2: i-th factor of x
            m[j] ? union(m[j], x) : m[j] = x;  // case 3: j-th factor of x
        }
    }
    return Math.max(...L); // maximum length of any parent representative's set
};