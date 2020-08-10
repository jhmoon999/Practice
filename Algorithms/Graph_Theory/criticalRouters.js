//* Critical Routers

// You are given an undirected connected graph. An articulation point (or cut vertex) is defined as a vertex which, when removed along with associated edges, makes the graph disconnected (or more precisely, increases the number of connected components in the graph). The task is to find all articulation points in the given graph.

// Input:
// The input to the function/method consists of three arguments:
// numNodes, an integer representing the number of nodes in the graph.
// numEdges, an integer representing the number of edges in the graph.
// edges, the list of pair of integers - A, B representing an edge between the nodes A and B.

// Output:
// Return a list of integers representing the critical nodes.

// Example:
// Input: numNodes = 7, numEdges = 7, 
//        edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 5], [5, 6], [3, 4]]
//    3 -- 4  
//   / \
//  1   2   6
//   \ / \ /
//    0   5
// Output: [2, 3, 5]

// Time: O(V * E) - basically after creating a graph, remove a node and check
// if it is still possible to DFS reach all other nodes. If not, then the node
// removed is critical. //* Will attempt Tarjan's Algorithm O(V + E) later.
// Space: O(V + E) - graph is O(E), stack is O(V)
var criticalRouters = function(numNodes, numEdges, edges) {
    // create a graph (adjacency list)
    const graph = {};
    edges.forEach(edge => {
        let [node1, node2] = edge;
        if (graph[node1]) graph[node1].push(node2);
        else graph[node1] = [node2];
        if (graph[node2]) graph[node2].push(node1);
        else graph[node2] = [node1];
    });

    // return a stack of all nodes reached by DFS if skipNode is removed
    const dfsTraversal = function(currNode, skipNode, stack) {
        graph[currNode].forEach(node => {
            if (node !== skipNode && !stack.includes(node)) {
                stack.push(node);
                dfsTraversal(node, skipNode, stack);
            }
        });
        return stack;
    }

    const critical = [];
    for (let node in graph) {
        node = parseInt(node);  // because keys in object are strings
        // first parameter can be any node that is not the skipNode
        let dfs = dfsTraversal(graph[node][0], node, []);
        // if dfsTraversal returns a stack of numNodes - 1 (removed node not in
        // stack), then the node was not critical. If some node could not be
        // reached in graph afterwards, then the removed node was critical.
        if (dfs.length < numNodes - 1) critical.push(node);
    }
    return critical;
}

const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [2, 5], [5, 6], [3, 4]];
console.log(criticalRouters(7, 7, edges));