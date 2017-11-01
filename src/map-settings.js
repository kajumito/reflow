import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { select } from 'd3-selection';

export const mapWidth = 950;
export const mapHeight = 700;
export const projection = geoNaturalEarth1().scale(200).translate([mapWidth / 2, mapHeight / 1.5]);
export const path = geoPath().pointRadius(2).projection(projection);
export const svg = select('#map')
    .append('svg')
    .attr('width', mapWidth)
    .attr('height', mapHeight);
