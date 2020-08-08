//* August 8: Path Sum III

// You are given a binary tree in which each node contains an integer value.

// Find the number of paths that sum to a given value.

// The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

// The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

// Example:

// root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

//       10
//      /  \
//     5   -3
//    / \    \
//   3   2   11
//  / \   \
// 3  -2   1

// Return 3. The paths that sum to 8 are:

// 1.  5 -> 3
// 2.  5 -> 2 -> 1
// 3. -3 -> 11

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function(root, sum) {
// Using memoization to trim paths that have already been encountered.
// In 2Sum, an auxilary object is used to store complements so that only
// a single pass through the array is needed. ex. [1, 2, 3, 4], sum = 5
// Upon encountering 1 and 2, auxObj will hold 5-1 and 5-2. Then when 3 
// and 4 are encountered, there are two 2Sums that sum to 5. This exact
// approach can be applied to this pathSum problem.
// Time: O(n) - only one DFS pass through all nodes in binary tree
// Space: O(n) - need auxilary object to store sum prefixes
    
    const prevSums = {'0' : 1};   // if node.val = sum, solution found
    
    const countPaths = function(root, currSum) {
        if (root === null) return 0;
        currSum += root.val;
        
        // check if we've encountered prevSum already
        const prevSum = currSum - sum;
        let count = prevSums[prevSum] || 0;
        
        // add the currSum into memo for future checks
        prevSums[currSum] = prevSums[currSum] + 1 || 1;
        
        // apply same DFS function on children nodes with updated sum
        count += countPaths(root.left, currSum);
        count += countPaths(root.right, currSum);
        
        // once we backtrack, currSum is no longer a prefix that will
        // be encountered by children paths
        prevSums[currSum] -= 1;
        return count;
    }
    
    return countPaths(root, 0);
    
    
// Brute force - for each node, do a DFS for path sum
// Time: O(n^2) - n nodes and DFS process for each
// Space: O(n) - recursive stack up to number of nodes
    
    // // DFS function to find matching path sums starting at root
    // const countPaths = function(root, sum) {
    //     let count = 0;
    //     // if leaf is met, then this path has ended. return 0
    //     if (root === null) return count;
    //     // if remaining sum is current val, valid path sum found
    //     if (root.val === sum) count += 1;
    //     // apply same DFS function on children nodes with updated sum
    //     count += countPaths(root.left, sum - root.val);
    //     count += countPaths(root.right, sum - root.val);
    //     return count; 
    // }
    
    // if (root === null) return 0;
    // // countPaths(root, sum) returns number of path sums where root is origin
    // return countPaths(root, sum) + 
    //     // pathSum(root.left, sum) will invoke countPaths(root.left, sum)
    //     // where root.left is origin. Same with pathSum(root.right). This will
    //     // in turn run for every node in the binary tree for total path sums.
    //     pathSum(root.left, sum) + pathSum(root.right, sum);
};