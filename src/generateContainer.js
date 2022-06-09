import * as d3 from 'd3';

export function generateContainer(parent) {
    const parentEl = d3.select(parent);

    parentEl.selectAll('*').remove();

    const { clientWidth: width, clientHeight: height } = parent;

    return {
        width,
        height,
        container: parentEl
            .append('svg')
            .attr('width', width - 20) // -paddings
            .attr('height', height - 20), // -paddings
    };
}
