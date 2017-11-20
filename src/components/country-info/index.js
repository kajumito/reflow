import listeners from './listeners';
import gdp from '../../data/GDPData.json';
import gdpcapita from '../../data/GDPCapita.Json';
import le from '../../data/LEData.json';
import population from '../../data/PopulationData.json';


export const printCountryData = () => {

	//console.log("We made it!");

	var country = window.country;
	//var test = "Finland";
	var year = window.year;

	//console.log("GDP: " + gdp[country][year]);
	//console.log("Capita: " + gdpcapita[country][year]);
	//console.log("Life Expectancy: " + le[country][year]);
	//console.log("Population: " + population[country][year]);

}

export default () => {
    listeners();
}
