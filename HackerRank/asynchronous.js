'use strict';

const fs = require('fs');

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


/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */

var https = require('https');

async function getTotalGoals(team, year) {
    let url = `https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1=${team}&page=1`;
    let totalGoals = 0;
    https.get(url, (resp) => {
        let data = '';
        // data recieved in chunks
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // all data has been received
        resp.on('end', () => {
            data = JSON.parse(data).data;
            for (let i = 0; i < data.length; i++) {
                totalGoals += parseInt(data[i].team1goals);
            }
        });
    })
    // catch errors
    .on('error', (error) => {
        console.log('Error: ', error);
    });
    return totalGoals;
}
async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const team = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getTotalGoals(team, year);

    ws.write(result + '\n');

    ws.end();
}

//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

'use strict';

const fs = require('fs');

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


/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */

var https = require('https');

async function getTotalGoals(team, year) {
    async function getData(page) {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?
                   year=${year}&team1=${team}&page=${page}`;
        return await https.get(url, (resp) => {
            let data = '';
            // data recieved in chunks
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // all data has been received
            resp.on('end', () => {
                data = JSON.parse(data).data;
                let goals = 0;
                for (let i = 0; i < data.length; i++) {
                    goals += parseInt(data[i].team1goals);
                }
                console.log(goals);
            });
        })
        // catch errors
        .on('error', (error) => {
            console.log('Error: ', error);
        });
    }
    //const page1 = await getData(1), page2 = await getData(2);
    //console.log('1 ', page1);
    //console.log('2 ', page2);
    return await getData(1);
}

//* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

'use strict';

const fs = require('fs');

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


/*
 * Complete the 'getTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING team
 *  2. INTEGER year
 */

var https = require('https');

async function getTotalGoals(team, year) {
    let totalGoals = 0;
    async function getData(page) {
        let url = `https://jsonmock.hackerrank.com/api/football_matches?
                   year=${year}&team1=${team}&page=${page}`;
        await https.get(url, (resp) => {
            let data = '';
            // data recieved in chunks
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // all data has been received
            resp.on('end', () => {
                data = JSON.parse(data).data;
                for (let i = 0; i < data.length; i++) {
                    totalGoals += parseInt(data[i].team1goals);
                }
            });
        })
        // catch errors
        .on('error', (error) => {
            console.log('Error: ', error);
        });
    }
    await console.log(getData(1));
    await console.log(getData(2));
    return await totalGoals;
}

async function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const team = readLine();

    const year = parseInt(readLine().trim(), 10);

    const result = await getTotalGoals(team, year);

    ws.write(result + '\n');

    ws.end();
}
