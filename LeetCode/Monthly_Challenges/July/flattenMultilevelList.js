//* July 10: Flatten a multileveled doubly linked list

// You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

// You are given the head of the first level of the list. Flatten the list so that all the nodes appear in a single-level, doubly linked list. Return the head of the new list.

// Example 1:
// Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]

// 1---2---3---4---5---6--NULL
//         |
//         7---8---9---10--NULL
//             |
//             11--12--NULL

// Output: [1,2,3,7,8,11,12,9,10,4,5,6]

// Example 2:
// Input: head = [1,2,null,3]

// 1---2---NULL
// |
// 3---NULL

// Output: [1,3,2]

/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
// Every node has a 'prev' pointer, a 'next' pointer, and a 'child' pointer. We 
// want to flatten this multilevel linked list by essentially converting all 
// nodes to have only 'prev' and 'next' pointers. 
// Time:  O(n) where n is number of nodes
// Space: O(n) because we utilize a stack that could contain n nodes
    
    const stack = [];   // holds the 'next' pointer if 'child' exists

    // convertNode is a recursive function that takes a node and depending on
    // its current properties, does one of four cases:
    // 1) node has 'child' and no 'next'
        // convert 'child' to 'next'
        // set node to be 'prev' of 'next' node
        // proceed to 'next' node
    // 2) node has 'child' and 'next'
        // first store 'next' in stack so it won't be overwritten by 'child'
        // convert 'child' to 'next'
        // set node to be 'prev' of 'next' node
        // proceed to 'next' node 
    // 3) node has no 'child' and no 'next'
        // get 'next' node from stack 
        // set node to be 'prev' of 'next' node
        // proceed to 'next' node
        // if stack is empty, then end of list reached 
    // 4) node has no 'child' and 'next'
        // do nothing (because no conversion is necessary)
        // proceed to 'next' node

    const convertNode = function(node) {
        if (node === null) return;  // end of list reached 

        // Case 1 and 2: node has 'child'
        if (node.child !== null) {
            // Case 2: store the 'next' node in stack for Case 3
            if (node.next !== null) {
                stack.push(node.next);
            }
            node.next = node.child;
            node.next.prev = node;
            node.child = null;
            convertNode(node.next);
        }
        
        // Case 3: if node has no existing 'next' or 'child', set its new
        // 'next' to be the most recent node in stack
        else if (node.next === null) {
            // if stack is empty, this step is skipped
            if (stack.length > 0) {
                node.next = stack.pop();
                node.next.prev = node;
                convertNode(node.next);
            }
        }
        
        // Case 4: node has only 'next', so it's flattened already
        else convertNode(node.next);
    }
    
    convertNode(head);
    return head;
};