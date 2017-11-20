import axios from 'axios';
import * as R from 'ramda';
import slugify from 'slugify';

import listeners from './listeners';

// dom-elements
export const sliderEl = document.querySelector('#inputYear');
export const outputYearEl = document.querySelector('#outputYear');

/**
 * Initializes slider years to correspond selected country data
 */
const sliderInit = async () => {
    if (!sliderEl) return;
    const slugOptions = {lower: true, remove: /[$*_+~.,()'"!\-:@]/g};
    const dataResponse = await axios.get(`/data/${slugify(window.country, slugOptions)}.json`);

    if (dataResponse.status === 200) {
        const {data} = dataResponse;
        const years = R.keys(data);
        window.year = sliderEl.value = outputYearEl.value = years[0];
        sliderEl.setAttribute('min', years[0]);
        sliderEl.setAttribute('max', years[years.length - 1]);
    }
}

export default () => {
    sliderInit();
    listeners();
}
