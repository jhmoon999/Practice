//* LC 1192: Critical Connections in a Network

// There are n servers numbered from 0 to n-1 connected by undirected server-to-server connections forming a network where connections[i] = [a, b] represents a connection between servers a and b. Any server can reach any other server directly or indirectly through the network.

// A critical connection is a connection that, if removed, will make some server unable to reach some other server.

// Return all critical connections in the network in any order.

// Example: 
// Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
//        2
//       /| 
// 3 -- 1 |
//       \|
//        0
// Output: [[1,3]]
// Explanation: [[3,1]] is also accepted.

// Constraints:
// 1 <= n <= 10^5
// n-1 <= connections.length <= 10^5
// connections[i][0] != connections[i][1]
// There are no repeated connections.

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function(n, connections) {
// Time: O(E^2) - remove an edge and traverse graph to reach all
// other nodes (which could cross E edges). Do this for each edge.
// Space: O(V + E) - graph is O(E) and stack is O(V)
// Time Limit Exceeded - 8/12 Cases Passed - //* Need Tarjan's Algorithm
    const graph = {};
    connections.forEach(connection => {
        let [node1, node2] = connection;
        if (graph[node1]) graph[node1].push(node2)
        else graph[node1] = [node2];
        if (graph[node2]) graph[node2].push(node1)
        else graph[node2] = [node1];
    });
    
    const dfsTraversal = function(currNode, skipEdge, stack) {
        let [node1, node2] = skipEdge;
        stack.push(currNode);
        graph[currNode].forEach(nextNode => {
            // avoid traveling across the missing connection
            if (!stack.includes(nextNode) &&
                (!(node1 === currNode && node2 === nextNode) &&
                !(node1 === nextNode && node2 === currNode))) {
                dfsTraversal(nextNode, skipEdge, stack);
            } 
        });
        return stack;
    }
    
    const critical = [];
    connections.forEach(connection => {
        // start DFS at node 0 and attempt to reach all other 
        // nodes while missing a connection
        if (dfsTraversal(0, connection, []).length < n) 
            // if DFS could not reach all n nodes, then the 
            // removed edge must be critical
            critical.push(connection);
    });
    return critical;
};