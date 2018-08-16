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
    container: svg,
    marginX: 30,
    marginY: 30,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateWord({
    word: 'podlasek',
    container: svg,
    marginX: 30,
    marginY: 131,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateWord({
    word: 'javascript developer',
    container: svg,
    marginX: 30,
    marginY: 261,
    charHeight: 50,
    charWidth: 25,
    strokeWidth: 2,
    letterSpacing: 10,
});

generateLinesWord({
    word: 'abcdefghijklmnopqrstuvwxyz .,-?!',
    container: svg,
    marginX: 30,
    marginY: 400,
    charHeight: 30,
    charWidth: 12,
    strokeWidth: 1,
    letterSpacing: 6,
});

function generateLinesWord({
    word,
    container,
    marginX,
    marginY,
    charHeight,
    charWidth,
    strokeWidth,
    letterSpacing,
}) {
    const wordLength = word.length;

    const data = generateData(word, { h: charHeight, w: charWidth }, 'charsLines').map((letter, i) =>
        letter.map(targetLine => {
            const [[pointAx, pointAy], [pointBx, pointBy]] = targetLine;

            const length = Math.sqrt(Math.pow(pointBx - pointAx, 2) + Math.pow(pointBy - pointAy, 2));

            const angle = (rand(0, 180) * Math.PI) / 180;

            const maxNewPointX = (wordLength / 2 - i - 1) * charWidth;

            const newPointA = [rand(0, maxNewPointX), rand(0, charHeight)];

            const newPointB = [
                Math.cos(angle) * length + newPointA[0],
                Math.sin(angle) * length + newPointA[1],
            ];

            return {
                initial: [newPointA, newPointB],
                target: targetLine,
            };
        }),
    );

    const lines = container
        .append('g')
        .on('mouseover', () => handleMouseOver(lines))
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr(
            'transform',
            (_d, i) => `translate(${letterSpacing * i + marginX + i * charWidth}, ${marginY})`,
        )
        .selectAll('line')
        .data(d => d.map(({ initial }) => initial))
        .enter()
        .append('line')
        .style('stroke-width', strokeWidth)
        .style('stroke', 'white');

    setLinesAttrs(lines);
}

function setLinesAttrs(lines) {
    lines
        .attr('x1', ([[x1]]) => x1)
        .attr('y1', ([[_x1, y1]]) => y1)
        .attr('x2', ([_start, [x2]]) => x2)
        .attr('y2', ([_start, [_x2, y2]]) => y2);
}

function handleMouseOver(lines) {
    setLinesAttrs(
        lines
            .data(d => d.map(({ target }) => target))
            .transition()
            .duration(1500),
    );
}

function generateWord({
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

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
