/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */
import {printCountryData} from './index';

export default () => {

    window.addEventListener('yearChanged', (e) => {
        console.log('yearChanged event triggered!');
        printCountryData();
        
    }, false);

}
