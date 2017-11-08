/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */

import { sliderEl, outputYearEl } from './index';
import { yearChanged } from './events';


export default () => {
    sliderEl.addEventListener('input', (e) => {
        outputYearEl.value = sliderEl.value;
        window.year = sliderEl.value;
        window.dispatchEvent(yearChanged);
    });
}
