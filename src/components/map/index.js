//import { scaleLinear } from 'd3-scale';
import { geoCentroid } from 'd3-geo';
import * as d3select from 'd3-selection';
import * as topojson from 'topojson-client';
import * as R from 'ramda';
//import gdpData from '../../data/GDPData.json';

import listeners from './listeners';
import jsonWorldMap from './maps/world.json';
import {
    projection,
    path,
    svg,
    config
} from './map-settings';
//import { moveItemAlongPath } from './util/animation';
import { processCoordinates, getRefugeeData } from './util/map';
import { countryChanged } from './events';

// Note that select is a dom-method!

let groupCountries = svg.append('g');
let groupCentroids = svg.append('g');
let worldCountryList = [];
let toggle = false;
export let allCoordinates = [];
export let fromCountryList = [];


function makeSearchBar() {

    var searchBarList = document.getElementById('searchBarList');

    for (let i in worldCountryList) {
        var listItem = document.createElement('li');
        listItem.style.display = 'none';
        listItem.setAttribute('id', `search-${worldCountryList[i]}`);
        listItem.setAttribute('class', 'search-bar-li');
        listItem.appendChild(document.createTextNode(worldCountryList[i]));
        searchBarList.appendChild(listItem);

        document.getElementById(`search-${worldCountryList[i]}`).addEventListener('click', function () {

            var a = document.getElementById('searchBarInput');
            var parent = a.parentNode;
            parent.removeChild(a);

            var h2 = document.createElement('h2');
            h2.setAttribute('id', 'countryTitle');
            h2.setAttribute('class', 'side-title');

            parent.insertBefore(h2, parent.firstChild);

            var countryFromList = document.getElementById(worldCountryList[i]).id;
            window.country = countryFromList;
            document.getElementById('searchBarList').style.display = 'none';
            window.dispatchEvent(countryChanged);
            toggle = false;
        });
    }

    var ul = document.getElementById('searchBarList');

    document.getElementById('search').addEventListener('click', function () {

        if (toggle == true) {

            var a = document.getElementById('searchBarInput');
            var parent = a.parentNode;
            parent.removeChild(a);

            var h2 = document.createElement('h2');
            h2.setAttribute('id', 'countryTitle');
            h2.setAttribute('class', 'side-title');

            parent.insertBefore(h2, parent.firstChild);

            document.getElementById('searchBarList').style.display = 'none';
            window.dispatchEvent(countryChanged);

            toggle = false;
        }

        else {

            toggle = true;
            var a = document.getElementById('countryTitle');
            var parent = a.parentNode;
            parent.removeChild(a);

            var inPutBar = document.createElement('input');
            inPutBar.type = 'text';
            inPutBar.setAttribute('id', 'searchBarInput');
            inPutBar.setAttribute('class', 'search-bar');
            inPutBar.setAttribute('placeholder', 'Enter country..');

            parent.insertBefore(inPutBar, parent.firstChild);
            toggle = true;

            //Filter for search bar
            document.getElementById('searchBarInput').addEventListener('keyup', function () {

                var input = document.getElementById('searchBarInput');
                var list = ul.childNodes;

                if (typeof input.textContent == 'undefined')
                    return;

                for (let i in list) {

                    if (typeof list[i].id == 'undefined')
                        return;

                    if (input.value.length == 0) {
                        ul.style.display = 'none';
                    }
                    else {
                        ul.style.display = '';
                    }

                    if (list[i].id.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                        list[i].style.display = '';
                    } else {
                        list[i].style.display = 'none';
                    }
                }
            });
        }
    }, true);
}


//Creates a tooltip for seeing how many refugees came from highlighted country to 
//currently selected country.
function makeTooltip() {

    //Creating the actual tooltip element
    var tooltip = d3select.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('text-align', 'center')
        .style('background', '#F0F0F0')
        .style('border', '0px')
        .style('border-radius', '8px')
        .style('padding', '2px')
        .style('pointer-events', 'none');

    d3select.selectAll('path')
        .on('mouseover', async function (d) {

            //Some errors without this. Don't know what happens or doens't
            if (typeof d == 'undefined')
                return;

            var refugeeData = await getRefugeeData();
            tooltip.style('visibility', 'visible');
            var refugeeAmount;
            var asylumAmount;
            //If there are no refugees from highlighted country, then the amount is set to zero.
            try {
                refugeeAmount = parseInt(R.find(R.propEq('country', d.properties.NAME), refugeeData[window.year])['countRefugee']) || 0;
                asylumAmount = parseInt(R.find(R.propEq('country', d.properties.NAME), refugeeData[window.year])['countAsylum']) || 0;
            } catch (error) {
                refugeeAmount = 0;
                asylumAmount = 0;
            }

            tooltip.text(d.properties.NAME + ': ' + (refugeeAmount + asylumAmount));
        })
        .on('mousemove', function () {
            return tooltip.style('top', (event.pageY - 10) + 'px')
                .style('left', (event.pageX + 10) + 'px');
        })
        .on('mouseout', function () { return tooltip.style('visibility', 'hidden'); });
}

const drawMap = (countries, traffic) => {
    // load map data to array
    window.map.geoData = topojson.feature(countries, countries.objects.ne_110m_admin_0_countries).features;
    // append centroids for each country
    window.map.geoData.map(d => {
        d.centroid = projection(geoCentroid(d));
        worldCountryList.push(d.properties.NAME);
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
    //groupCentroids.attr('class', 'centroids')
    //    .selectAll('path.centroid')
    //    .data(window.map.geoData)
    //    .enter()
    //    .append('circle')
    //    .classed('centroid', true)
    //    .attr('cx', d => d.centroid[0])
    //    .attr('cy', d => d.centroid[1])
    //    .attr('r', '2')
    //    .exit();

    // Save current year's traffic coordinates to a global variable
    processCoordinates(traffic);

    //todo: animation intensity should depend on traffic amount.
    //let i = 0;
    //setInterval(_ => {
    //  if (i > window.map.allCoordinates.length - 1) i = 0;
    //  moveItemAlongPath(window.map.allCoordinates[i], svg);
    //  i++;
    //  }, 300);
};

export default async () => {
    try {
        const trafficPromise = await getRefugeeData();
        drawMap(jsonWorldMap, trafficPromise);
    } catch (error) {
        console.error(error);
    }
    listeners();
    makeSearchBar();
    makeTooltip();

    // Init target-country class from window.country
    const countriesEl = document.querySelector('.countries');
    countriesEl.childNodes.forEach((el) => {
        if (el.id === window.country) el.classList.add('target-country');
    });

    // Init selected country from localStorage if set
    const savedCountry = localStorage.getItem('country');
    if (savedCountry) {
        window.country = savedCountry;
        window.dispatchEvent(countryChanged);
    }
};


