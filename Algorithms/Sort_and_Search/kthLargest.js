//* Kth largest value in array

// Given an array of integers and a number K, find the Kth largest value in the array.
// Example:
// Input: [3, 1, 6, 4, 9, 8], 3     =>	Output: 6
// Input: [1, 9, 5, 3], 1		     =>	Output: 9

function kthLargest(arr, K) {
    // apply quicksort to the side of the pivot that holds kth largest
    function partition(left, right) {
        if (right - left <= 0) return arr[left];
        // wall separates the values smaller than pivot from values larger
        let i = left, wall = left, pivot = arr[right];
        while (i < right) {
            if (arr[i] < pivot) {
                [arr[i], arr[wall]] = [arr[wall], arr[i]];
                wall += 1;
            }
            i += 1;
        }
        // swap pivot and wall
        [arr[right], arr[wall]] = [arr[wall], arr[right]];
        if (wall === arr.length - K) return arr[wall];
        else if (wall > arr.length - K) return partition(left, wall - 1);
        else return partition(wall + 1, right);
    }
    
    return partition(0, arr.length - 1);
}