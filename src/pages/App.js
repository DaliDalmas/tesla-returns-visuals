import './App.css';
import { csv, timeParse } from 'd3';
import { useEffect, useState } from 'react';
import Report from './Report';

function App() {
  const [data, setData] = useState(null)
  const parseTime = timeParse('%Y-%m-%d')
  const rowConverter = row=>{
    return {
      date: parseTime(row['Date']),
      adj_close: +row['Adj Close'],
      close: +row['Close'],
      high: +row['High'],
      low: +row['Low'],
      open: +row['Open'],
      volume: +row['Volume']
    }
  }
  useEffect(()=>{
    csv(
        'https://raw.githubusercontent.com/DaliDalmas/tesla-returns-visuals/main/data/TSLA.csv',
        rowConverter
      )
      .then(result=>{
        result = result.sort((a,b)=>a.date-b.date)
        setData(result)
      })
  },[])
  return (
    <div className="App">
      {data? <Report data={data}/>: <div>Loading data</div>}
    </div>
  );
}

export default App;
