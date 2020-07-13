//* June 28: Reconstruct Itinerary

// Given a list of airline tickets represented by pairs of departure and arrival airports [from, to], reconstruct the itinerary in order. All of the tickets belong to a man who departs from JFK. Thus, the itinerary must begin with JFK.

// Note:
// If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string. For example, the itinerary ["JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"].
// All airports are represented by three capital letters (IATA code).
// You may assume all tickets form at least one valid itinerary.
// One must use all the tickets once and only once.

// Example 1:
// Input: [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// Output: ["JFK", "MUC", "LHR", "SFO", "SJC"]

// Example 2:
// Input: [["JFK", "SFO"], ["JFK", "ATL"], ["SFO", "ATL"], ["ATL", "JFK"], ["ATL", "SFO"]]
// Output: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"]
// Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"]. But it is larger in lexical order.

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
    let auxObj = {}, result = [], numTickets = 0;
    for (let i = 0; i < tickets.length; i++) {
        if (auxObj[tickets[i][0]]) {
            auxObj[tickets[i][0]].push(tickets[i][1]);
            auxObj[tickets[i][0]] = auxObj[tickets[i][0]].sort();
        }
        else auxObj[tickets[i][0]] = [tickets[i][1]];
    }
    result.push('JFK');
    const recursive = function(key) {
        if (!auxObj[key]) return;
        let port = auxObj[key];
        for (let i = 0; i < port.length; i++) {
            let neighbor = port[i];
            port.splice(i, 1);
            result.push(neighbor);
            numTickets += 1;
            recursive(neighbor);
            if (numTickets === tickets.length) return;
            port.splice(i, 0, neighbor);
            result.pop();
            numTickets -= 1;
        }
    }
    recursive('JFK');
    return result;
};