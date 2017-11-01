import { scaleLinear } from 'd3-scale';
import { geoCentroid } from 'd3-geo';
import { queue } from 'd3-queue';
import * as topojson from 'topojson-client';
import * as R from 'ramda';

import jsonWorldMap from './maps/world.json';
import jsonFinland from './data/finland_1row.json';
import {
  projection,
  path,
  svg
} from './map-settings';
import { moveItemAlongPath } from './util/animation';
import { drawArcs } from './util/map';

// Note that select is a dom-method!

let geoData;
let group = svg.append('g');
let allCoordinates = [];


const drawMap = (countries, traffic) => {
    // load map data to array
    geoData = topojson.feature(countries, countries.objects.ne_110m_admin_0_countries).features;
    // append centroids for each country
    geoData.map(d => {
        d.centroid = projection(geoCentroid(d));
    });

    // draw countries
    group.attr('class', 'countries')
        .selectAll('path.country')
        .data(geoData)
        .enter()
        .append('path')
        .attr('id', (d) => d.properties.NAME)
        .attr('d', path)
        .exit();

    // draw centroids of countries
    group.selectAll('path.centroid')
       .data(geoData)
       .enter()
       .append('circle')
       .classed('centroid', true)
       .attr('cx', d => d.centroid[0])
       .attr('cy', d => d.centroid[1])
       .attr('r', '2')
       .exit();

    // draw arcs for yearly traffic data
    traffic.map(years => {
      R.keys(years).map(i => {
        years[i].map(({country}) => {
          const fromCountry = R.find(R.pathEq(['properties', 'NAME'], country))(geoData);
          const toCountry = R.find(R.pathEq(['properties', 'NAME'], 'Finland'))(geoData);
          const coordinates = [
            fromCountry.centroid,
            toCountry.centroid
          ];
          allCoordinates.push(coordinates);

          let line = svg.append('path')
            .datum(coordinates)
            .attr('d', drawArcs)
            .attr('class', 'arc')
            .exit();
        });
      });
    });

// todo: animation intensity should depend on traffic amount.
//let i = 0;
//setInterval(_ => {
//  if (i > allCoordinates.length - 1) i = 0;
//  moveItemAlongPath(allCoordinates[i]);
//  i++;
//  }, 10);
}

drawMap(jsonWorldMap, jsonFinland);


