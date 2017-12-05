/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */
import {
    svg,
    projection,
    path,
    config as mapConfig
} from './map-settings';
import { selectAll } from 'd3-selection';
import { geoCentroid } from 'd3-geo';
import { processCoordinates } from './util/map';
//import { allCoordinates, fromCountryList } from '../index';
import { countryChanged } from './events';
// import jsonFinland from '../../data/finland.json';
import { getRefugeeData } from './util/map';


export default () => {
    /**
     * When year changes, traffic needs to be redrawn. This also means that there's
     * xhr req for traffic data on every "yearChanged" event, but it shouldn't be
     * an issue because browser will cache it anyway.
     */
    window.addEventListener('yearChanged', async () => {
        try {
            const dataPromise = await getRefugeeData();
            processCoordinates(dataPromise);
        } catch (error) {
            console.error('Couln\'t fetch refugee data on year change: ', error);
        }
    }, false);


    /**
     * Country clicked
     */
    const countriesEl = document.querySelector('.countries');
    // Selects a country from the map.
    countriesEl.addEventListener('click', (e) => {
        window.country = e.target.id;
        window.dispatchEvent(countryChanged);
    });

    /**
     * Save country to localStorage when changed
     */
    window.addEventListener('countryChanged', async () => {
        localStorage.setItem('country', window.country);

        countriesEl.childNodes.forEach((el) => {
            el.classList.remove('target-country');
        });
        document.querySelector(`#${window.country}`).classList.add('target-country');

        // reprocess coordinates
        try {
            const dataPromise = await getRefugeeData();
            processCoordinates(dataPromise);
        } catch (error) {
            console.error('Couln\'t fetch refugee data on country change: ', error);
        }
    });


    /**
     * Some responsivity for map
     */
    window.addEventListener('resize', () => {
        const node = svg.node();
        const newWidth = Math.min(node.parentElement.offsetWidth, mapConfig.width);
        const newHeight = Math.min(node.parentElement.offsetHeight, mapConfig.height);

        node.setAttribute('width', newWidth);
        node.setAttribute('height', newHeight);
        // change projection to match new width and height
        projection.scale([newWidth/mapConfig.scalars.scale])
            .translate([newWidth/mapConfig.scalars.width, newHeight / mapConfig.scalars.height]);
        // change all paths
        selectAll('path').attr('d', path);
        // remap centroids with new projection
        window.map.geoData.map(d => { d.centroid = projection(geoCentroid(d)); });
        // this is only needed if we want to show centroids on map
        selectAll('circle').attr('cx', d => d.centroid[0]).attr('cy', d => d.centroid[1]);
    });
};
