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
    var yearCapita = R.find(R.propEq('Country Name', window.country), gdpcapita)[year];    
    var yearLE = R.find(R.propEq('Country Name', window.country), le)[year];
    var yearPopulation = R.find(R.propEq('Country Name', window.country), population)[year];
    
    console.log('GDP: ' + numberInUnits(parseFloat(yearGDP.replace(',', '.')), 9, 2) + ' billion; Country: ' + window.country );
    console.log("Capita: " + numberInUnits(parseFloat(yearCapita.replace(',', '.')), 3, 2) + " k; Country: " + window.country );
    console.log("Life Expectancy: " + numberInUnits(parseFloat(yearLE.replace(',', '.')), 0, 1) + " years; Country: " + window.country );
    console.log("Population: " + numberInUnits(parseFloat(yearPopulation), 6, 2) + " million; Country: " + window.country );

    var gdpEl = document.getElementById('gdp');
	var gdpCapitaEl = document.getElementById('gdp-capita');
	var lifeExpectancyEl = document.getElementById('life-expentancy');
	var populationEl = document.getElementById('population');
    gdpEl.innerHTML = 'GDP: ' + numberInUnits(parseFloat(yearGDP.replace(',', '.')), 9, 2) + ' bil.';
	gdpCapitaEl.innerHTML = 'GDP (capita): ' + numberInUnits(parseFloat(yearCapita.replace(',', '.')), 3, 2) + 'k';
	lifeExpectancyEl.innerHTML = 'Life expectancy: ' + numberInUnits(parseFloat(yearLE.replace(',', '.')), 0, 1) + ' years';
	populationEl.innerHTML = 'Population: ' + numberInUnits(parseFloat(yearPopulation), 6, 3) + ' mil.';
	
    //let gdptest = Object.keys(population).map((key) => {
    //  const countryCodeObj = {'Country Name': key};
    //  const row = {...countryCodeObj, ...population[key]};
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
