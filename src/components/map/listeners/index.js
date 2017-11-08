import { svg, projection } from '../map-settings';
import { select } from 'd3-selection';
import jsonWorldMap from '../maps/world.json';
import jsonFinland from '../../../data/finland_1row.json';
import { drawMap } from '../index';

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
        node.setAttribute('width', node.parentElement.offsetWidth);
        node.setAttribute('height', node.parentElement.offsetHeight);
        projection
            .scale([node.parentElement.offsetWidth/3.5])
            .translate([node.parentElement.offsetWidth/2.25,node.parentElement.offsetHeight*1.75]);
        drawMap(jsonWorldMap, jsonFinland);
    });
}
