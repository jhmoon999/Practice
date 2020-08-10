//* Distance between nodes in Binary Search Tree

// Given a list of unique integers nums, construct a BST from it (you need to insert nodes one-by-one with the given order to get the BST) and find the distance between two nodes node1 and node2. Distance is the number of edges between two nodes. 

//If any of the given nodes does not appear in the BST, return -1.

// Example :
// Input: nums = [2, 1, 3], node1 = 1, node2 = 3
// Output: 2
// Explanation:
//      2
//    /   \
//   1     3

class TreeNode {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
    }
}

// Time: O(n) where n is length of nums, Space: O(n)
var distanceInBST = function(nums, node1, node2) {
// Create a binary search tree from nums
// Find the lowest common ancestor of node1 and node2
// Return sum of distance from LCA to node1 and to node2
    
    // helper function to add node into binary search tree
    const addNode = function(root, value) {
        if (value < root.val) {
            if (root.left !== null) addNode(root.left, value);
            else root.left = new TreeNode(value);
        }
        else {
            if (root.right !== null) addNode(root.right, value);
            else root.right = new TreeNode(value);
        }
    }

    // creates a binary search tree from array of unique integers
    // returns root of BST or null if neither node1 nor node2 is in nums
    const createBST = function(nums) {
        const root = new TreeNode(nums[0]);
        let isNode1 = false, isNode2 = false;
        for (let i = 1; i < nums.length; i++) {
            addNode(root, nums[i]);
            if (node1 === nums[i]) isNode1 = true;
            if (node2 === nums[i]) isNode2 = true;
        }
        return isNode1 && isNode2 ? root : null;
    }

    // returns the lowest common ancestor of two nodes
    const findLCA = function(root, p, q) {
        if (p < root.val && q < root.val) findLCA(root.left, p, q);
        if (p > root.val && q > root.val) findLCA(root.right, p, q);
        return root;
    }

    // p is a node and q is the value of a descendent node
    // returns the distance between p and node with value q
    const findDistance = function(p, q) {
        let distance = 0, node = p;
        while (node.val !== q) {
            if (q < node.val) node = node.left;
            else node = node.right;
            distance += 1;
        }
        return distance;
    }

    const root = createBST(nums);
    if (root === null) return -1;
    const lca = findLCA(root, node1, node2);
    return findDistance(lca, node1) + findDistance(lca, node2);
}

console.log(distanceInBST([2, 1, 3], 1, 3));