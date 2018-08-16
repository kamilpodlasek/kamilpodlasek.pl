import * as d3 from 'd3';

export function generateContainer(parent) {
    const { clientWidth: width, clientHeight: height } = parent;

    return d3
        .select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
}
