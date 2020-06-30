//* Max difference between nodes in connected graph

// Given a number of nodes and edges, construct an undirected graph. A connected component of the graph is any group of connected nodes. For each connected component, determine the difference between its maximum and minimum value. Return the maximum of all of these differences.

// Example 1:
// Input: 5, [1, 1, 2, 2, 3, 4], [2, 3, 3, 4, 4, 5]
// Output: 4
// Explanation: 
// All five nodes are in the same connected graph and the largest difference is 5 - 1 = 4.

// Example 2:
// Input: 5, [1, 3, 4], [2, 4, 5]
// Output: 2
// Explanation:
// Nodes 1 and 2 are in the same connected graph, but nodes 3, 4, and 5 are in another connected graph. The largest difference is in the latter graph, and that is 5 - 3 = 2.

/*
 Parameters:
 The number of nodes is gNodes.
 Each node is just a number.
 gFrom and gTo are each an array of nodes.
 An edge exists between gFrom[i] and gTo[i].
 */
function maximumDifference(gNodes, gFrom, gTo) {
    // Create a set 'graphs'. Each element of 'graphs' will be a set that holds
    // all the nodes within a connected graph.
    const graphs = new Set();
    let graph = new Set();
    graph.add(gFrom[0]);
    graph.add(gTo[0]);
    graphs.add(graph); // 'graphs' starts with the first node from gFrom and gTo

    let newGraph = true, combine = [];
    // for all the remaining nodes, add them into 'graphs'
    for (let i = 1; i < gFrom.length; i++) {
        graphs.forEach(graph => {
            // if there is an existing 'graph' that has one of the nodes, then
            // you can add both nodes into that 'graph'
            if (graph.has(gFrom[i]) ||
                graph.has(gTo[i])) {
                graph.add(gFrom[i]);
                graph.add(gTo[i]);
                newGraph = false;
                combine.push(graph);
            }
        });
        // however, if this is the first instance of both nodes, then create a
        // new 'graph' that becomes another element of 'graphs'
        if (newGraph) {
            let graph = new Set();
            graph.add(gFrom[i]);
            graph.add(gTo[i]);
            graphs.add(graph);
        }
        // if there is two or more 'graph' that contains either or both nodes,
        // then we can combine them into a single 'graph'
        if (combine.length >= 2) {
            let combineGraph = new Set();
            combine.forEach(graph => {
                graph.forEach(node => {
                    combineGraph.add(node);
                });
                graphs.delete(graph);
                graphs.add(combineGraph);
            });
        }
        // reset conditions for creating new graph or combining graphs
        newGraph = true;
        combine = [];
    }

    // once 'graphs' has been correctly populated with the correct information,
    // just iterate through each 'graph' for the largest difference
    let min, max, diff = -Infinity;
    graphs.forEach(graph => {
        min = Infinity, max = -Infinity;
        graph.forEach(node => {
            min = Math.min(min, node);
            max = Math.max(max, node);
        });
        diff = Math.max(diff, max - min);
    });
    return diff;
}