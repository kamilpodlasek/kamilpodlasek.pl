import * as d3 from 'd3';

const line = d3.line().curve(d3.curveCardinal.tension(0.9));

export function generateFlashingText(
    { container, marginLeft, marginTop, charWidth, strokeWidth, letterSpacing },
    data,
) {
    container
        .append('g')
        .selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .style('stroke-width', strokeWidth)
        .attr('d', line)
        .attr('transform', (_d, i) => `translate(${marginLeft + i * charWidth}, ${marginTop})`)
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
            (_d, i) => `translate(${letterSpacing * i + marginLeft + i * charWidth}, ${marginTop})`,
        );
}
