//* June 3: Two City Scheduling

// There are 2N people a company is planning to interview. The cost of flying the i-th person to city A is costs[i][0], and the cost of flying the i-th person to city B is costs[i][1].

// Return the minimum cost to fly every person to a city such that exactly N people arrive in each city.

// Example 1:

// Input: [[10,20],[30,200],[400,50],[30,20]]
// Output: 110
// Explanation: 
// The first person goes to city A for a cost of 10.
// The second person goes to city A for a cost of 30.
// The third person goes to city B for a cost of 50.
// The fourth person goes to city B for a cost of 20.

// The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.

/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function(costs) {
    // find the difference in cost between A and B for each person
    const diffs = [];
    for (let i = 0; i < costs.length; i++) {
        diffs.push([costs[i][1] - costs[i][0], i]);
    }
    // sort the differences from largest to smallest
    // for the largest differences, we want the lower of the two to save 
    // the most money
    diffs.sort((a, b) => b[0] - a[0]);
    let ans = 0;
    // the first N will be the lower of the two cities (A in my case)
    for (let i = 0; i < costs.length / 2; i++) {
        ans += costs[diffs[i][1]][0];
    }
    // the remaining N will be the other city (B in my case)
    for (let i = costs.length / 2; i < costs.length; i++) {
        ans += costs[diffs[i][1]][1];
    }
    return ans;
};