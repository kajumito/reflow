import * as R from 'ramda';
import { selectAll } from 'd3-selection';
import { svg } from '../map-settings'

/**
 * @param  {Array} c Coordinate
 * @return {String}  Svg arc string
 */
export const drawArcs = c => {
  const bend = 1.3;
  const d = {source: c[0], target: c[1]};
  const dx = d.target[0] - d.source[0];
  const dy = d.target[1] - d.source[1];
  const dr = Math.sqrt(dx * dx + dy * dy)*bend;
  const sweep = d.target[0] - d.source[0] < 0 ? 0 : 1;
  return `M${d.source[0]},${d.source[1]}A${dr} ${dr} 0 0,${sweep} ${d.target[0]},${d.target[1]}`;
}

/**
 * Saves current year's traffic coordinates to a global variable
 */
export const processCoordinates = (traffic) => {
  if (window.map.allCoordinates.length) {
      window.map.allCoordinates = [];
      selectAll('.arc').remove();
  }

  if (traffic[window.year]) {
    traffic[window.year].map(({country}) => {
      if (!country || country === 'Various/Unknown' || country === 'Stateless') return true;
      const fromCountry = R.find(R.pathEq(['properties', 'NAME'], country))(window.map.geoData);
      const toCountry = R.find(R.pathEq(['properties', 'NAME'], window.country))(window.map.geoData);
      console.log(country, toCountry);
      const coordinates = [
        fromCountry.centroid,
        toCountry.centroid
      ];
      window.map.allCoordinates.push(coordinates);
      // this is unnessessary... here just for demo purpose
      let line = svg.append('path')
        .datum(coordinates)
        .attr('d', drawArcs)
        .attr('class', 'arc')
        .exit();
    });
  };
};

export const isValidCountry = (name) => {
  //
}
