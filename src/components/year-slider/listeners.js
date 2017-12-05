/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */

import { sliderEl, outputYearEl } from './index';
import { yearChanged } from './events';


export default () => {
    /**
     * Change the year when slider changes
     */
    sliderEl.addEventListener('input', () => {
        if (sliderEl.value % 1 !== 0) return;
        outputYearEl.value = sliderEl.value;
        window.year = sliderEl.value;
        window.dispatchEvent(yearChanged);
    });
};
