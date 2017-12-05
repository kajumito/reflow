import * as components from './components';
import globals from './globals';

function init() {
    // Run global variables' initialization function
    globals();
    // Boot our components
    components.MapComponent();
    components.SliderComponent();
    components.EventBox();
    components.CountryInfo();
}

document.addEventListener('DOMContentLoaded', init, false);
