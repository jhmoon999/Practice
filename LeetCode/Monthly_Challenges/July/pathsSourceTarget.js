//* July 24: All Paths from Source to Target

// Given a directed, acyclic graph of N nodes.  Find all possible paths from node 0 to node N-1, and return them in any order.

// The graph is given as follows:  the nodes are 0, 1, ..., graph.length - 1.  graph[i] is a list of all nodes j for which the edge (i, j) exists.

// Example:
// Input: [[1,2], [3], [3], []] 
// Output: [[0,1,3],[0,2,3]] 
// Explanation: The graph looks like this:
//
//      0--->1
//      |    |
//      v    v
//      2--->3
//
// There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

// Note:
// The number of nodes in the graph will be in the range [2, 15].
// You can print different paths in any order, but you should keep the order of nodes inside one path.

/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function(graph) {
// Use depth first search traversal to travel from source to target

// Time: O(n^2 * 2^n) - in the worst case scenario, there exists an edge between
// every pair of nodes given. Source and target are fixed, but the other n - 2
// nodes can be in any order in the path. And paths of length k corresponds to
// some choice of k - 1 nodes. So total number of paths: sum of (n - 2) choose 
// (k - 1) for k = 1, 2, ... n - 1, which is about 2^(n - 2). Furthermore the 
// recursive function involves searching current path to avoid repeating nodes,
// which is an O(n) process for a path that can be of length n. The time 
// complexity is total paths * time for each path = 2^(n - 2) * n * O(n) 

// Space: O(n * 2^n) - as explained above, there are at most 2^(n - 2) paths. 
// The space to store each path is total paths * average space per path = 
// 2^(n - 2) * n / 2

    const totalPaths = [], currPath = [0];  // currPath always starts at source
    const dfsTraverse = function(node) {
        // if target node is reached, push completed path to totalPaths
        if (node === graph.length - 1) {
            totalPaths.push(currPath.slice());
            return;
        }
        const edges = graph[node];
        // traverse through each neighboring node
        edges.forEach(edge => {
            // if node has not been visited yet
            if (!currPath.includes(edge)) {
                // add node to current path
                currPath.push(edge);
                dfsTraverse(edge);
                // backtrace by removing node from current path
                currPath.pop(edge);
            } 
        });
    }
    dfsTraverse(0);
    return totalPaths;
};