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
    svg
} from './map-settings';
//import { moveItemAlongPath } from './util/animation';
import { processCoordinates, getRefugeeData } from './util/map';
import { countryChanged } from './events';

// Note that select is a dom-method!

let groupCountries = svg.append('g');
let groupCentroids = svg.append('g');
let worldCountryList = [];
export let allCoordinates = [];
export let fromCountryList = [];



//Lists all the countries in the world to a drop down list so user can search for the country without clicking the map
function makeDropDownList() {

    var dropDownList = document.getElementById("dropDownList");

    for (let i in worldCountryList) {
        var listItem = document.createElement("option");
        listItem.setAttribute("value", worldCountryList[i]);
        listItem.appendChild(document.createTextNode(worldCountryList[i]));
        dropDownList.appendChild(listItem);
    }

    document.getElementById("countryBut").addEventListener("click", function () {
        var countryFromList = document.getElementById("dropDownList").value;
        window.country = countryFromList;
        window.dispatchEvent(countryChanged);
    });

    document.getElementById("search").addEventListener("click", function () {
        document.getElementById("dropDownList").classList.toggle("show");
        document.getElementById("countryBut").classList.toggle("show");
    });
}

//Creates a tooltip for seeing how many refugees came from highlighted country to 
//currently selected country.
function makeTooltip() {

    //Creating the actual tooltip element
    var tooltip = d3select.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("text-align", "center")
        .style("background", "#F0F0F0")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("padding", "2px")
        .style("pointer-events", "none")

    d3select.selectAll("path")
        .on("mouseover", async function (d) {
            var refugeeData = await getRefugeeData();
            tooltip.style("visibility", "visible");
            var refugeeAmount;
            //If there are no refugees from highlighted country, then the amount is set to zero.
            try {

                refugeeAmount = R.find(R.propEq("country", d.properties.NAME), refugeeData[window.year])["countRefugee"];

            } catch (error) {

                refugeeAmount = 0;

            }

            tooltip.text(d.properties.NAME + ": " + refugeeAmount);
        })
        .on("mousemove", function () {
            return tooltip.style("top", (event.pageY - 10) + "px")
                .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });

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
    makeDropDownList();
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


