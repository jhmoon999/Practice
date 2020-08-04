// An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

// Your goal is to find that missing element.

// Write a function that, given an array A, returns the value of the missing element.

// For example, given array A such that:
//   A[0] = 2
//   A[1] = 3
//   A[2] = 1
//   A[3] = 5
// the function should return 4, as it is the missing element.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// the elements of A are all distinct;
// each element of array A is an integer within the range [1..(N + 1)].

function solution(A) {
// Math with Gauss's law
// Time: O(n), Space: O(1)

// sum from 1 to N: (1 + N) * N / 2
// sum from 1 to A.length + 1: 
// (1 + A.length + 1) * (A.length + 1) / 2

    // return (A.length + 2) * (A.length + 1) / 2
    // - A.reduce((acum, curr) => acum + curr, 0);

// Bit manipulation
// Time: O(n), Space: O(1)

// we want to XOR all numbers in A as well as 1 to N+1
// => A[0] ^ A[1] ... ^ A[N] ^ 1 ^ 2 ... ^ N+1
    let missing = A.length + 1;
    for (let i = 0; i < A.length; i++) {
        missing ^= A[i] ^ (i + 1)
    }
    return missing;
}
