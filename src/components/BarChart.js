import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
export default function BarChart({df, width, height}){
    const svgRef = useRef()

    useEffect(()=>{
        if (!df||df.length===0) return;

        const convertToMonthYear = date=>{
            const options = {year: 'numeric', month:'long'}
            return date.toLocaleDateString(undefined, options)
        }

        df = df.filter(row=>row.date!==undefined)
        console.log(df)
 
        df = df.map(row=>{
            return {
                label:convertToMonthYear(row.date),
                value:row.value
            }
        })

        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()

        const margin = {top: 20, right: 20, bottom: 30, left:40}
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom

        const xScale = d3.scaleBand()
            .domain(df.map(row=>row.label))
            .range([0, innerWidth])
            .padding(0.15)
        
        const maxValue = d3.max(df, row=>row.value)
        const minValue = d3.min(df, row=>row.value)
        const extremeValue =  Math.abs(maxValue)>Math.abs(minValue)?Math.abs(maxValue):Math.abs(minValue)
        const yScale = d3.scaleLinear()
            .domain([-extremeValue, extremeValue])
            .range([innerHeight, 0])

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
        
        g.selectAll('rect')
            .data(df)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.label))
            .attr('y', d => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight/2 - yScale(d.value))
            .attr('fill', 'gray')
            .attr('stroke', 'black')

        
        g.append('g')
            
            .attr('transform', `translate(${0},${innerHeight/2})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('transform', 'rotate(-90)');
        
        g.append('g')
            .call(d3.axisLeft(yScale))

    },[df, width, height])
    return (
        <svg ref={svgRef} width={width} height={height}></svg>
    )
}