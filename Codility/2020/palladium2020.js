//* Palladium 2020

// There are N rectangular buildings standing along the road next to each other. The K-th building is of size H[K] × 1.

// Because a renovation of all of the buildings is planned, we want to cover them with rectangular banners until the renovations are finished. Of course, to cover a building, the banner has to be at least as high as the building. We can cover more than one building with a banner if it is wider than 1.

// We can order at most two banners and we want to cover all of the buildings. Also, we want to minimize the amount of material needed to produce the banners.

// What is the minimum total area of at most two banners which cover all of the buildings?

// Write a function that, given an array H consisting of N integers, returns the minimum total area of at most two banners that we will have to order.

// Examples:

// 1. Given H = [3, 1, 4], the function should return 10. The result can be achieved by covering the first two buildings with a banner of size 3×2 and the third building with a banner of size 4×1

// 2. Given H = [5, 3, 2, 4], the function should return 17. The result can be achieved by covering the first building with a banner of size 5×1 and the other buildings with a banner of size 4×3

// 3. Given H = [5, 3, 5, 2, 1], your function should return 19. The result can be achieved by covering the first three buildings with a banner of size 5×3 and the other two with a banner of size 2×2

// 4. Given H = [7, 7, 3, 7, 7], your function should return 35. The result can be achieved by using one banner of size 7×5

// 5. Given H = [1, 1, 7, 6, 6, 6], your function should return 30. The result can be achieved by using banners of size 1×2 and 7×4

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array H is an integer within the range [1..10,000].


function solution(H) {
// O(N) solution:
// First create two arrays of max height of buildings encountered from left to 
// right and then from right to left. This is similar to the first solution,
// but these iterations are outside a for-loop. Finally iterate through the 
// buildings again, using the same banner area calculation. This will be O(3n) 
// because we iterate through H three times, but will be more time efficient 
// than the first solution which is O(n^2) from nested for-loops.
    if (H.length === 1) return H[0];
    const maxLeft = [], maxRight = [];
    // array of tallest building encountered upon reaching i
    // starting from left to right
    maxLeft[0] = H[0];
    for (let i = 1; i < H.length; i++) {
        maxLeft[i] = Math.max(maxLeft[i - 1], H[i]);
    }
    // array of tallest building encountered by reaching i
    // starting from right to left
    maxRight[H.length - 1] = H[H.length - 1];
    for (let i = H.length - 2; i >= 0; i--) {
        maxRight[i] = Math.max(maxRight[i + 1], H[i]);
    }
    // area of smallest possible banner
    // both first element of maxRight and last element of 
    // maxLeft should hold the height of tallest building
    let minArea = maxRight[0] * H.length, area;
    for (let i = 0; i < H.length - 1; i++) {
        // i is the pivot index
        // left: <= i, right: > i
        area = maxLeft[i] * (i + 1) +
               maxRight[i + 1] * (H.length - i - 1);
        // if smaller than current minArea, update
        minArea = Math.min(minArea, area);
    }
    return minArea;
    
// O(N^2) solution:
// Iterate through the buidings and for each one, treat the current building as 
// a pivot. Find the max height of building left of pivot and right of pivot. 
// Then sum the areas of left banner and right banner and update minArea.
    // if (H.length === 1) return H[0];
    // // area of smallest possible banner
    // let minArea = Math.max(...H) * H.length;
    // for (let i = 0; i < H.length - 1; i++) {
    //     // i is the pivot index
    //     // left: <= i, right: > i
    //     let maxLeft = 0, maxRight = 0; 
    //     // tallest building left of pivot
    //     for (let j = i; j >= 0; j--) {
    //         maxLeft = Math.max(maxLeft, H[j]);
    //     }
    //     // tallest building right of pivot
    //     for (let j = i + 1; j < H.length; j++) {
    //         maxRight = Math.max(maxRight, H[j]);
    //     }
    //     // area of the two banners
    //     let area = maxLeft * (i + 1) + 
    //                maxRight * (H.length - i - 1);
    //     // if smaller than current minArea, update
    //     minArea = Math.min(minArea, area);
    // }
    // return minArea;
}