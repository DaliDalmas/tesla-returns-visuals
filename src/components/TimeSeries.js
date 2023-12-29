import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
export default function TimeSeries({df, width, height}){
    
    const svgRef = useRef()
    useEffect(()=>{
        if (!df||df.length===0) return;
        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()

        const margin = {top: 20, right: 20, bottom: 30, left: 50}
        const innerHeight = height - margin.top - margin.bottom
        const innerWidth = width - margin.right - margin.left

        const xScale = d3.scaleUtc()
            .domain([d3.min(df, d=>d.date), d3.max(df, d=>d.date)])
            .range([0, innerWidth])
            .nice()

        const yScale = d3.scaleLinear()
            .domain([d3.min(df, d=>d.value), d3.max(df, d=>d.value)])
            .range([innerHeight, 0])
            .nice()
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
        
        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale))
        
        g.append('g')
            .call(d3.axisLeft(yScale))
        
        g.append('path')
            .datum(df)
            .attr(
                'd',
                d3.line()
                    .x(d=>xScale(d.date))
                    .y(d=>yScale(d.value))
                )
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
        
        g.append('text')
                .text('time(utc)')
                .attr('transform', `translate(${innerWidth/2}, ${innerHeight+margin.top+10})`)
        const g2 = g.append('g')
                .attr('transform', `translate(${-margin.left+10},${innerHeight/2+100})`)
        
        g2.append('text')
                .text('adjusted closing price')
                .attr('transform', `rotate(-90)`)
        

            
        
    },[df, width, height])

    return (
        <svg ref={svgRef} width={width} height={height}>
            
        </svg>
    )
}