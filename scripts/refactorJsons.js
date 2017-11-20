/**
 * This script replaces all occurances of country names to matching
 * names in dict in all json files in src/data -folder
 */
const fs = require('fs');
const replaceDict = require('./replaceDict');

// If certain file is not wanted to be processed in data-folder,
// it should be in this list.
const excluded = [
    'examplefile.json'
];


/**
 * Reads contents of files in certain directory and returns
 * a promise.
 */
const readFiles = (dir) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (e, files) => e ? reject(e) : resolve(files));
    }).then(files => Promise.all(files
        .filter(name => name.substr(-5) === '.json' && !excluded.includes(name))
        .map(name => new Promise((resolve, reject) => {
            fs.readFile(dir + name, 'utf-8', (e, data) => e ? reject(e) : resolve({name, data}));
        }))
    )).catch(e => Promise.reject(e));
};

readFiles('./src/data/')
    .then((response) => {
        // Here's the magic
        response.map(file => {
            const regExp = new RegExp(Object.keys(replaceDict).join('|'), 'ig')
            const newContent = file.data.replace(regExp, match => {
                console.log(`Replaced: "${match}" with "${replaceDict[match]}" in ${file.name}`);
                return replaceDict[match];
            });
            if (newContent !== file.data) { // <- quite heavy if expression
                fs.writeFile(`./src/data/${file.name}`, newContent, e => {
                    if (e) throw e;
                    console.log(`File ${file.name} saved!`);
                });
            }
        });
    }).catch(e => console.log(e));



