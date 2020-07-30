//* Bloomberg Practice Interview Questions
// Geeks for Geeks 

//* - - - - - - - - - - - - - - - Set 1 - - - - - - - - - - - - - - - - - - -
// Given an integer num, return the string representation separated by commas
var intToStr = function(num) {
    let str = '';
    num = num.toString();
    for (let i = 0; i < num.length; i++) {
        if (i % 3 === 0 && i !== 0) str = ',' + str;
        str = num[num.length - 1 - i] + str;
    }
    return str;
}
console.log(intToStr(5));
console.log(intToStr(4000));
console.log(intToStr(2000000));

//* - - - - - - - - - - - - - - - Set 2 - - - - - - - - - - - - - - - - - - -
// Given an integer n, return the number of ways it can be represented as a
// sum of 1s and 2s. Order matters.
// ex. 3 = [1, 2], [1, 1, 1], [2, 1]
var combination12 = function(n) {
    const recursive = function(remainder) {
        if (remainder === 0) return 1;
        if (remainder < 0) return 0;
        return recursive(remainder - 1) + recursive(remainder - 2);
    }
    return recursive(n);
}
console.log(combination12(3));
console.log(combination12(4));
console.log(combination12(5));

// Reverse a string in-place
var reverseStr = function(str) {
    // in javascript, strings are immutable
    // so I will reverse an array instead to show the concept
    const strArr = str.split('');
    for (let i = 0; i < strArr.length / 2; i++) {
        [strArr[i], strArr[strArr.length - 1 - i]] = 
        [strArr[strArr.length - 1 - i], strArr[i]]
    }
    return strArr.join('');
}
console.log(reverseStr('hello'));
console.log(reverseStr('world'));
console.log(reverseStr('bluebird'));

// Reverse words in a sentence
var reverseSentence = function(sentence) {
    return sentence.split(' ').reverse().join(' ');
}
console.log(reverseSentence('I told myself that I'));
console.log(reverseSentence('would never come back'));
console.log(reverseSentence('if I flew away!'));

//* - - - - - - - - - - - - - - - Set 3 - - - - - - - - - - - - - - - - - - -
// Given a sorted array, find the first occurrence of a given number
var findNum = function(arr, target) {
    let i = 0, j, k = arr.length - 1;
    while (i <= k) {
        j = Math.floor((i + k) / 2);
        if (arr[j] === target) {
            if (j === 0) return 0;
            if (arr[j - 1] !== target) return j;
            else k = j - 1;
        }
        else if (arr[j] < target) i = j + 1;
        else k = j - 1;
    }
    return -1;
}
console.log(findNum([1, 1, 2, 2, 2, 2, 3, 4, 5], 2));
console.log(findNum([1, 1, 1, 1, 1, 2, 3, 4, 5], 1));
console.log(findNum([], 0));

// Balanced parentheses problem
var balancedParentheses = function(str) {
    const dict = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    const stack = [];
    for (let i = 0; i < str.length; i++) {
        if (!dict.hasOwnProperty(str[i])) stack.push(str[i]);
        else {
            if (stack.length === 0) return false;
            if (dict[str[i]] !== stack.pop()) return false;
        }
    }
    return stack.length === 0;
}
console.log(balancedParentheses('()[]{}('));
console.log(balancedParentheses('[()]{}{[()()]()}'));
console.log(balancedParentheses('[])('));

// Two sentences are given. Find the missing words.
var findMissing = function(str1, str2) {
    const dict = {};
    str1.split(' ').forEach(str => {
        if (dict.hasOwnProperty(str)) dict[str] += 1;
        else dict[str] = 1;
    });
    str2.split(' ').forEach(str => {
        if (dict.hasOwnProperty(str)) {
            dict[str] -= 1;
            if (dict[str] === 0) delete dict[str];
        }
        // Warning, due to using forEach instead of regular for-loop, the
        // return statement will only break the forEach loop
        else return 'Str1 does not include Str2';
    });
    return Object.keys(dict).join(', ');
}
console.log(findMissing('This is an example','is example'));
console.log(findMissing('This is an example',''));
console.log(findMissing('','Testing'));

// Given unsorted pairs of ranges, merge them
var mergeRange = function(arr) {
    arr = arr.sort((a, b) => a[0] - b[0]);
    const merged = [arr[0]];
    for (i = 1; i < arr.length; i++) {
        let [a1, a2] = merged[merged.length - 1];
        let [b1, b2] = arr[i];
        if (a2 >= b1) {
            merged[merged.length - 1] = [a1, b2];
        }
        else merged.push(arr[i]);
    }
    return merged;
}
console.log(mergeRange([[1, 2], [13, 40], [15, 60]]));
console.log(mergeRange([[2, 3], [5, 10], [9, 14]]));
console.log(mergeRange([[1, 5], [4, 40], [15, 60]]));

//* - - - - - - - - - - - - - - - Set 4 - - - - - - - - - - - - - - - - - - -
class BinarySearchTree {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.val = value;
    }
}
// Find the lowest common ancestor of two nodes in a binary search tree
var lowestCommonAncestor = function(root, node1, node2) {
    if (node1 < root.val && node2 < root.val) {
        return lowestCommonAncestor(root.left, node1, node2);
    }
    else if (node1 > root.val && node2 > root.val) {
        return lowestCommonAncestor(root.right, node1, node2);
    }
    else {
        // in this case, either node1 > root.val && node2 < root.val
        // or node1 < root.val && node2 > root.val
        // both are valid because we don't know which node was larger
        return root.val;
    }
}

//* Bloomberg Interview
// Given two linked lists, each representing a number, return a linked list
// that represents the sum.

// example 1:
// ll1: 1 -> 2 -> 3 -> null = 123
// ll2: 4 -> 5 -> 6 -> null = 456
// sum: 5 -> 7 -> 9 -> null = 579

// example 2:
// ll1: 1 -> 2 -> 4 -> null = 124
// ll2:      9 -> 6 -> null =  96
// sum: 2 -> 2 -> 0 -> null = 220

class Node {
    constructor(value) {
        this.val = value;
        this.next = null;
    }
}
/**
 * @param {node} head1
 * @param {node} head2
 * @return {node}
 */
var add2NumsLL = function(head1, head2) {
    // reverses a linked list and returns the new head
    const reverse = function(head) {
        // assume you have the helper function already
        // code it if you have extra time
    }

    let curr1 = reverse(head1);
    let curr2 = reverse(head2);
    let curr = new Node(0), carry = 0; // dummy head
    while (curr1 !== null || curr2 !== null) {
        let value, val1 = 0, val2 = 0;
        if (curr1 !== null) {
            val1 = curr1.val;
            curr1 = curr1.next;
        }
        if (curr2 !== null) {
            val2 = curr2.val;
            curr2 = curr2.next;
        }
        value = val1 + val2 + carry;
        if (value > 9) {
            value -= 10;
            carry = 1;
        }
        else carry = 0;
        curr.next = new Node(value);
    }
    return reverse(curr.next);
}
