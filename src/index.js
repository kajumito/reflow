import * as components from './components';
import globals from './globals';

async function init() {
    // Run global variables' initialization function
    globals();
    // Boot our components
    await components.MapComponent();
    await components.SliderComponent();
    await components.EventBox();
    await components.CountryInfo();
}

document.addEventListener('DOMContentLoaded', init, false);
