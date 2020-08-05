// A crack team of love scientists from OkEros (a hot new dating site) have devised a way to represent dating profiles as rectangles on a two-dimensional plane.

// They need help writing an algorithm to find the intersection of two users' love rectangles. They suspect finding that intersection is the key to a matching algorithm so powerful it will cause an immediate acquisition by Google or Facebook or Obama or something.

// Write a function to find the rectangular intersection of two given love rectangles.

// As with the example above, love rectangles are always "straight" and never "diagonal." More rigorously: each side is parallel with either the x-axis or the y-axis.

// They are defined as objects like this:

const myRectangle = {

  // Coordinates of bottom-left corner
  leftX: 1,
  bottomY: 1,

  // Width and height
  width: 6,
  height: 3,
};

//* My solution - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Time: O(1), Space: O(1)
var rectIntersection = function(rect1, rect2) {
    // helper function that finds the overlap between two segments a and b
    // pointA is starting point of segment a, lengthA is length of segment a
    // pointB is starting point of segment b, lengthB is length of segment b
    const overlap = function(pointA, lengthA, pointB, lengthB) {
        // 3 cases between two segments on the same dimension:
        // 1) overlap: a1------a2
        //                  b1------b2
        // 2) contained: a1---------a2
        //                  b1----b2
        // 3) no overlap: a1----a2   b1-----b2
        // for 1) and 2), the overlapping segment is made up of two points:
        // start: max(a1, b1), end: min(a2, b2)
        const start = Math.max(pointA, pointB);
        const end = Math.min(pointA + lengthA, pointB + lengthB);
        // if no overlap, end - start would be 0 or negative
        if (end - start <= 0) return {point: null, length: null};
        return {point: start, length: end - start};
    }

    const x = overlap(rect1.leftX, rect1.width, rect1.bottomY, rect1.height);
    const y = overlap(rect2.leftX, rect2.width, rect2.bottomY, rect2.height);
    if (x.point === null || y.point === null) {
        return { leftX: null, bottomY: null, width: null, height: null };
    }
    return { 
        leftX: x.point, 
        bottomY: y.point,
        width: x.length,
        height: y.length,
    };
}