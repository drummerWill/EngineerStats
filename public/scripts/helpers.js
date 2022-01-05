function getGroups(engineers){
    let res = {}
    debugger;
    engineers.forEach(eng => {
        if (Object.keys(res).includes(eng.Branch)){
            res[eng.Branch] = res[eng.Branch] + 1
        } 
        else{
            res[eng.Branch] = 1
        }
    });
    return res
}


function genericGrouper(engineers, property){

}

function otherTimeSeries(engineers){
    let series = []
    engineers.forEach(engineer => {
        series.push({x:engineer.DateGranted.replaceAll('/', "-"),y:engineer.PeNumber})
    });
    return series
}


function getTimeSeries(engineers){
    engineers.sort((a,b) => {
        let engineerA = new Date(a.DateGranted).getYear()
        let engineerB = new Date(b.DateGranted).getYear()
        return engineerA > engineerB ? 1: -1
    });
    let xyseries = []
    let times = []
    let numbers = []
    let number = 0
    let year = 0
    let inThisYear = 0
    let i = 0
    let prevEngineer = 0
    engineers.forEach(engineer => {
        let engineerDate = new Date(engineer.DateGranted)
        let engineerYear = engineerDate.getYear()
    
        if (year == 0)
        {
            year = engineerYear
            inThisYear = 1
        }
        
        if (engineerYear == year)
        {
            inThisYear++;
        }
        else
        {
            xyseries.push({x: prevEngineer, y:inThisYear})
            times.push(prevEngineer)
            numbers.push(inThisYear)
            year = engineerYear
            inThisYear++;
        }
        prevEngineer = engineerYear
        
    });
    return [times, numbers, xyseries]
}