import listeners from './listeners';
import wars from '../../data/SODAT.json';


/**
 * Lists wars (randomly) to the event box based on the current year and countries where the refugees are coming from
 */
export const listWars = () => {

    var year = window.year;
    var country = window.country;
    var countryList = window.map.fromCountryList;
    // var war;
    var warCount = 3;
    var warsUl = document.getElementById('wars');

    countryList.push(country);

    // //Delete all "li" elements from the eventBox
    // var liLista = document.querySelectorAll('#event-box li');

    if (warsUl.childElementCount != 0) {
        while (warsUl.firstChild) {
            warsUl.removeChild(warsUl.firstChild);
        }
    }

    //delete all other elements from eventBox. If needed.
    //eventBox.innerHTML = "";
    //or
    //while (eventBox.firstChild) {
    //    eventBox.removeChild(eventBox.firstChild);
    //}

    for (let i in wars) {
        if (wars[i].start == year) {
            //if (wars[i].start < year && year < wars[i].stop) {

            if (typeof wars[i].location !== 'undefined' && wars[i].location !== null && wars[i].location.length > 1) {

                for (let j in wars[i].location) {
                    for (let k in countryList) {

                        if (wars[i].location[j] == countryList[k]) {
                            addWarToBox(i);
                        }
                    }
                }
            }
            else if (typeof wars[i].location !== 'undefined' && wars[i].location !== null) {

                for (let j in countryList) {

                    if (wars[i].location == countryList[j]) {
                        addWarToBox(i);
                    }
                }
            }
            else {
                addWarToBox(i);
            }
        }
    }

    function addWarToBox(warIndex) {

        warsUl = document.getElementById('wars');
        if (warsUl.childElementCount >= warCount)
            return;

        var eventBox = document.createElement('li');
        eventBox.id = 'event-box';
        warsUl.appendChild(eventBox);

        var warName = document.createElement('h4');
        warName.classList.add('war-name');
        var warLink = document.createElement('a');
        warLink.href = wars[warIndex].linkki;
        var warTitle = document.createTextNode(wars[warIndex].name);
        warLink.appendChild(warTitle);
        warName.appendChild(warLink);

        var startYear = document.createElement('p');
        startYear.classList.add('start-year');
        startYear.appendChild(document.createTextNode('Start: ' + wars[warIndex].start));

        var endYear = document.createElement('p');
        endYear.classList.add('end-year');
        endYear.appendChild(document.createTextNode('End: ' + wars[warIndex].stop));

        eventBox.appendChild(warName);
        eventBox.appendChild(startYear);
        eventBox.appendChild(endYear);
    }
};

export default () => {
    listWars();
    listeners();
    //kissa();
};
