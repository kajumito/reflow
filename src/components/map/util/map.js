import * as R from 'ramda';
import { selectAll } from 'd3-selection';
import axios from 'axios';
import slugify from 'slugify';
import { svg } from '../map-settings';
import { additionalCountryAdded } from '../events';
import { transition } from 'd3-transition';


/**
 * @param  {Array} c Coordinate
 * @return {String}  Svg arc string
 */
export const drawArcs = c => {
    const bend = 1.3;
    const d = { source: c[0], target: c[1] };
    const dx = d.target[0] - d.source[0];
    const dy = d.target[1] - d.source[1];
    const dr = Math.sqrt(dx * dx + dy * dy) * bend;
    const sweep = d.target[0] - d.source[0] < 0 ? 0 : 1;
    return `M${d.source[0]},${d.source[1]}A${dr} ${dr} 0 0,${sweep} ${d.target[0]},${d.target[1]}`;
};

/**
 * Saves current year's traffic coordinates to a global variable
 */
export const processCoordinates = (traffic) => {
    if (window.map.allCoordinates.length) {
        window.map.allCoordinates = [];
        window.map.fromCountryList = [];
        selectAll('.arc').remove();
    }


    if (traffic[window.year]) {
        traffic[window.year].map((countryObject) => {
            const { country } = countryObject;
            if (!country
                || country === 'Various/Unknown'
                || country === 'Stateless') return true;

            // If we wish to give some presentation of those countries that we haven't
            // got any map-data, we can listen additionalCountryAdded-event and grab
            // those countries from window.additionalCountries
            if (!isValidCountry(country)) {
                const isNew = window.additionalCountries.to != window.country
                    || window.additionalCountries.year != window.year;
                if (isNew) {
                    window.additionalCountries.to = window.country;
                    window.additionalCountries.year = window.year;
                    window.additionalCountries.countries = [countryObject];
                } else {
                    window.additionalCountries.countries.push(countryObject);
                }
                window.dispatchEvent(additionalCountryAdded);
                return true;
            }

            const fromCountry = R.find(R.pathEq(['properties', 'NAME'], country))(window.map.geoData);
            const toCountry = R.find(R.pathEq(['properties', 'NAME'], window.country))(window.map.geoData);
            const coordinates = [
                fromCountry.centroid,
                toCountry.centroid
            ];
            window.map.fromCountryList.push(country);
            window.map.allCoordinates.push(coordinates);

            var totalRefugees = 0;
            var refugeeCount = 0;
            var asylumCount = 0;

            //Get refugee count per country so it can be used to create function in animation
            //TODO: Better way to get the data??
            for (let i in traffic[window.year]) {

                if (traffic[window.year][i].country == country) {

                    if (typeof traffic[window.year][i].countRefugee != 'undefined') {
                        refugeeCount = parseInt(traffic[window.year][i].countRefugee);
                    }

                    if (typeof traffic[window.year][i].countAsylum != 'undefined') {
                        asylumCount = parseInt(traffic[window.year][i].countAsylum);
                    }

                    totalRefugees = refugeeCount + asylumCount;
                    //console.log("kk", totalRefugees);
                }
            }

            // this is unnessessary... here just for demo purpose
            svg.append('path')
                .datum(coordinates)
                .attr('d', drawArcs)
                .attr('class', 'arc')
                //.attr("stroke", 'blue');
            //.exit();

            //Just some playing with animations. Changing "stroke-dashoffset" and/or "stroke-dasharray"
            //based on refugee count could show traffic amount. Or changing "stroke"
            //TODO: Better animation
            selectAll('.arc')
                .attr("stroke-dasharray", 100)
                .attr("stroke-dashoffset", 100)
                //.attr("stroke", 'blue')
                .transition()
                //.duration(3000)
                .attr("stroke-dashoffset", 0);
                //.attr("stroke", 'red');
                //.exit();
        });
    }
};

export const getRefugeeData = async () => {
    const slugOptions = { lower: true, remove: /[$*_+~.,()'"!\-:@]/g };
    const dataResponse = await axios.get(`/data/${slugify(window.country, slugOptions)}.json`);
    if (dataResponse.status === 200) {
        return dataResponse.data;
    }
};

export const isValidCountry = (name) => {
    return R.find(R.pathEq(['properties', 'NAME'], name))(window.map.geoData) !== undefined;
};
