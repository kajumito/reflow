/**
 * This script gets csv-file-path as argument,
 * and creates json files for each country, and saves them
 * to ./src/data
 *
 * Script is used this way:
 * "npm run parse-refugee-csv ./path/to/csv"
 *
 * Csv-file should be in format
 * Year | Country of asylum | Origin | Population type | Value
 *
 * CSV-export from http://popstats.unhcr.org/en/time_series will
 * be in this format.
 *
 * Note that this script requires node.js v8 or newer to run
 */
const fs = require('fs');
const csv = require('csvtojson');
const slugify = require('slugify');
const R = require('ramda');
const csvErr = new Error('Invalid csv path! Script is used like: "npm run parse-refugee-csv ./path/to/csv"');
const replaceDict = require('./replaceDict');

const path = process.argv[2];
if (path === undefined) {
    console.error(csvErr.message);
    return;
}

/**
 * This is a long process, there is about 298 000 rows in the csv.
 */
const csvParser = csv({trim: true, workerNum: 1});
let countryData = {};

const acceptedTypes = [
    'Asylum-seekers',
    'Refugees (incl. refugee-like situations)'
];

csvParser.fromFile(path)
    .on('csv', (row, i) => {
        if (i > 2) {
            if (!acceptedTypes.includes(row[3])) return false;
            const countType = acceptedTypes[0] === row[3] ? 'countAsylum' : 'countRefugee';
            const rowData = { country: row[2], [countType]: row[4] };

            if (countryData[row[1]] !== undefined ) {
                if (countryData[row[1]][row[0]] !== undefined) {
                    // if there's already asylum-seekers record, merge it to
                    // refugee-record etc
                    const theIndex = R.findIndex(R.propEq('country', row[2]), countryData[row[1]][row[0]]);
                    const theRecord = countryData[row[1]][row[0]][theIndex];
                    if (theRecord !== undefined) theRecord[countType] = row[4];
                    else countryData[row[1]][row[0]].push(rowData);
                } else {
                    countryData[row[1]] = {...countryData[row[1]], [row[0]]: [rowData]}
                }
            } else {
                countryData[row[1]] = {[row[0]]: [rowData]}
            }
        }
    })
    .on('done', () => createFiles(countryData));


/**
 * Create files
 */
function createFiles(json) {
    Object.keys(json).forEach(key => {
        // check if key exists in replaceDict and use that in filename if matched
        const newKey = replaceDict[key] !== undefined ? replaceDict[key] : key;
        const fileName = slugify(newKey, {lower: true, remove: /[$*_+~.,()'"!\-:@]/g});

        fs.writeFile(`./src/data/${fileName}.json`, JSON.stringify(json[key]), e => {
            if (e) console.error(e);
            console.log(`File ${fileName}.json created`);
        });
    });
}
