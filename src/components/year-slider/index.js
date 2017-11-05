import axios from 'axios';
import * as R from 'ramda';

import listeners from './listeners';

export const sliderEl = document.querySelector('#inputYear');
export const outputYearEl = document.querySelector('#outputYear');

/**
 * Initializes slider years to correspond selected country data
 */
const sliderInit = async () => {
    if (!sliderEl) return;
    const dataResponse = await axios.get(`/data/${window.country.toLowerCase()}.json`);

    if (dataResponse.status === 200) {
        const {data} = dataResponse;
        const years = R.flatten(R.map((obj) => R.keys(obj)[0], data));
        sliderEl.setAttribute('min', years[0]);
        sliderEl.setAttribute('max', years[years.length - 1]);
    }
}

export default () => {
    listeners();
    sliderInit();
}
