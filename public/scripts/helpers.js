function getTimeSeries(engineers){
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
            times.push(prevEngineer)
            numbers.push(inThisYear)
            inThisYear++;
        }
        prevEngineer = engineerYear
        
    });
    return [times, numbers]
}