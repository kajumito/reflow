import * as d3 from 'd3';
import * as topojson from "topojson-client";

import style from "./styles/main.scss";

let width = 1200,
		height = 1000;

var svg = d3.select('#map').append('svg')
						.attr('width', width)
						.attr('height', height);

d3.json("src/maps/world.json", function(error, world) {
	console.log(world);
  svg.append('path')
      .datum(topojson.feature(world, world.objects.ne_110m_admin_0_countries))
      .attr('d', d3.geo.path().projection(d3.geo.equirectangular()));
});