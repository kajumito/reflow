import { scaleLinear } from 'd3-scale';
import { geoCentroid } from 'd3-geo';
import { queue } from 'd3-queue';
import * as topojson from 'topojson-client';
import * as R from 'ramda';
import gdpData from '../../data/GDPData.json';

import listeners from './listeners';
import jsonWorldMap from './maps/world.json';
import jsonFinland from '../../data/finland.json';
import {
  projection,
  path,
  svg
} from './map-settings';
import { moveItemAlongPath } from './util/animation';
import { drawArcs, processCoordinates } from './util/map';

// Note that select is a dom-method!

let groupCountries = svg.append('g');
let groupCentroids = svg.append('g');
export let allCoordinates = [];


const drawMap = (countries, traffic) => {
    // load map data to array
    window.map.geoData = topojson.feature(countries, countries.objects.ne_110m_admin_0_countries).features;
    // append centroids for each country
    window.map.geoData.map(d => {
        d.centroid = projection(geoCentroid(d));
    });

    // draw countries
    groupCountries.attr('class', 'countries')
        .selectAll('path.country')
        .data(window.map.geoData)
        .enter()
        .append('path')
        .attr('id', (d) => d.properties.NAME)
        .attr('country-code', (d) => d.properties.ADM0_A3)
        .attr('d', path)
        .exit();

    // draw centroids of countries
    groupCentroids.attr('class', 'centroids')
       .selectAll('path.centroid')
       .data(window.map.geoData)
       .enter()
       .append('circle')
       .classed('centroid', true)
       .attr('cx', d => d.centroid[0])
       .attr('cy', d => d.centroid[1])
       .attr('r', '2')
       .exit();

    // Save current year's traffic coordinates to a global variable
    processCoordinates(traffic);

//todo: animation intensity should depend on traffic amount.
let i = 0;
setInterval(_ => {
  if (i > window.map.allCoordinates.length - 1) i = 0;
  moveItemAlongPath(window.map.allCoordinates[i], svg);
  i++;
  }, 300);
}

export default () => {
  drawMap(jsonWorldMap, jsonFinland);
  listeners();


  //const year = window.year;
  //const yearData = R.find(R.propEq('countryName', window.country), testidataa)['1994'];
  //console.log(yearData);


  //let gdptest = Object.keys(gdpData).map((key) => {
  //  const countryCodeObj = {'Country Name': key};
  //  const row = {...countryCodeObj, ...gdpData[key]};
  //  return row;
  //});
  //console.log(JSON.stringify(gdptest));

}


