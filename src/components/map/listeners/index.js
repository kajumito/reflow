import { svg, projection, path } from '../map-settings';
import { select, selectAll } from 'd3-selection';
import { geoCentroid } from 'd3-geo';
import { geoData } from '../index';

export default () => {
    /**
     * When year changes, traffic needs to be redrawn.
     */
    window.addEventListener('yearChanged', (e) => {
        console.log('yearChanged event triggered!');
    }, false);

    //const elements = document.querySelectorAll('.countries > path');
    //console.log(elements);
    //window.dispatchEvent(countryChanged);

    //const countriesEl = document.querySelector('.countries');
//
    //countrieEl.addEventListener('click', (e) => {
    //    e.target
    //})


    /**
     * Select is a d3-method
     */
    select(window).on('resize', (e) => {
        const node = svg.node();
        const newWidth = Math.min(node.parentElement.offsetWidth, window.map.maxWidth);
        const newHeight = Math.min(node.parentElement.offsetHeight, window.map.maxHeight);

        node.setAttribute('width', newWidth);
        node.setAttribute('height', newHeight);
        // change projection to match new width and height
        projection.scale([newWidth/5.333]).translate([newWidth/2.25, newHeight / 1.75]);
        // change all paths
        selectAll('path').attr('d', path);
        // remap centroids
        geoData.map(d => { d.centroid = projection(geoCentroid(d)); });
        // this is only needed if we want to show centroid on map
        selectAll('circle').attr('cx', d => d.centroid[0]).attr('cy', d => d.centroid[1])
    });
}
