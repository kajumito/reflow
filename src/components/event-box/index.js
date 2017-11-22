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
    var warCount =5;
    var eventBox = document.getElementById("event-box");

    //Delete all "li" elements from the eventBox
    var liLista = document.querySelectorAll('#event-box li');

    if (liLista.length != 0) {

        for (var i = 0; li = liLista[i]; i++) {
            li.parentNode.removeChild(li);
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

            liLista = document.querySelectorAll('#event-box li');

            if (liLista.length >= warCount) break;

            war = wars[i];

            var li = document.createElement("li");
            var link = document.createElement("a");
            var linkText = document.createTextNode(war.name);

            link.appendChild(linkText);
            link.title = war.name;
            link.href = war.linkki;
            li.appendChild(link);
            eventBox.appendChild(li);
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
