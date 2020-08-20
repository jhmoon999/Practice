

'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


var request = require('request');

async function getTeams(year, k) {
    // write your code here
    // API endpoint template: https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=<YEAR>&page=<PAGE_NUMBER>

    function getData(page) {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?
            competition=UEFA%20Champions%20League&year=${year}&page=${page}`;
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) reject(error);
                if (response.statusCode !== 200) {
                    reject('Invalid status code: ' + response.statusCode);
                }
                resolve(JSON.parse(body));
            });
        }); 
    }

    let pageData = await getData(1);
    const numPages = pageData.total_pages;
    const numMatches = {};
    for (let i = 1; i <= 80; i++) {
        pageData = await getData(i);
        pageData.data.forEach(match => {
            numMatches[match.team1] = numMatches[match.team1] + 1 || 1;
            numMatches[match.team2] = numMatches[match.team2] + 1 || 1;
        });
    }
    return Object.keys(numMatches).filter(team => numMatches[team] >= k).sort();
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  
    const year = parseInt(readLine().trim());
    const k = parseInt(readLine().trim());
  
    const teams = await getTeams(year, k);
  
    for (const team of teams) {
      ws.write(`${team}\n`);
    }
  }

//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}


var request = require('request');

async function getTeams(year, k) {
    // write your code here
    // API endpoint template: https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=<YEAR>&page=<PAGE_NUMBER>

    function getData(page) {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?
            competition=UEFA%20Champions%20League&year=${year}&page=${page}`;
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (error) reject(error);
                if (response.statusCode !== 200) {
                    reject('Invalid status code: ' + response.statusCode);
                }
                resolve(JSON.parse(body));
            });
        }); 
    }

    let pageData = await getData(1);
    const numPages = pageData.total_pages;
    console.log(pageData);
    const numMatches = {};
    for (let i = 1; i <= numPages; i++) {
        pageData = await getData(i);
        pageData.data.forEach(match => {
            numMatches[match.team1] = numMatches[match.team1] + 1 || 1;
            numMatches[match.team2] = numMatches[match.team2] + 1 || 1;
        });
    }
    return Object.keys(numMatches).filter(team => numMatches[team] >= k).sort();

    // const allPageData = [];
    // for (let i = 1; i <= numPages; i++) {
    //     allPageData.push(getData(i));
    // }
    // const numMatches = {};
    // return Promise.all(allPageData).then(values => {
    //     values.forEach(value => {
    //         value.data.forEach(match => {
    //             if (numMatches[match.team1]) numMatches[match.team1] += 1;
    //             else numMatches[match.team1] = 1;
    //             if (numMatches[match.team2]) numMatches[match.team2] += 1;
    //             else numMatches[match.team2] = 1;
    //         });
    //     });
    //     console.log(numMatches);
    //     return Object.keys(numMatches).filter(team => numMatches[team] >= k).sort();
    // });
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = parseInt(readLine().trim());
  const k = parseInt(readLine().trim());

  const teams = await getTeams(year, k);

  for (const team of teams) {
    ws.write(`${team}\n`);
  }
}
