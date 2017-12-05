/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */
import { listWars } from './index';

export default () => {
    /**
     * When year changes, event box must be updated.
     */
    window.addEventListener('yearChanged', () => {
        //kissa();
        listWars();

    }, false);

};
