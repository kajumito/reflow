import listeners from './listeners';
import wars from '../../data/SODAT.json';
import { event } from 'd3-selection';


/**
 * Lists 5 wars (randomly) to the event box based on the current year
 * TODO: Get some location/country info so it is possible to filter wars based on countries. Wikipedia? 
 */
export const listWars = () => {

    var year = window.year;
    var country = window.country;
    var war;
    var warCount = 3;
    var warsUl = document.getElementById("wars");
    console.log("Mo");

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

        if (wars[i].start >= year) {
        //if (wars[i].start < year && year < wars[i].stop) {
            warsUl = document.getElementById("wars");
            if (warsUl.childElementCount >= warCount) break;

            var eventBox = document.createElement("li");
            eventBox.id = "event-box";
            warsUl.appendChild(eventBox);

            var warName = document.createElement("h4");
            warName.classList.add("war-name");
            var warLink = document.createElement("a");
            warLink.href = wars[i].linkki;
            var warTitle = document.createTextNode(wars[i].name);
            warLink.appendChild(warTitle);
            warName.appendChild(warLink);

            var startYear = document.createElement("p");
            startYear.classList.add("start-year");
            startYear.appendChild(document.createTextNode("Start: " + wars[i].start));

            var endYear = document.createElement("p");
            endYear.classList.add("end-year");
            endYear.appendChild(document.createTextNode("End: " + wars[i].stop));

            eventBox.appendChild(warName);
            eventBox.appendChild(startYear);
            eventBox.appendChild(endYear);
        }
    }   
}

const kissa = () => {

    //console.log("KISSA");
}

export default () => {
    listWars();
    listeners();
    //kissa();
}
