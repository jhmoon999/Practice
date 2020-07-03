//* LC 141: Linked List Cycle

// Given a linked list, determine if it has a cycle in it.

// To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, then there is no cycle in the linked list.

// Example 1:
// Input: head = [3,2,0,-4], pos = 1
// Output: true
// Explanation: There is a cycle in the linked list, where tail connects to the second node.

// Example 2:
// Input: head = [1,2], pos = 0
// Output: true
// Explanation: There is a cycle in the linked list, where tail connects to the first node.

// Example 3:
// Input: head = [1], pos = -1
// Output: false
// Explanation: There is no cycle in the linked list.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // Floyd's Tortoise and Hare algorithm - O(n)
    let fast = head, slow = head;
    while (fast !== null && fast.next !== null) {
        fast = fast.next.next;
        slow = slow.next;
        // if there exists a linked list cycle, then eventually
        // the fast and slow pointers will be the same node
        if (fast === slow) return true;
    }
    // if the fast pointer reaches null, then there is no cycle
    return false;
};