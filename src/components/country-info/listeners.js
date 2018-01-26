/**
 * Component-related event-listeners are grouped in this file.
 * This improves project maintainability.
 */
import { printCountryData } from './index';

export default () => {

    window.addEventListener('yearChanged', () => {
        //console.log('yearChanged event triggered!');
        printCountryData();

    }, false);

    window.addEventListener('countryChanged', () => {
        //console.log('yearChanged event triggered!');
        printCountryData();
    }, false);

    window.addEventListener('additionalCountryAdded', () => {

        var unlistedCountries = document.getElementById('unlisted-countries');
        var unlistedAmount = document.getElementById('unlisted-amount');
        var nameList = [];

        while (unlistedCountries.firstChild && unlistedAmount.firstChild) {
            unlistedCountries.removeChild(unlistedCountries.firstChild);
            unlistedAmount.removeChild(unlistedAmount.firstChild);
        }

        for (var i = 0; i < additionalCountries.countries.length; i++) {
            if (additionalCountries.countries[i].countRefugee != undefined
                && additionalCountries.countries[i].countRefugee != 0) {

                var checkIfExists = false;

                for (let l in nameList) {
                    if (additionalCountries.countries[i].country == nameList[l])
                        checkIfExists = true;
                }

                if (checkIfExists == false) {
                    var unlistedCountry = document.createElement('li');
                    var refugeeAmount = document.createElement('li');
                    unlistedCountry.classList.add('unlisted-country-name');
                    refugeeAmount.classList.add('unlisted-country-amount');
                    var countryName = document.createTextNode(additionalCountries.countries[i].country);
                    var amount = document.createTextNode(additionalCountries.countries[i].countRefugee);
                    unlistedCountry.appendChild(countryName);
                    refugeeAmount.appendChild(amount);
                    unlistedCountries.appendChild(unlistedCountry);
                    unlistedAmount.appendChild(refugeeAmount);

                    nameList.push(additionalCountries.countries[i].country);
                }
            }
        }
    }, false);

};
