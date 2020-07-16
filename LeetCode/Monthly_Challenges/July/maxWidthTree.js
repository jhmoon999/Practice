//* July 9: Maximum Width of Binary Tree

// Given a binary tree, write a function to get the maximum width of the given tree. The maximum width of a tree is the maximum width among all levels.

// The width of one level is defined as the length between the end-nodes (the leftmost and right most non-null nodes in the level, where the null nodes between the end-nodes are also counted into the length calculation.

// It is guaranteed that the answer will in the range of 32-bit signed integer.

// Example 1:
// Input: 
//            1
//          /   \
//         3     2
//        / \     \  
//       5   3     9 
//
// Output: 4
// Explanation: The maximum width existing in the third level with the length 4 (5,3,null,9).

// Example 2:
// Input: 
//           1
//          /  
//         3    
//        / \       
//       5   3     
//
// Output: 2
// Explanation: The maximum width existing in the third level with the length 2 (5,3).

// Example 3:
// Input: 
//           1
//          / \
//         3   2 
//        /        
//       5      
//
// Output: 2
// Explanation: The maximum width existing in the second level with the length 2 (3,2).

// Example 4:
// Input: 
//           1
//          / \
//         3   2
//        /     \  
//       5       9 
//      /         \
//     6           7
//
// Output: 8
// Explanation:The maximum width existing in the fourth level with the length 8 (6,null,null,null,null,null,null,7).

//* Constraints:
//* The given binary tree will have between 1 and 3000 nodes.

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
 * @return {number}
 */
var widthOfBinaryTree = function(root) {
// Iterative BFS using a queue
// Time:  O(n) since entire tree is traversed to search for max width
// Space: O(n) because queue will have as many nodes as widest level which
//        is at most n/2 nodes.
    if (root === null) return 0;
    // currLvl elements will be [node, node's position in tree]
    let currLvl = [[root, 0]], nextLvl = [];
    let currWidth = 1, maxWidth = currWidth;
    while (currLvl.length > 0) {
        // currLvl will hold all nodes and their positions in that tree level
        // thus, the difference between position of first node and that 
        // of last node (+ 1 for inclusive) is the width of tree level
        currWidth = currLvl[currLvl.length - 1][1] - currLvl[0][1] + 1;
        
        //* This statement is for saving memory space. A node position will at
        //* least double every level, so the integer can get extrememly high. 
        //* If we ever encounter a level of width 1 though, we can reset the
        //* sole node there to position 0. This is to prevent too much memory
        //* allocated for a tree that resembles a linked list and has thousands
        //* of nodes (which will have n levels instead of log(n) levels).
        if (currWidth === 1) currLvl[0][1] = 0; 
        
        // update maxWidth if the current tree level is wider
        maxWidth = Math.max(maxWidth, currWidth);
        for (let i = 0; i < currLvl.length; i++) {
            let currNode = currLvl[i];
            // if a node is at position x, its children will be at position
            // 2x + 1 and 2x + 2.                1
            // ex. node at position 3          /   \
            //     has left child at          2     3
            //     position 6 and right      / \   / \
            //     child at position 7      4   5 6   7
            if (currNode[0].left !== null) {
                nextLvl.push([currNode[0].left, 2 * currNode[1] + 1]);
            }
            if (currNode[0].right !== null) {
                nextLvl.push([currNode[0].right, 2 * currNode[1] + 2]);
            }
        }
        currLvl = nextLvl;  // reset for next iteration
        nextLvl = [];
    }
    return maxWidth;
};