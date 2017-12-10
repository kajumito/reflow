/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */
import {printCountryData} from './index';

export default () => {

    window.addEventListener('yearChanged', () => {
        //console.log('yearChanged event triggered!');
        printCountryData();

    }, false);

    window.addEventListener('countryChanged', () => {
        //console.log('yearChanged event triggered!');
        printCountryData();
    }, false);

};
