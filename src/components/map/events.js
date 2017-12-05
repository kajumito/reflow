/***
 * In this file is defined every custom event related to this
 * particular component.
 */
const createEvent = (name) => {
    let event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
};

export const countryChanged = createEvent('countryChanged');
export const additionalCountryAdded = createEvent('additionalCountryAdded');
