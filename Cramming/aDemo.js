// Question 1
function cellCompete(states, days)
{
    const saveStates = new Set();
    const newStates = new Array(states.length);
    while (days > 0) {
        
        let currSave = states.join('');
        // cycle hasn't been found, so save current state
        if (!saveStates.has(currSave)) saveStates.add(currSave);
        // cycle has been found, so calculate what state should
        // be after remaining days
        else {
            days = (days % saveStates.size) + 0;
            currSave = Array.from(saveStates)[days];
            return currSave.split('').map(cell => parseInt(cell));
        }
        
        // change state of middle cells 1-6
        for (let i = 1; i < states.length - 1; i++) {
            if (states[i - 1] === states[i + 1]) {
                newStates[i] = 0;
            }
            else newStates[i] = 1;
        }
        // change state of end cells 0 and 7
        newStates[0] = states[1] === 0 ? 0 : 1;
        newStates[7] = states[6] === 0 ? 0 : 1;
        
        // update for next iteration
        states = newStates.slice();
        days -= 1;
    }
    return newStates;
}

// Question 2
function generalizedGCD(num, arr)
{
    // find the smallest num in arr
    // it will save the most time to use its factors
    const smallest = Math.min(...arr);
    let GCD = smallest, isGCD, j = 1;
    while (GCD > 1) {
        isGCD = true;
        // check every num in arr if divisible by GCD
        for (let i = 0; i < num; i++) {
            if (arr[i] % GCD !== 0) {
                isGCD = false;
                break;
            }
        }
        if (isGCD) return GCD;
        
        // find the next largest factor of smallest
        j += 1;
        while (GCD % j !== 0) {
            j += 1;
        }
        GCD /= j;
    }
    return 1;
}