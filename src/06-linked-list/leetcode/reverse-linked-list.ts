
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
} 

function reverseList(head: ListNode | null): ListNode | null {
  let current = head;
  let newHead = null;
  let nextNode = null;
  while (current) {
    nextNode = current.next;
    current.next = newHead;
    newHead = current;
    current = nextNode;
  }
  return newHead;
}