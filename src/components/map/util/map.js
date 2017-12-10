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
 * Returns length for the line indicating the amount of refugees.
 */
function setLineLength(refugeeNum, maxCount) {
    const scaledCount = refugeeNum / maxCount * 200;
    return scaledCount > 50 ? scaledCount : 50;
}


/**
 * Returns color for the line indicating the amount of refugees
 * TODO: Better scaling? RefugeeNum fluctuates from 1 to over 100 000. Colors are good?
 */
function setLineColor(refugeeNum) {

    if (refugeeNum <= 10) {
        //console.log("<10");
        return '#8FBF71';
    }

    if (10 < refugeeNum && refugeeNum <= 100) {
        //console.log("10-50");
        return '#E6FF7B';
    }

    if (100 < refugeeNum && refugeeNum <= 1000) {
        //console.log("50-100");
        return '#FFE452';
    }

    if (1000 < refugeeNum && refugeeNum <= 5000) {
        //console.log("100-500");
        return '#FFA24C';
    }

    if (5000 < refugeeNum) {
        //console.log(refugeeNum);
        return '#FF6251';
    }
}


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
        // Get minimum and maximum counts per country
        const getCount = (obj) => parseInt(obj.countAsylum || 0) + parseInt(obj.countRefugee || 0);
        const counts = R.map(getCount, traffic[window.year]);
        const [minCount, maxCount] = [
            R.reduce(R.min, Infinity, counts),
            R.reduce(R.max, -Infinity, counts)
        ];

        traffic[window.year].map((countryObject) => {
            const { 
                country,
                countAsylum,
                countRefugee 
            } = countryObject;

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

            //Count total of the asylum seekers and the refugees
            var totalRefugees = 0;
            var refugeeCount = 0;
            var asylumCount = 0;

            if (typeof countRefugee != 'undefined') {
                refugeeCount = parseInt(countRefugee);
            }

            if (typeof countAsylum != 'undefined') {
                asylumCount = parseInt(countAsylum);
            }

            totalRefugees = refugeeCount + asylumCount;

            //Animation
            let line = svg.append('path')
                .datum(coordinates)
                .attr('d', drawArcs)
                .attr('class', 'arc');

            var totalLength = line.node().getTotalLength();

            line
                .attr('stroke-dasharray', setLineLength(totalRefugees, maxCount))
                .attr('stroke', setLineColor(totalRefugees));
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
