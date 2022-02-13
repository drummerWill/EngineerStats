function getGroups(engineers){
    let res = {}
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

// return something that can be presented. Over time??? Simple pie or bar chart easiest.
// return something presentable. item: amount.
function genericGrouper(engineers, property){
    let groups = {} 

    
    engineers.forEach(engineer => {
        let engProp = engineer[property]
        if (Object.keys(groups).includes(engProp)){
            groups[engProp] = groups[engProp] + 1
        } 
        else{
            groups[engProp] = 1
        }
    });

    return groups;
}

function otherTimeSeries(engineers){
    let series = []
    engineers.forEach(engineer => {
        let engineerDate = new Date(engineer.DateGranted)
        let dateGranted = engineerDate.toISOString().substring(0,10);
        series.push({x:dateGranted,y:engineer.PeNumber})
    });
    return series
}


function numberTimeSeries(engineers){
    engineers.sort((a,b) => {
        let engineerA = new Date(a.DateGranted)
        let engineerB = new Date(b.DateGranted)
        return engineerA > engineerB ? 1: -1
    });
    let xyseries = []
    let year = 0
    let prevEngineer = 0
    let prevEngineerDate = 0
    engineers.forEach(engineer => {
        let engineerDate = new Date(engineer.DateGranted)
        let engineerYear = engineerDate.getYear()
    
        if (year == 0)
        {
            year = engineerYear
        }
        
        if (engineerYear != year)
        {
            xyseries.push({x: prevEngineerDate, y:prevEngineer.PeNumber})
            year = engineerYear
        }
        // if engineer is last 
        prevEngineer = engineer
        prevEngineerDate = engineerDate.toISOString().substring(0,10);
    });
    return xyseries
}


function getTimeSeries(engineers){
    engineers.sort((a,b) => {
        let engineerA = new Date(a.DateGranted)
        let engineerB = new Date(b.DateGranted)
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
    let prevEngineerDate = 0
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
            xyseries.push({x: prevEngineerDate, y:inThisYear})
            times.push(prevEngineer)
            numbers.push(inThisYear)
            year = engineerYear
            inThisYear++;
        }

        // if engineer is last 
        prevEngineerDate = engineerDate.toISOString().substring(0,10);

        prevEngineer = engineer
        
    });
    return [times, numbers, xyseries]
}