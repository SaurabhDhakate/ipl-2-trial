
function fetchAndVisualizeData(path, hichart_function) {
    fetch(path)
        .then(r => r.json())
        .then(hichart_function)
        .catch(console.log)
}

function tossWinner(data) {
    const seriesData = [];
    for (let year in data) {
        seriesData.push([year, data[year]]);
    }

    Highcharts.chart("box1", {
        chart: {
            type: "column"
        },
        title: {
            text: "1. Matches Won By Teams After Winning Toss"
        },
        subtitle: {
            text:
                'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Matches"
            }
        },
        series: [
            {
                name: "No. of Matches Played",
                data: seriesData
            }
        ]
    });
}

function maxPlayerOfMatch(data) {
    let years = [], dataArray = [], arr = []
    let index = 0
    for (let year in data) {
        arr.push(0)
        years.push(year)
    }
    for (let year in data) {
        let array = [...arr]
        array[index] = data[year][1]
        dataArray.push({ "name": data[year][0], "data": array })
        index++
    }
    Highcharts.chart('box2', {
        chart: {
            type: 'column'
        },
        title: {
            text: '2. Max Player Of The Match'
        },
        xAxis: {
            categories: years
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total fruit consumption'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: dataArray
    });
}

function strikeRate(data) {
    let years = [], dataArray = []
    for (let player in data) {
        for (let year in data[player]) {
            if (!years.includes(year)) {
                years.push(year)
                
            }
        }
    }
    years = years.sort()
    for (let player in data) {
        let arr = []
        for (let year of years) {
            if (data[player][year]) { arr.push(data[player][year]['strikeRate']) }
            else { arr.push(0) }
        }
        dataArray.push({"name":player,"data":arr})
    }
    Highcharts.chart('box3', {
        chart: {
            type: 'column'
        },
        title: {
            text: '3. Strike Rate of Batsman Each Year'
        },
        
        xAxis: {
            categories: years,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Strike Rate'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: dataArray
    });
}

function playerDissmissed(data){
    seriesData = []
    for(let key in data){
        seriesData.push([key, data[key]])
    }
    Highcharts.chart("box4", {
        chart: {
            type: "column"
        },
        title: {
            text: "4. Maximum Number of Times a Player Dismissed by same player"
        },
        subtitle: {
            text:
                'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "No. of Dismissal"
            }
        },
        series: [
            {
                name: "No. of Dismissal",
                data: seriesData
            }
        ]
    });
}

function ecoInSuperOver(data){
    seriesData = []
    for(let key in data){
        seriesData.push([key, data[key]])
    }
    Highcharts.chart("box5", {
        chart: {
            type: "column"
        },
        title: {
            text: "5. Best Economy of Super Over"
        },
        subtitle: {
            text:
                'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
        },
        xAxis: {
            type: "category"
        },
        yAxis: {
            min: 0,
            title: {
                text: "Economy"
            }
        },
        series: [
            {
                name: "Bowler's Economy",
                data: seriesData
            }
        ]
    });
}

fetchAndVisualizeData("./output/teamsWinningTossAndMatch.json", tossWinner);
fetchAndVisualizeData("./output/maxPlayerOfTheMatch.json", maxPlayerOfMatch);
fetchAndVisualizeData("./output/strikeRateEachYear.json", strikeRate);
fetchAndVisualizeData("./output/playerDismissedMaxTimes.json", playerDissmissed);
fetchAndVisualizeData("./output/bestEconomyInSuperOver.json", ecoInSuperOver);
