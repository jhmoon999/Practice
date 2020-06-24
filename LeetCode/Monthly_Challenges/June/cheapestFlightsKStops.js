//* June 14: Cheapest Flights Within K Stops
// There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w.
// Now given all the cities and flights, together with starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.

// Example 1:
// Input: 
// n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
// src = 0, dst = 2, k = 1
// Output: 200

// Example 2:
// Input: 
// n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
// src = 0, dst = 2, k = 0
// Output: 500

// Constraints:
// The number of nodes n will be in range [1, 100], with nodes labeled from 0 to n - 1.
// The size of flights will be in range [0, n * (n - 1) / 2].
// The format of each flight will be (src, dst, price).
// The price of each flight will be in the range [1, 10000].
// k is in the range of [0, n - 1].
// There will not be any duplicated flights or self cycles.

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, K) {
// Ford-Fulkerson 
    // const dp = [];
    // for (let i = 0; i < K + 2; i++) {
    //     dp.push(new Array(n).fill(Infinity));
    // }
    // dp[0][src] = 0;
    // for (let i = 1; i < K + 2; i++) {
    //     dp[i][src] = 0;
    //     flights.forEach(edge => { // edge = [city1, city2, price]
    //         dp[i][edge[1]] = Math.min(dp[i][edge[1]], dp[i-1][edge[0]] + edge[2]);
    //     });
    // }
    // return dp[K+1][dst] === Infinity ? -1 : dp[K+1][dst];
    
// Dijkstra's 
    // create a priority queue for graph algorithm
    class PriorityQueue {
        constructor() {
            this.collection = [];
        }
        // element = [node, weight]
        enqueue(element) {
            if (this.collection.length === 0 ||     
                this.collection[this.collection.length - 1][1] <= element[1])
                this.collection.push(element);
            else {
                // lower weight -> shorter time -> higher priority
                for (let i = 0; i < this.collection.length; i++) {
                    if (element[1] < this.collection[i][1]) {
                        // insert element into the collection at index i
                        this.collection.splice(i, 0, element);
                        break;
                    }
                }
            }
        }
        dequeue() {
            const element = this.collection.shift();
            return element;
        }
        isEmpty() {
            return this.collection.length === 0;
        }
    }
    
    // create a graph to implement a graph algorithm on
    class Graph {
        constructor() {
            this.nodes = [];
            this.adjacencyList = {};
        }
        addNode(node) {
            this.nodes.push(node);
            this.adjacencyList[node] = [];
        }
        addEdge(node1, node2, weight) {
            this.adjacencyList[node1].push({node: node2, weight: weight});
            // if graph edges were undirected, we'd also have:
            // this.adjacencyList[node2].push({node: node1, weight: weight});
        }
        
        // Dijkstra's algorithm
        findPathDijkstra(start, end) {          
            let weights = {};   // could be times or distances too
            let pq = new PriorityQueue();

            weights[start] = 0;
            this.nodes.forEach(node => {
                if (node !== start) weights[node] = Infinity;
            });

            let stops;  // stops cannot exceed K
            pq.enqueue([start, 0, 0]);
            while (!pq.isEmpty()) {     
                let lowestWeight = pq.dequeue();    // [node, weight, stops]
                if (lowestWeight[2] < K + 1) {
                    let currentNode = lowestWeight[0];
                    this.adjacencyList[currentNode].forEach(neighbor => {
                        let weight = lowestWeight[1] + neighbor.weight;
                        if (weight < weights[neighbor.node]) {
                            weights[neighbor.node] = weight;
                            stops = lowestWeight[2] + 1;
                            pq.enqueue([neighbor.node, weight, stops]);
                        }
                    });
                }
            }
            return weights[end] === Infinity ? -1 : weights[end];
        }
    }
    
    let map = new Graph();
    for (let i = 0; i < n; i++) {
        map.addNode(i);
    }
    flights.forEach(edge => {
        map.addEdge(...edge);
    });
    return map.findPathDijkstra(src, dst);
};