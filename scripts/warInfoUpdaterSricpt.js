//1. Install "npm install wiki-infobox"
//2. Run from command line using "node warInfoUpdaterSricpt"
//3. Remove "," and add "]" to the end of JSON

var infobox = require('wiki-infobox');
var sodat = require('./SODATvanha.json');

var fs = require('fs');
fs.writeFile("SODAT.json", '[', function (err) {
    if (err) {
        return console.log(err);
    }
    //console.log("The file was saved!");
});

for (let i = 0; i < sodat.length; i++) {

    infobox(sodat[i].name, 'en', function (err, data) {

        if (err) {
            appendFileWithoutLocation(i);
            return; // console.log("ERROOORR! No infobox! Index: ", i, err);
        }

        else if (typeof data.place == 'undefined') {
            appendFileWithoutLocation(i);
        }

        else {

            var locationList = [];

            if (typeof data.place != 'undefined' && data.place.length > 1) {
                for (let j in data.place) {
                    if (typeof data.place[j].text != 'undefined') {
                        locationList.push(data.place[j].text);
                    }
                }
            }

            else if (typeof data.place != 'undefined' && typeof data.place.text != 'undefined') {
                locationList = data.place.text;
            }

            //Some have different kind of infobox. This will take care of it
            if (locationList.length == 0 && typeof data.place != 'undefined' && typeof data.place.value != 'undefined') {
                locationList = data.place.value;
            }

            var sota = {
                "start": sodat[i].start,
                "stop": sodat[i].stop,
                "name": sodat[i].name,
                "link": sodat[i].linkki,
                "victoriousParty": sodat[i].voittajat,
                "defeatedParty": sodat[i].looserit,
                "location": locationList
            };

            fs.appendFile("SODAT.json", JSON.stringify(sota) + ',', function (err) {
                if (err) {
                    return console.log(err);
                }
                //console.log("The file was saved!");
            });
        }
    });
}

function appendFileWithoutLocation(sotaIndex) {

    fs.appendFile("SODAT.json", JSON.stringify(sodat[sotaIndex]) + ',', function (err) {
        if (err) {
            return console.log(err);
        }
        //console.log("The file was saved!");
    });
}