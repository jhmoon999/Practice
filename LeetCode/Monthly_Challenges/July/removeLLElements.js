//* July 20: Remove Linked List Elements

// Remove all elements from a linked list of integers that have value val.

// Example:
// Input:  1->2->6->3->4->5->6, val = 6
// Output: 1->2->3->4->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
// Recursive - Time: O(n), Space: O(n) due to recursive stack
    // if (head === null) return null;
    // head.next = removeElements(head.next, val);
    // return head.val === val ? head.next : head;

// Iterative - Time: O(n), Space: O(1)
    if (head === null) return null;
    // For LinkedList problems that involve removing nodes, I find
    // it helpful to create a dummy head node so that I don't need 
    // to create a separate edge case for removing the head node
    const newHead = new ListNode('A');
    newHead.next = head;
    let currNode = newHead;
    while (currNode !== null && currNode.next !== null) {
        if (currNode.next.val === val) {
            currNode.next = currNode.next.next;
        }
        // Only if no node was removed this iteration do we proceed
        // to next node. Otherwise, we might skip checking a node.
        else currNode = currNode.next;
    }
    return newHead.next;  // dummy head points to the real head
};