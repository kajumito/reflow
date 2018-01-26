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
    return scaledCount > 20 ? scaledCount : 20;
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
        selectAll('.marker').remove();

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

            //////////////////////////////////////
            //        OLD ANIMATION            //
            ////////////////////////////////////

            ////Animation
            //let line = svg.append('path')
            //    .datum(coordinates)
            //    .attr('d', drawArcs)
            //    .attr('class', 'arc');
            //
            //var totalLength = line.node().getTotalLength();
            //
            //line
            //    .attr('stroke-dasharray', setLineLength(totalRefugees, maxCount))
            //    .attr('stroke', setLineColor(totalRefugees));
            //
            ///////////////////////////////////////////////////////////////



            //////////////////////////////////////
            //        NEW ANIMATION            //"MIGHT" LAG!!!!
            ////////////////////////////////////


            let path = svg.append('path')
                .datum(coordinates)
                .attr('d', drawArcs)
                .attr('class', 'arc');

            let l = path.node().getTotalLength();
            let k = l / 5; //Number of circles in a path. Higher looks better but lags more

            //Some optimization. Shorter paths don't need so many circles
            if (l > 100) {
                k = l / 10;
            }

            if (l > 150) {
                k = l / 15;
            }

            if (l > 200) {
                k = l / 20;
            }

            if (l > 250) {
                k = l / 25;
            }

            if (l > 300) {
                k = l / 30;
            }



            var dur1 = 700;
            var point = path.node().getPointAtLength(0);

            let x = 50;

            //Let's add points to every country where the refugees are coming from
            let marker = svg.insert("circle")
                .attr("r", 2)
                .attr("transform", "translate(" + point.x + "," + point.y + ")")
                .style("opacity", 0)
                .attr('class', 'marker')
                .attr('stroke', "crimson")
                .transition()
                .duration(dur1)
                .style("opacity", 1)
                .transition()
                .delay(2000)
                .duration(dur1*2)
                .style("opacity", 0);

            for (let i = k; i < l; i = i + k) {

                let p = path.node().getPointAtLength(i);

                let marker = svg.insert("circle")
                    .attr("r", 1)
                    .attr("transform", "translate(" + p.x + "," + p.y + ")")
                    .style("opacity", 0)
                    .attr('class', 'marker')
                    .attr('fill', "none")
                    .attr('stroke', setLineColor(totalRefugees))
                    .transition()
                    .delay(300)
                    .duration(dur1 + x)
                    .style("opacity", 1)
                    .transition()
                    .delay(500)
                    .duration(dur1)
                    .style('opacity', 0);

                x = x + 50;
            }

            ///////////////////////////////////////////////////
        });
    }
};

export const getRefugeeData = async () => {
    const slugOptions = { lower: true, remove: /[$*_+~.,()'"!\-:@]/g };
    const dataResponse = await axios.get(`data/${slugify(window.country, slugOptions)}.json`);
    if (dataResponse.status === 200) {
        return dataResponse.data;
    }
};

export const isValidCountry = (name) => {
    return R.find(R.pathEq(['properties', 'NAME'], name))(window.map.geoData) !== undefined;
};
