export default () => {
    window.addEventListener('yearChanged', (e) => {
        // probably redraw map or try to only redraw arcs etc...
        console.log('yearChanged event triggered!');
    }, false);
}
