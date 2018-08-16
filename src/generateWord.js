import * as d3 from 'd3';

import { generateData } from './generateData';

const line = d3.line().curve(d3.curveCardinal.tension(0.9));

export function generateWord({
    word,
    container,
    marginX,
    marginY,
    charHeight,
    charWidth,
    strokeWidth,
    letterSpacing,
}) {
    const data = generateData(word, { h: charHeight, w: charWidth }, 'chars');

    container
        .append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .style('stroke-width', strokeWidth)
        .attr('d', line)
        .attr('transform', (_d, i) => `translate(${marginX + i * charWidth}, ${marginY})`)
        .style('stroke', 'white')
        .each(function(d) {
            d.totalLength = this.getTotalLength();
        })
        .attr('stroke-dasharray', d => `${d.totalLength} ${d.totalLength}`)
        .attr('stroke-dashoffset', d => d.totalLength / 2)
        .transition()
        .duration(500)
        .attr('stroke-dasharray', d => `${d.totalLength / 2} ${d.totalLength / 2}`)
        .attr('stroke-dashoffset', d => d.totalLength)
        .transition()
        .duration(500)
        .attr('stroke-dasharray', d => `${d.totalLength} ${d.totalLength}`)
        .attr('stroke-dashoffset', d => d.totalLength)
        .transition()
        .duration(500)
        .attr('stroke-dashoffset', 0)
        .transition()
        .duration(500)
        .attr(
            'transform',
            (_d, i) => `translate(${letterSpacing * i + marginX + i * charWidth}, ${marginY})`,
        );
}
