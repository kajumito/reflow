export default () => {
    /**
     * When year changes, traffic needs to be redrawn.
     */
    window.addEventListener('yearChanged', (e) => {
        console.log('yearChanged event triggered!');
    }, false);
}
