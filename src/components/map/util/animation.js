//import { transition } from 'd3-transition';
import { drawArcs } from './map';

/**
 * @param  {Dom-node} path  An arc representing item route
 * @return {String}         Normal css style string
 */
const translateItem = path => {
    const length = path.getTotalLength();

    return () => (t) => {
        const point = path.getPointAtLength(t * length);
        //const scale = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);
        //return `translate(${point.x},${point.y}) scale(${scale})`;
        return `translate(${point.x},${point.y})`;
    };
};

/**
 * Moves given item along given route
 * @param  {D3 object} item
 * @param  {D3 object} route  An arc representing item route
 */
export const itemTransition = (item, route) => {
    const length = route.node().getTotalLength();
    item.transition()
        .duration(length * 20)
        .attrTween('transform', translateItem(route.node()))
        .on('end', () => route.remove())
        .remove();
};

/**
 * Creates route for given coordinates and triggers
 * animation for that particular route.
 * coordinates are in form: [[x1, y1], [x2, y2]]
 */
export const moveItemAlongPath = (coordinates, svg) => {
    const route = svg.append('path')
        .datum(coordinates)
        .attr('class', 'route')
        .attr('d', drawArcs);

    const item = svg.append('circle')
        .attr('class', 'moving-item')
        .attr('r', 3);

    itemTransition(item, route);
};
