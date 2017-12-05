/**
 * This is the initialization file for global variables
 */
export default () => {
    window.year = '1971';
    window.country = 'Finland';
    window.map.allCoordinates = [];
    window.map.fromCountryList = [];
    window.map.geoData = undefined;
    window.additionalCountries = {
        to: '',
        year: '',
        countries: []
    };
};
