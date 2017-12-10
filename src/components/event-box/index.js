import listeners from './listeners';
import wars from '../../data/SODAT.json';

/**
 * Lists wars (randomly) to the event box based on the current year and countries where the refugees are coming from
 * TODO: Bug checking. Do we want to display wars that don't concern countryList countries?
 */
export const listWars = () => {
    const year = window.year;
    const country = window.country;
    const countryList = window.map.fromCountryList;
    const warCount = 5;
    const warsUl = document.getElementById('wars');
    const indexList = [];

    countryList.push(country);

    if (warsUl.childElementCount != 0) {
        while (warsUl.firstChild) {
            warsUl.removeChild(warsUl.firstChild);
        }
    }

    for (let i in wars) {
        if (wars[i].start == year) {
            //if (wars[i].start < year && year < wars[i].stop) {

            if (
                typeof wars[i].location !== 'undefined' &&
        wars[i].location !== null &&
        wars[i].location.length > 1
            ) {
                for (let j in wars[i].location) {
                    for (let k in countryList) {
                        if (wars[i].location[j] == countryList[k]) {
                            addWarToBox(i);
                        }
                    }
                }
            } else if (
                typeof wars[i].location !== 'undefined' &&
        wars[i].location !== null
            ) {
                for (let j in countryList) {
                    if (wars[i].location == countryList[j]) {
                        addWarToBox(i);
                    }
                }
            } else {
                addWarToBox(i);
            }
        }
    }

    function addWarToBox(warIndex) {
    //Check if the event box is full
        const warsUl = document.getElementById('wars');
        if (warsUl.childElementCount >= warCount) return;

        //Check for doubles
        for (let i in indexList) {
            if (indexList[i] == warIndex) {
                return;
            }
        }

        indexList.push(warIndex);

        const html = `
            <li id="event-box">
                <h4 class="war-name">
                    <a href="${wars[warIndex].link}">${wars[warIndex].name}</a>
                </h4>
                <p class="start-year">
                    Start: ${wars[warIndex].start}
                </p>
                <p class="end-year">
                    End: ${wars[warIndex].stop}
                </p>
            </li>`;

        new DOMParser()
            .parseFromString(html, 'text/html')
            .body.childNodes.forEach(node => warsUl.appendChild(node));

    /* 
        var eventBox = document.createElement('li');
        eventBox.id = 'event-box';
        warsUl.appendChild(eventBox);

        var warName = document.createElement('h4');
        warName.classList.add('war-name');
        var warLink = document.createElement('a');
        warLink.href = wars[warIndex].link;
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
    */
    }
};

export default () => {
    listWars();
    listeners();
};
