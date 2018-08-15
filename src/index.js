import * as d3 from 'd3';

import { generateData } from './generateData';
import style from './style.css';

const { clientWidth: width, clientHeight: height } = document.querySelector('body');

const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const line = d3.line().curve(d3.curveCardinal.tension(0.9));

generateWord({
    word: 'kamil',
    marginX: 30,
    marginY: 30,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateWord({
    word: 'podlasek',
    marginX: 30,
    marginY: 131,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateWord({
    word: 'javascript developer',
    marginX: 30,
    marginY: 261,
    charHeight: 50,
    charWidth: 25,
    strokeWidth: 2,
    letterSpacing: 10,
});

function generateWord({ word, marginX, marginY, charHeight, charWidth, strokeWidth, letterSpacing }) {
    const data = generateData(word, { h: charHeight, w: charWidth });

    svg.append('g')
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
