import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { select } from 'd3-selection';

export const config = {
    width: 1200,
    height: 600,
    scalars: {
        scale: 5.333,
        width: 2.25,
        height: 1.75
    }
};

export const projection = geoNaturalEarth1()
    .scale(config.width / config.scalars.scale)
    .translate([config.width / config.scalars.width, config.height / config.scalars.height]);
export const path = geoPath().pointRadius(2).projection(projection);
export const svg = select('#map')
    .append('svg')
    .attr('width', config.width)
    .attr('height', config.height);
