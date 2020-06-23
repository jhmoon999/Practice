//* June 6: Queue Reconstruction by Height

// Suppose you have a random list of people standing in a queue. Each person is described by a pair of integers (h, k), where h is the height of the person and k is the number of people in front of this person who have a height greater than or equal to h. Write an algorithm to reconstruct the queue.
 
// Example:
// Input:   [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
// Output:  [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function(people) {
    const heightDict = {};
    for (let i = 0; i < people.length; i++) {
        let [height, numFront] = people[i];
        if (!heightDict.hasOwnProperty(height)) heightDict[height] = [numFront];
        else heightDict[height].push(numFront);
    }
    const heights = Object.keys(heightDict).sort((a, b) => b - a);
    const ans = [];
    for (let i = 0; i < heights.length; i++) {
        heightDict[heights[i]].sort((a, b) => b - a);
        let j, currNumFront, temp;
        while (heightDict[heights[i]].length > 0) {
            currNumFront = heightDict[heights[i]].pop();
            temp = ans.length, j = 0;
            while (temp === ans.length) {
                if (j === currNumFront || j === ans.length) {
                    ans.splice(j, 0, [heights[i], currNumFront]);
                }
                j += 1;
            }
        }
    }
    return ans;
};