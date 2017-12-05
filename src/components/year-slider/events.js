/***
 * In this file is defined every custom event related to this
 * particular component.
 */

const createEvent = (name) => {
    let event = document.createEvent('Event');
    event.initEvent(name, true, true);
    return event;
};

export const yearChanged = createEvent('yearChanged');
