//* Merge Two Sorted Lists

// Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

// Example:
// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    // edge cases
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    
    let newHead = new ListNode(), currNode = newHead;
    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            currNode.next = l1;
            l1 = l1.next;
        }
        else {
            currNode.next = l2;
            l2 = l2.next;
        }
        currNode = currNode.next;

        // if l1 is null, then the list has been exhausted and 
        // the remaining list is just the rest of l2
        if (l1 === null) currNode.next = l2;
        // similarly if l2 is null, then the remaining list is l1
        if (l2 === null) currNode.next = l1;
        // then the while loop will end because either l1 or l2 is null
    }
    return newHead.next;
};