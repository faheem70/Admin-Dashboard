import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        // Convert values to numbers
        data.forEach(d => {
            d.intensity = +d.intensity;
            d.likelihood = +d.likelihood;
            d.relevance = +d.relevance;
            // Add more conversions for other variables if needed
        });

        // Set up the chart dimensions
        const margin = { top: 20, right: 30, bottom: 60, left: 40 };
        const width = 1000 - margin.left - margin.right; // Increased width
        const height = 400 - margin.top - margin.bottom;

        // Create SVG element
        const svg = d3.select(chartRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Define scales
        const xScale = d3.scaleBand().range([0, width]).padding(0.2); // Increased padding
        const yScale = d3.scaleLinear().range([height, 0]);

        // Set domain for scales
        xScale.domain(data.map(d => d.country));
        yScale.domain([0, d3.max(data, d => Math.max(d.intensity, d.likelihood, d.relevance))]);

        // Draw bars for Intensity
        svg.selectAll('.bar-intensity')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar-intensity')
            .attr('x', d => xScale(d.country))
            .attr('width', xScale.bandwidth() / 3)
            .attr('y', d => yScale(d.intensity))
            .attr('height', d => height - yScale(d.intensity))
            .style('fill', 'steelblue');

        // Draw bars for Likelihood
        svg.selectAll('.bar-likelihood')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar-likelihood')
            .attr('x', d => xScale(d.country) + xScale.bandwidth() / 3)
            .attr('width', xScale.bandwidth() / 3)
            .attr('y', d => yScale(d.likelihood))
            .attr('height', d => height - yScale(d.likelihood))
            .style('fill', 'darkorange');

        // Draw bars for Relevance
        svg.selectAll('.bar-relevance')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar-relevance')
            .attr('x', d => xScale(d.country) + (2 * xScale.bandwidth()) / 3)
            .attr('width', xScale.bandwidth() / 3)
            .attr('y', d => yScale(d.relevance))
            .attr('height', d => height - yScale(d.relevance))
            .style('fill', 'darkgreen');

        // Draw x-axis with rotated labels
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-45)'); // Rotate labels

        // Draw y-axis
        svg.append('g')
            .call(d3.axisLeft(yScale));

        // Draw legend
        const legend = svg.append('g')
            .attr('transform', `translate(${width - 100}, 0)`);

        legend.append('rect')
            .attr('class', 'legend-intensity')
            .attr('x', 0)
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', 'steelblue');

        legend.append('text')
            .attr('x', 15)
            .attr('y', 5)
            .attr('dy', '0.75em')
            .style('text-anchor', 'start')
            .text('Intensity');

        legend.append('rect')
            .attr('class', 'legend-likelihood')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', 'darkorange');

        legend.append('text')
            .attr('x', 15)
            .attr('y', 25)
            .attr('dy', '0.75em')
            .style('text-anchor', 'start')
            .text('Likelihood');

        legend.append('rect')
            .attr('class', 'legend-relevance')
            .attr('x', 0)
            .attr('y', 40)
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', 'darkgreen');

        legend.append('text')
            .attr('x', 15)
            .attr('y', 45)
            .attr('dy', '0.75em')
            .style('text-anchor', 'start')
            .text('Relevance');
    }, [data]);

    return (
        <svg ref={chartRef}></svg>
    );
};

export default Chart;
