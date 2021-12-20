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