//* August 20: Reorder List

// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

// You may not modify the values in the list's nodes, only nodes itself may be changed.

// Example 1:
// Given 1->2->3->4, reorder it to 1->4->2->3.

// Example 2:
// Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {
// Brute-force
    if (head === null) return;
    const nodes = [];
    let currNode = head;
    while (currNode !== null) {
        nodes.push(currNode);
        currNode = currNode.next;
    }

    let i = 0, j = nodes.length - 1, reverse = false;
    while (i <= j) {
        if (!reverse) {
            currNode = nodes[i];
            currNode.next = nodes[j];
            i += 1;
        }
        else {
            currNode = nodes[j];
            currNode.next = nodes[i];
            j -= 1;
        }
        currNode = currNode.next;
        reverse = !reverse;
    }
    currNode.next = null;   // IMPORTANT: w/o this, there will be a cycle in linkedlist
};

