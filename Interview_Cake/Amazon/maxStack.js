// You want to be able to access the largest element in a stack.

// You've already implemented this Stack class:

class Stack {
  constructor() {
    // Initialize an empty stack
    this.items = [];
  }
  // Push a new item onto the stack
  push(item) {
    this.items.push(item);
  }
  // Remove and return the last item
  pop() {
    // If the stack is empty, return null
    // (It would also be reasonable to throw an exception)
    if (!this.items.length) {
      return null;
    }
    return this.items.pop();
  }
  // Returns the last item without removing it
  peek() {
    if (!this.items.length) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
}

// Use your Stack class to implement a new class MaxStack with a method getMax() that returns the largest element in the stack. getMax() should not remove the item.

//* My solution - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class MaxStack {
    constructor() {
        this.stack = new Stack();
        this.max = -Infinity;
    }
    // instead of pushing just item into stack, also push the max 
    // item up to that point
    // ex. MaxStack.push(1, 3, 2, 7, 5, 8)
    // => MaxStacK: [8, 8] <- top
    //              [5, 7]
    //              [7, 7]
    //              [2, 3]
    //              [3, 3]
    //              [1, 1] <- bottom
    push(item) {
        this.max = Math.max(this.max, item);
        this.stack.push([item, this.max]);
    }
    // after removing the topmost element, update this.max by peeking at the
    // new topmost element's current max
    pop() {
        let temp = this.stack.pop();
        this.max = this.stack.peek()[1];
        return temp[0];
    }
    // peek stays the same
    peek() {
        return this.stack.peek();
    }
    // this.max will always be the max item of the stack
    getMax() {
        return this.max;
    }
}