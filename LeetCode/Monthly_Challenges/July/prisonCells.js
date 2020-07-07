//* July 3: Prison Cells After N Days

// There are 8 prison cells in a row, and each cell is either occupied or vacant. Each day, whether the cell is occupied or vacant changes according to the following rules:
// If a cell has two adjacent neighbors that are both occupied or both vacant, then the cell becomes occupied. Otherwise, it becomes vacant.
// (Note that because the prison is a row, the first and the last cells in the row can't have two adjacent neighbors.)

// We describe the current state of the prison in the following way: cells[i] == 1 if the i-th cell is occupied, else cells[i] == 0.
// Given the initial state of the prison, return the state of the prison after N days (and N such changes described above.)

// Example 1:
// Input: cells = [0,1,0,1,1,0,0,1], N = 7
// Output: [0,0,1,1,0,0,0,0]
// Explanation: 
// The following table summarizes the state of the prison on each day:
// Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
// Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
// Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
// Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
// Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
// Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
// Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
// Day 7: [0, 0, 1, 1, 0, 0, 0, 0]

/**
 * @param {number[]} cells
 * @param {number} N
 * @return {number[]}
 */
var prisonAfterNDays = function(cells, N) {
// Use an auxilary object to detect a cycle
// Time: still O(NM) where N = days, M = cells.length because at worst, there 
// exists no cycle to shorten the process
// Space: O(M) 
    const auxObj = {};
    let cellsNextDay = cells.slice();
    // After first day, the first and last cell will always be unoccupied
    cellsNextDay[0] = 0;
    cellsNextDay[cells.length - 1] = 0;
    
    let index = 0;
    while (N > 0) {
        N -= 1;
        for (let i = 1; i < cells.length - 1; i++) {
            if (cells[i - 1] === cells[i + 1]) {
                cellsNextDay[i] = 1;
            }
            else cellsNextDay[i] = 0;
        }
        // the moment a cycle is detected, we have all the necessary info
        if (auxObj.hasOwnProperty(cellsNextDay)) {
            // there are N days remaining, and index is size of cycle
            // N % index = index of the cycle we saved in auxilary object
            index = N % index;
            return Object.keys(auxObj).find(key => 
                // when array is stored in object: [1, 2, 3] => '1,2,3'
                // split it and convert all the '0's and '1's to 0's and 1's
                auxObj[key] === index).split(',').map(Number);
        }
        else auxObj[cellsNextDay] = index;
        cells = cellsNextDay.slice();
        index += 1;
    }
    return cellsNextDay;
    
// Brute force - change each cell each day
// Time: O(NM) where N = days, M = cells.length
// Space: O(M)
// Time Limit Exceeded - Passed 1/258 cases
// LOL - Test Case 2 had N = 1000000000
    // let cellsNextDay = cells.slice();
    // cellsNextDay[0] = 0;
    // cellsNextDay[cells.length - 1] = 0;
    // while (N > 0) {
    //     for (let i = 1; i < cells.length - 1; i++) {
    //         if (cells[i - 1] === cells[i + 1]) {
    //             cellsNextDay[i] = 1;
    //         }
    //         else cellsNextDay[i] = 0;
    //     }
    //     cells = cellsNextDay.slice();
    //     N -= 1;
    // }
    // return cellsNextDay;
};