//* July 18: Course Schedule II

// There are a total of n courses you have to take, labeled from 0 to n-1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses.

// There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, return an empty array.

// Example 1:
// Input: 2, [[1,0]] 
// Output: [0,1]
// Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].

// Example 2:
// Input: 4, [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,1,2,3] or [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
// Topological sort using depth-first-search
// Time:  O(V + E) - creating the graph utilizes all the edges which is 
// O(E) and processing all the nodes is O(V) so time is O(V + E)
// Space: O(V + E) - the graph holds as many key-values as the number
// of edges, and the stack and queue each hold up to number of nodes
    
    // edge case: if there are no prerequisites, then the courses can
    // be taken in any order. Here an array from 0 to n-1 is returned.
    if (prerequisites.length === 0) {
        return Array.from(Array(numCourses).keys());
    }
    
    // otherwise: create a graph using prerequisites as the edges
    // this graph can be called an adjacency list of directed neighbors
    const graph = {};
    for (let i = 0; i < numCourses; i++) {
        graph[i] = [];
    }
    // each key-value is a node and its directed neighbors. If a class
    // is not a prerequisite for any classes, then its key has no values.
    for (let i = 0; i < prerequisites.length; i++) {
        let [next, node] = prerequisites[i];
        graph[node].push(next);
    }
    
    // DFS topological sort requires a stack to maintain order of nodes
    // The nodes are ordered from the end of the queue to the start
    const stack = [], queue = [];
    // the cycle boolean is to detect if a cycle exists
    let cycle = false;
    
    // The crux of dfsTraversal is identifying the node that does not 
    // point to any other node, meaning this class is not a prerequisite
    // of any class. Once found, this node is inserted to the end of the
    // queue, and then we can effectively remove it from the graph because
    // its order in the queue has been decided. We recursively traverse
    // through the graph like this, pushing nodes that have neighbors into
    // the stack for later processing and unshifting nodes that don't have
    // any neighbors (that aren't already in the queue) into the queue.
    const dfsTraversal = function(node) {
        // if during the DFS traversal, a node already inside the stack
        // is encountered again, then there exists a cycle within the graph
        if (stack.includes(node)) {
            cycle = true;   // set boolean to true so [] is returned
            return;
        }
        // otherwise, push node into stack to be processed
        stack.push(node);
        if (graph[node].length > 0) {
            // if node has directed neighbors, run dfsTraversal on each so
            // that they are pushed onto the stack first and inserted into
            // the queue first
            graph[node].forEach(next => {
                // only do this if neighboring node isn't already in the 
                // queue (because one class can have multiple prerequisites)
                if (!queue.includes(next)) {
                    dfsTraversal(next);
                }
            });
        }
        // The node on top of the stack should be the same one within this
        // scope. If it is on top, then there are no more directed neighbors
        // that are not already in the queue. Unshift the node into the 
        // queue (remember we are inserting nodes from end to start).
        queue.unshift(stack.pop());
    }
    
    for (node in graph) {
        // parseInt because object keys become strings
        node = parseInt(node);
        // if running dfsTraversal on a previous node had already inserted 
        // the current node into the queue, then don't run it again
        if (!queue.includes(node)) dfsTraversal(node);
    }
    
    // two scenarios where it is impossible to take all courses
    // 1. a cycle exists within the graph so cycle === true at this point
    // 2. there are n nodes, but not all are listed in the prerequisite
    // edges meaning the graph is disconnected
    return (cycle || queue.length !== numCourses) ? [] : queue;
};