// Write a function for doing an in-place ↴ shuffle of an array.

// The shuffle must be "uniform," meaning each item in the original array must have the same probability of ending up in each spot in the final array.

// Assume that you have a function getRandom(floor, ceiling) for getting a random integer that is >= floor and <= ceiling.

//* Interview Cake - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//* Gotchas
// A common first idea is to walk through the array and swap each element with a random other element. Like so:

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function naiveShuffle(array) {

  // For each index in the array
  for (let firstIndex = 0; firstIndex < array.length; firstIndex++) {

    // Grab a random other index
    const secondIndex = getRandom(0, array.length - 1);

    // And swap the values
    if (secondIndex !== firstIndex) {
      const temp = array[firstIndex];
      array[firstIndex] = array[secondIndex];
      array[secondIndex] = temp;
    }
  }
}

// However, this does not give a uniform random distribution.

// Why? We could calculate the exact probabilities of two outcomes to show they aren't the same. But the math gets a little messy. Instead, think of it this way:

// Suppose our array had 3 elements: [a, b, c]. This means it'll make 33 calls to getRandom(0, 2). That's 3 random choices, each with 3 possibilities. So our total number of possible sets of choices is 3*3*3=27. Each of these 27 sets of choices is equally probable.

// But how many possible outcomes do we have? If you paid attention in stats class you might know the answer is 3!, which is 6. Or you can just list them by hand and count:

// a, b, c
// a, c, b
// b, a, c
// b, c, a
// c, b, a
// c, a, b

// But our function has 27 equally-probable sets of choices. 27 is not evenly divisible by 6. So some of our 6 possible outcomes will be achievable with more sets of choices than others.

// We can do this in a single pass. O(n) time and O(1) space.

// A common mistake is to have a mostly-uniform shuffle where an item is less likely to stay where it started than it is to end up in any given slot. Each item should have the same probability of ending up in each spot, including the spot where it starts.

//* Breakdown
// It helps to start by ignoring the in-place requirement, then adapt the approach to work in place.

// Also, the name "shuffle" can be slightly misleading—the point is to arrive at a random ordering of the items from the original array. Don't fixate too much on preconceived notions of how you would "shuffle" e.g. a deck of cards.

// How might we do this by hand?

// We can simply choose a random item to be the first item in the resulting array, then choose another random item (from the items remaining) to be the second item in the resulting array, etc.

// Assuming these choices were in fact random, this would give us a uniform shuffle. To prove it rigorously, we can show any given item has the same probability 1/n of ending up in any given spot.

// First, some stats review: to get the probability of an outcome, you need to multiply the probabilities of all the steps required for that outcome. Like so:

// Outcome	        Steps	                    Probability
// item #1 is a	    a is picked first	        1/n
// ​	
 
// item #2 is a	    a is not picked first,      (n-1)/n * 1/(n-1) = 1/n
//                  a is picked second	
// ​	
// item #3 is a	    a is not picked first,      (n-1)/n * (n-2)/(n-1)
//                  a is not picked second,     * 1/(n-2) = 1/n
//                  a is picked third	
// ​	
// item #4 is a	    a is not picked first,      (n-1)/n * (n-2)/(n-1)
//                  a is not picked second,     * (n-3)/(n-2) * 1/(n-3)
//                  a is not picked third,      = 1/n
//                  a is picked fourth	

// So, how do we implement this in code?

// If we didn't have the "in-place" requirement, we could allocate a new array, then one-by-one take a random item from the input array, remove it, put it in the first position in the new array, and keep going until the input array is empty (well, probably a copy of the input array—best not to destroy the input)

// How can we adapt this to be in place?

// What if we make our new "random" array simply be the front of our input array?

//* Solution
// We choose a random item to move to the first index, then we choose a random other item to move to the second index, etc. We "place" an item in an index by swapping it with the item currently at that index.

// Crucially, once an item is placed at an index it can't be moved. So for the first index, we choose from n items, for the second index we choose from n-1 items, etc.

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function shuffle(array) {

  // If it's 1 or 0 items, just return
  if (array.length <= 1) return;

  // Walk through from beginning to end
  for (let indexWeAreChoosingFor = 0;
    indexWeAreChoosingFor < array.length - 1; indexWeAreChoosingFor++) {

    // Choose a random not-yet-placed item to place there
    // (could also be the item currently in that spot)
    // must be an item AFTER the current item, because the stuff
    // before has all already been placed
    const randomChoiceIndex = getRandom(indexWeAreChoosingFor, array.length - 1);

    // Place our random choice in the spot by swapping
    if (randomChoiceIndex !== indexWeAreChoosingFor) {
      const valueAtIndexWeChoseFor = array[indexWeAreChoosingFor];
      array[indexWeAreChoosingFor] = array[randomChoiceIndex];
      array[randomChoiceIndex] = valueAtIndexWeChoseFor;
    }
  }
}

//* This is a semi-famous algorithm known as the Fisher-Yates shuffle (sometimes called the Knuth shuffle).

//* Complexity
// O(n) time and O(1) space.