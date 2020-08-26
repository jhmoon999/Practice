/*
Binary tree reconstruction given inOrder and preOrder traversals

Example:
Given: InOrder  = [4, 2, 5,       1,        8, 6, 3, 7]

Given: PreOrder = [1, 2, 4, 5, 3, 6, 8, 7]

class Node {
  Node left;
  Node right;
  int data;
}

Output should be:
    1
   /\
  2   3
 /\   /\
4  5 6  7
    /
   8
*/
   
var constructTree = function(inOrder, preOrder) {
    
    if (inOrder.length === 0) return null;
    
    // helper function to find index of next node
    const findIndex = function(subarr) {
        for (let i = 0; i < preOrder.length; i++) {
            if (subarr.includes(preOrder[i])) return i;
        }
        return -1;
    }
    
    const recursive = function(node, arr) {
        const index = arr.indexOf(node.data);
        
        const leftNode = findIndex(arr.slice(0, index));        // 2
        const rightNode = findIndex(arr.slice(index + 1));      // 3
        
        if (leftNode !== -1) {
            root.left = new Node(leftNode);
            recusive(root.left, arr.slice(0, index));
        }
        if (rightNode !== -1) {
            root.right = new Node(rightNode);
            recursive(root.right, arr.slice(index + 1));
        }
    }
    
    root = new Node(preOrder[0]);
    recursive(root, inOrder);
    return root;
}
