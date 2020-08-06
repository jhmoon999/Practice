// You have a function rand7() that generates a random integer from 1 to 7. Use it to write a function rand5() that generates a random integer from 1 to 5.

// rand7() returns each integer with equal probability. rand5() must also return each integer with equal probability.

function rand7() {
    return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
}
  
// ... why is this question here?
function rand5() {
    // Implement rand5() using rand7()
    let roll = rand7();
    while (roll > 5) roll = rand7();
    return roll;

    //* Recursion could lead to stack overflow if unlucky
    // const roll = rand7();
    // return roll <= 5 ? roll : rand5();
}