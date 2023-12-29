import TimeSeries from "../components/TimeSeries"
export default function Report({data}){
    const daily_adj_close = data.map(row=>{
        return {date:row.date, value:row.adj_close}
    })

    return(
        <div>
            <h1>tesla adjusted close stock price over time</h1>
            <TimeSeries df={daily_adj_close} width={1000} height={500}/>
        </div>
    )
}