//* LC 206: Reverse Linked List

// Reverse a singly linked list.
// Example:
// Input: 1->2->3->4->5->NULL
// Output: 5->4->3->2->1->NULL

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
// Utilizes pointers - O(1) space
    let prevNode = null, currNode = head, nextNode;
    while (currNode !== null) {
        nextNode = currNode.next;
        currNode.next = prevNode;
        prevNode = currNode;
        currNode = nextNode;
    }
    return prevNode;
    
// Utilizes an array to store nodes - O(n) space
    // if (head === null) return null;
    // const nodeArr = [];
    // let currentNode = head;
    // while (currentNode !== null) {
    //     nodeArr.push(currentNode);
    //     currentNode = currentNode.next;
    // }
    // for (let i = nodeArr.length - 1; i > 0; i--) {
    //     nodeArr[i].next = nodeArr[i - 1];
    // }
    // nodeArr[0].next = null;
    // return nodeArr[nodeArr.length - 1];
};