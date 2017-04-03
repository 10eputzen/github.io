
var youtubeUrls = [
'gpCUMdfRa9w', //Shining
'pR5q0ajW8Ko', //Der Bunker
'gCvRRFwBs3Y' //Trappatoni
]

var helper_pieOptions = {
    legend: {
        display: true,
        labels: {
            fontSize: 12
        },

    },
    //tooltipFontSize: 30
};

var helper_chartOverTimeOptions = {
    legend: {
        display: false,
        labels: {
            fontSize: 20
        }
    },
    scales: {
        yAxes: [{
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left',
            scaleLabel: {
                display: true,
                labelString: 'Mood'
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Day'
            }
        }]
    }
};