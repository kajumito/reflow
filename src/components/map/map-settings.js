import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { select } from 'd3-selection';

export const mapWidth = 1200;
export const mapHeight = 600;
// 225
export const projection = geoNaturalEarth1().scale(mapWidth / 5.333).translate([mapWidth / 2.25, mapHeight / 1.75]);
export const path = geoPath().pointRadius(2).projection(projection);
export const svg = select('#map')
    .append('svg')
    .attr('width', mapWidth)
    .attr('height', mapHeight);
