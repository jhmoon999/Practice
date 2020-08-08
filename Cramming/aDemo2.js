// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED
function cellCompete(states, days)
{
    // WRITE YOUR CODE HERE 
    const saveStates = new Set();
    let newStates = new Array(8);
    
    while (days > 0) {
        // save current states to check for cycle
        let currStates = states.join('');
        if (!saveStates.has(currStates)) {
            saveStates.add(currStates);
        }
        // if cycle detected, return corresponding states 
        // on final day
        else {
            days %= saveStates.size;
            currStates = Array.from(saveStates)[days];
            return currStates.split('').map(cell => parseInt(cell));
        }
        
        // update the end cells for new day
        newStates[0] = states[1] === 0 ? 0 : 1;
        newStates[7] = states[6] === 0 ? 0 : 1;
        // update the middle cells for new day
        for (let i = 1; i < 7; i++) {
            if (states[i - 1] === states[i + 1]) {
                newStates[i] = 0;
            }
            else newStates[i] = 1;
        }
        
        days -= 1;
        states = newStates.slice();
    }
    
    return newStates;
}
// FUNCTION SIGNATURE ENDS

// IMPORT LIBRARY PACKAGES NEEDED BY YOUR PROGRAM
// SOME FUNCTIONALITY WITHIN A PACKAGE MAY BE RESTRICTED
// DEFINE ANY FUNCTION NEEDED
// FUNCTION SIGNATURE BEGINS, THIS FUNCTION IS REQUIRED
function generalizedGCD(num, arr)
{
    // WRITE YOUR CODE HERE 
    // GCD must be a factor of smallest number in arr 
    let minNum = Math.min(...arr);
    let isGCD, j = 1;
    
    while (minNum > 1) {
        isGCD = true;
        for (let i = 0; i < num; i++) {
            if (arr[i] % minNum !== 0) {
                // not all elements divisible by minNum
                // so it is not the GCD
                isGCD = false;
                break;
            }
        }
        // found minNum to be GCD
        if (isGCD) return minNum;
        
        // find the next largest factor of minNum
        j += 1;
        while (minNum % j !== 0) {
            // worst case, j reaches minNum and exits loop
            j += 1;
        }
        minNum /= j;
    }
    return 1;   // default GCD
}
// FUNCTION SIGNATURE ENDS