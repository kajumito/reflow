/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */

import { 
    sliderEl,
    outputYearEl,
    playButton,
    sliderInit, 
    loadPlayButton
} from './index';
import {
    yearChanged,
    sliderPlayStarted,
    sliderPlayStopped
} from './events';


export default () => {
    let sliderMoveIntervalId;

    /**
     * Change the year when slider changes
     */
    sliderEl.addEventListener('input', () => {
        if (sliderEl.value % 1 !== 0) return;
        outputYearEl.value = sliderEl.value;
        window.year = sliderEl.value;
        window.dispatchEvent(yearChanged);
    });

    sliderEl.addEventListener('click', () => {
        const val = Math.floor(sliderEl.value);
        sliderEl.value = val;
        outputYearEl.value = val;
        window.year = val;
        window.dispatchEvent(yearChanged);
    });

    playButton.addEventListener('click', () => {
        window.sliderPlaying = !window.sliderPlaying;
        window.dispatchEvent(window.sliderPlaying ? sliderPlayStarted : sliderPlayStopped);
        loadPlayButton();
    });

    window.addEventListener('sliderPlayStarted', () => {
        document.querySelector('#map').classList.remove('animate-stop');   
        sliderMoveIntervalId = setInterval(() => {
            sliderEl.value = parseFloat(sliderEl.value) + 0.010;
            if (sliderEl.value % 1 === 0) {
                window.year = sliderEl.value;
                window.dispatchEvent(yearChanged);
                outputYearEl.value = sliderEl.value;
            }
        }, 50);
    });

    window.addEventListener('sliderPlayStopped', () => {
        document.querySelector('#map').className += ' animate-stop';        
        clearInterval(sliderMoveIntervalId);
    });

    window.addEventListener('resize', () => {
        sliderInit();
    });
};
