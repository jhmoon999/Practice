//* Top K Frequently Mentioned Keywords

// Given a list of reviews, a list of keywords and an integer k. Find the most popular k keywords in order of most to least frequently mentioned.

// The comparison of strings is case-insensitive.
// Multiple occurances of a keyword in a review should be considred as a single mention.
// If keywords are mentioned an equal number of times in reviews, sort alphabetically.

// Example 1:
//
// Input:
// k = 2
// keywords = ["anacell", "cetracular", "betacellular"]
// reviews = [
//   "Anacell provides the best services in the city",
//   "betacellular has awesome services",
//   "Best services provided by anacell, everyone should use anacell",
// ]
//
// Output:
// ["anacell", "betacellular"]
//
// Explanation:
// "anacell" is occuring in 2 different reviews and "betacellular" is only occuring in 1 review.

// Example 2:
//
// Input:
// k = 2
// keywords = ["anacell", "betacellular", "cetracular", "deltacellular", "eurocell"]
// reviews = [
//   "I love anacell Best services; Best services provided by anacell",
//   "betacellular has great services",
//   "deltacellular provides much better services than betacellular",
//   "cetracular is worse than anacell",
//   "Betacellular is better than deltacellular.",
// ]
//
// Output:
// ["betacellular", "anacell"]
//
// Explanation:
// "betacellular" is occuring in 3 different reviews. "anacell" and "deltacellular" are occuring in 2 reviews, but "anacell" is lexicographically smaller.

// k = length of reviews, m = average length of a review, n = length of keywords
// Time: O(kmn + nlog(n)), Space: O(n)
var topKFrequentKeywords = function(reviews, keywords, k) {
    // create auxilary object to store frequency of keywords in reviews
    const freqs = {};
    keywords.forEach(keyword => freqs[keyword] = 0);

    // use regex to remove all punctuation from each review
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    for (let i = 0; i < reviews.length; i++) {
        let currStr = reviews[i].replace(regex, '');
        // split review into array of lowercase words for comparison
        currStr = currStr.split(' ').map(word => word.toLowerCase());
        for (let keyword in freqs) {
            // if keyword is in the review, increment frequency
            if (currStr.includes(keyword)) freqs[keyword] += 1;
        }
    }

    // sort by frequency first and then alphabetically
    const sorted = Object.keys(freqs).sort((a, b) => {
        return freqs[b] - freqs[a] || a.localeCompare(b) === 1;
    });
    return sorted.slice(0, k);  // return top k frequent keywords
}

const keywords1 = ["anacell", "cetracular", "betacellular"];
const reviews1 = [
  "Anacell provides the best services in the city",
  "betacellular has awesome services",
  "Best services provided by anacell, everyone should use anacell",
];
console.log(topKFrequentKeywords(reviews1, keywords1, 2));

const keywords2 = ["anacell", "betacellular", "cetracular", "deltacellular", "eurocell"];
const reviews2 = [
  "I love anacell Best services; Best services provided by anacell",
  "betacellular has great services",
  "deltacellular provides much better services than betacellular",
  "cetracular is worse than anacell",
  "Betacellular is better than deltacellular.",
];
console.log(topKFrequentKeywords(reviews2, keywords2, 2));