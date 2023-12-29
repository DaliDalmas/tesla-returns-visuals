import TimeSeries from "../components/TimeSeries"
import BarChart from "../components/BarChart"
export default function Report({data}){
    let daily_adj_close = data.map(row=>{
        return {date:row.date, value:row.adj_close}
    })

    const calculateReturns = df =>{
        const returns = []
        for (let i=1; i<df.length; i++){
            const prevPrice = df[i-1].adj_close;
            const currentPrice = df[i].adj_close;
            const stockReturn = ((currentPrice-prevPrice)*100)/prevPrice
            returns.push({
                date:df[i].date,
                value:stockReturn
            })
        }
        return returns
    }
    
    const filterFirstDayOfMonth = df => {
        return df.filter(row => row.date.getDate()===1)
    }

    const filterFirstDayOfQuarter = df => {
        return df.filter(row => {
            const month = row.date.getMonth()+1
            return (row.date.getDate()===1) && (month%3===1)
        })
    }

    const filterFirstDayOfYear = df => {
        return df.filter(row=>{
            return (row.date.getMonth()===6)&&(row.date.getDate()===1)
        })
    }

    const daily_return = calculateReturns(data)
    const monthly_return = filterFirstDayOfMonth(daily_return)
    const quartely_return = filterFirstDayOfQuarter(daily_return)
    const yearly_return = filterFirstDayOfYear(daily_return)

    return(
        <div>
            <h1>tesla adjusted close stock price over time</h1>
            <TimeSeries df={daily_adj_close} width={1000} height={500}/>
            <h1>tesla daily return</h1>
            <TimeSeries df={daily_return} width={1000} height={500}/>
            <h1>tesla monthly return</h1>
            <BarChart df={monthly_return} width={1000} height={500}/>
            <h1>tesla quarterly return</h1>
            <BarChart df={quartely_return} width={1000} height={500}/>
            <h1>tesla yearly return</h1>
            <BarChart df={yearly_return} width={1000} height={500}/>
        </div>
    )
}