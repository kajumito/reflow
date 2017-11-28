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
import { select, selectAll } from 'd3-selection';
import { geoCentroid } from 'd3-geo';
import { processCoordinates } from './util/map';
import { allCoordinates, fromCountryList } from '../index';
import jsonFinland from '../../data/finland.json';

export default () => {
    /**
     * When year changes, traffic needs to be redrawn.
     */
    window.addEventListener('yearChanged', (e) => {
        processCoordinates(jsonFinland);
    }, false);

    const countriesEl = document.querySelector('.countries');
    countriesEl.childNodes.forEach((el) => {
        if(el.id === window.country) el.classList.add('target-country');
    });

    //Selects a country from the map.
    countriesEl.addEventListener('click', (e) => {
        //console.log('click event triggered!');
        //console.log(e.target.id);
        countriesEl.childNodes.forEach((el) => {
            el.classList.remove('target-country');
        });
        e.target.classList.add('target-country');
        window.country = e.target.id;
    });


    /**
     * Some responsivity for map
     */
    window.addEventListener('resize', (e) => {
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
}
