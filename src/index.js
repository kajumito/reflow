import * as components from './components';
import globals from './globals';

function init() {
    globals();
    components.MapComponent();
    components.SliderComponent();
}

document.addEventListener('DOMContentLoaded', init, false);
