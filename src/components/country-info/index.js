import listeners from './listeners';
import gdp from '../../data/GDPData.json';
import gdpcapita from '../../data/GDPCapita.Json';
import le from '../../data/LEData.json';
import population from '../../data/PopulationData.json';
import * as R from 'ramda';


function numberInUnits(a, exponent, fixedPoint)
{

    return (Number(a) / (Math.pow(10, exponent))).toFixed(fixedPoint);

}

export const printCountryData = () => {

    //console.log("We made it!");

    var country = window.country;
    //var test = "Finland";
    var year = window.year;
    var countryInfo = document.getElementById('country-info');
    countryInfo.getElementsByClassName('side-title')[0].innerHTML = country;

    var yearGDP = R.find(R.propEq('Country Name', window.country), gdp)[year];
    //var yearCapita = R.find(R.propEq('Country Name', window.country), gdpcapita)[year];    
    // var yearLE = R.find(R.propEq('Country Name', window.country), le)[year];
    // var yearPopulation = R.find(R.propEq('Country Name', window.country), population)[year];
    
    console.log('GDP: ' + numberInUnits(parseFloat(yearGDP.replace(',', '.')), 9, 2) + ' billion; Country: ' + window.country );
    //console.log("Capita: " + yearCapita + "; Country: " + window.country );
    // console.log("Life Expectancy: " + yearLE + "; Country: " + window.country );
    // console.log("Population: " + yearPopulation + "; Country: " + window.country );

    var gdpEl = document.getElementById('gdp');
    gdpEl.innerHTML = 'GDP: ' + numberInUnits(parseFloat(yearGDP.replace(',', '.')), 9, 2) + ' bil.';

    //let gdptest = Object.keys(gdpData).map((key) => {
    //  const countryCodeObj = {'Country Name': key};
    //  const row = {...countryCodeObj, ...gdpData[key]};
    //  return row;
    //});
    //console.log(JSON.stringify(gdptest));

    
    //console.log("GDP: " + gdp[year] + " from " + gdp[country]);
    //console.log("Capita: " + gdpcapita[country][year]);
    //console.log("Life Expectancy: " + le[country][year]);
    //console.log("Population: " + population[country][year]);

};

export default () => {
    listeners();
};
