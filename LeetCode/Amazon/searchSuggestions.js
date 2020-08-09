//* LC 1268: Search Suggestions System

// Given an array of strings products and a string searchWord. We want to design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with the searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

// Return list of lists of the suggested products after each character of searchWord is typed. 

// Example 1:
// Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
// Output: [
// ["mobile","moneypot","monitor"],
// ["mobile","moneypot","monitor"],
// ["mouse","mousepad"],
// ["mouse","mousepad"],
// ["mouse","mousepad"]
// ]
// Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"]
// After typing m and mo all products match and we show user ["mobile","moneypot","monitor"]
// After typing mou, mous and mouse the system suggests ["mouse","mousepad"]

// Example 2:
// Input: products = ["havana"], searchWord = "havana"
// Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]

// Example 3:
// Input: products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
// Output: [["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]

// Example 4:
// Input: products = ["havana"], searchWord = "tatiana"
// Output: [[],[],[],[],[],[],[]]
 
// Constraints:
// 1 <= products.length <= 1000
// There are no repeated elements in products.
// 1 <= Σ products[i].length <= 2 * 10^4
// All characters of products[i] are lower-case English letters.
// 1 <= searchWord.length <= 1000
// All characters of searchWord are lower-case English letters.

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {
// Sort the list of products and then keep filtering to match searchWord    
// Time: O(mn + nlog(n)) where m = searchWord.length and n = products.length
// Space: O(1)
    // products.sort();    // sorting first is important because suggestions are
    //                     // at most three items in alphabetical order
    // const ans = [];
    // // as we iterate through each character of searchWord, the list of
    // // products is being filtered to only have those characters
    // for (let i = 0; i < searchWord.length; i++) {
    //     // ex. ["bear", "berry", "black", "blue", "bird"], "blah"
    //     // "b"    => ["bear", "berry", "black", "blue", "bird"] 
    //     // "bl"   => ["black", "blue"]
    //     // "bla"  => ["black"]
    //     // "blah" => []
    //     products = products.filter(product => product[i] === searchWord[i]);
    //     ans.push(products.slice(0, 3));     // max 3 suggestions
    // }
    // return ans;
    
    
// Use a trie to maintain suggestions for every prefix of a word
// k = products.length, m = avg length of each product, n = searchWord.length
// Time: O(km + klog(k) + n), Space: O(km)

    const trie = {};
    products.sort();    // sorting first is important because suggestions 
                        // are at most three items in alphabetical order
    
    products.forEach(str => {
        let node = trie;
        for (let i = 0; i < str.length; i++) {
            // if node doesn't have 'suggestions', create the array
            if (!node[str[i]]) node[str[i]] = {'suggestions': []};
            // if 'suggestions' exist, push into array if fewer than 3 items
            if (node[str[i]]['suggestions'].length < 3) {
                node[str[i]]['suggestions'].push(str);
            }
            node = node[str[i]];    // move to next node
        }
    });
    
    // Trie should look like this after populating with products
    // ex. ["abs", "ans", "bed", "bee", "bell", "belly"]
    //  => {a: {b: {s: {}, suggestions: [abs]},
    //          n: {s: {}, suggestions: [ans]},
    //          suggestions: [abs, ans]},
    //      b: {e: {d: {}, suggestions: [bed]},
    //             {e: {l: {l: {y: {}, suggestions: [belly]},
    //                      suggestions: [bell, belly]},
    //                  suggestions: [bell, belly]},
    //              suggestions: [bee, bell, belly]},           
    //          suggestions: [bed, bee, bell]},
    //      }
    
    let node = trie, ans = [];
    // navigate through trie and extract each char's 'suggestions'
    for (let i = 0; i < searchWord.length; i++) {
        if (node) node = node[searchWord[i]];
        // if node is undefined (because searchWord[i] is not in trie),
        // then there are no suggestions (empty array)
        if (node) ans.push(node['suggestions']);
        else ans.push([]);
    }
    return ans;
};