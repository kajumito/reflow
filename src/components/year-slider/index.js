import axios from 'axios';
import * as R from 'ramda';
import slugify from 'slugify';

import listeners from './listeners';
import { yearChanged } from './events';

// dom-elements
export const sliderEl = document.querySelector('#inputYear');
export const outputYearEl = document.querySelector('#outputYear');
export const playButton = document.querySelector('.togglePlay');

export const loadPlayButton = () => {
    // Empty playButton's children
    while (playButton.firstChild) { playButton.removeChild(playButton.firstChild); }
    // Append play-icon
    const html = window.sliderPlaying 
        ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    new DOMParser()
        .parseFromString(html, 'text/html')
        .body.childNodes.forEach(node => playButton.appendChild(node));
};

/**
 * Initializes slider years to correspond selected country data
 */
export const sliderInit = async () => {
    if (!sliderEl) return;
    const slugOptions = {lower: true, remove: /[$*_+~.,()'"!\-:@]/g};
    const dataResponse = await axios.get(`data/${slugify(window.country, slugOptions)}.json`);

    if (dataResponse.status === 200) {
        const {data} = dataResponse;
        const years = R.keys(data);
        let cursorYear = years[0];

        years.some((year) => {
            const cursor = R.find(R.propSatisfies(c => c !== 'Various/Unknown', 'country'))(data[year]);
            if (cursor) {
                cursorYear = year;
                return true;
            }
        });

        window.year = sliderEl.value = outputYearEl.value = cursorYear ? cursorYear : years[0];
        sliderEl.setAttribute('min', years[0]);
        sliderEl.setAttribute('max', years[years.length - 1]);
        sliderEl.value = cursorYear;
        window.dispatchEvent(yearChanged);
    }

    loadPlayButton();
};

export default async () => {
    await sliderInit();
    listeners();
};
