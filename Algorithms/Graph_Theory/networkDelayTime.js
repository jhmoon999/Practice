//* LC 743: Network Delay Time

// There are N network nodes, labelled 1 to N.

// Given times, a list of travel times as directed edges times[i] = (u, v, w), where u is the source node, v is the target node, and w is the time it takes for a signal to travel from source to target.

// Now, we send a signal from a certain node K. How long will it take for all nodes to receive the signal? If it is impossible, return -1.

// Example:

//     2 ---> 3     
//     |      |
//     v      v
//     1      4

// Input: times = [[2,1,1],[2,3,1],[3,4,1]], N = 4, K = 2
// Output: 2

/**
 * @param {number[][]} times
 * @param {number} N
 * @param {number} K
 * @return {number}
 */
var networkDelayTime = function(times, N, K) {
    const nodeNetwork = createNetwork(N, times);
    const unvisited = Object.values(nodeNetwork);
    nodeNetwork[K].time = 0;
    let maxTime = 0;
    
    while (unvisited.length > 0) {
        const node = popSmallestTime(unvisited);
        maxTime = node.time;
        node.next.forEach(([nextNode, travelTime]) => {
            nextNode.time = Math.min(nextNode.time, node.time + travelTime);
        });
    }
    
    return (maxTime === Infinity) ? -1 : maxTime;
};

var Node = function(val) {
    this.val = val;
    this.next = [];
    this.time = Infinity;
}

var createNetwork = function(numNodes, edges) {
    const nodes = {};
    for (let i = 1; i <= numNodes; i++) {
        nodes[i] = new Node(i);
    }
    edges.forEach(([u, v, w]) => {
        nodes[u].next.push([nodes[v], w]);
    });
    return nodes;
}

var popSmallestTime = function(list) {
    list.sort((a, b) => a.time - b.time);
    return list.shift();
}