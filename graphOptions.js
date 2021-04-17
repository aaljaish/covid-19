let options_number = {
    legend: { display: true, position: 'bottom', },
    interaction: { mode: 'index', axis: 'xy', Intersect: false },
    tooltips: { mode: 'index', axis: 'y' },
    plugins: {
        labels: { fontSize: 0 }
    },
    scales: {
        yAxes: [{

            ticks: {
                min: 0,
                beginAtZero: true, 
                callback: function (value, index, values) {
                    return value;
                }
            }
        }],
        xAxes: [
            { id: 'xAxis1', type: 'time', gridLines: { display: false }, time: { displayFormats: { quarter: 'MMM YYYY' } } }
        ]
    }, hoverBackgroundColor: 'black'
}

let options_category = {
    // responsive: false,
    legend: { display: true, position: 'bottom', },
    interaction: { mode: 'index', axis: 'xy', Intersect: false },
    tooltips: { mode: 'index', axis: 'y' },
    plugins: {
        labels: { render: 'percentage', fontSize: 0 }
    },
    scales: {
        xAxes: [{ type: 'time', stacked: true, gridLines: { display: false } }],

        yAxes: [{
            min: 0,
            stacked: true, categoryPercentage: 0.05, scaleLabel: {
                display: true,
                labelString: ''
            },
            ticks: {
                min: 0,
                beginAtZero: true, 
                callback: function (value, index, values) {
                    return value;
                }
            }
        }],

    },
}

let options_percent = {
    legend: { display: true, position: 'bottom', },
    interaction: { mode: 'index', axis: 'xy', Intersect: false },
    tooltips: { mode: 'index', axis: 'y' },
    plugins: {
        labels: { fontSize: 0 }
    },
    scales: {
        yAxes: [{
            suggestedMin: 0,

            ticks: {
                beginAtZero: true, 
                callback: function (value, index, values) {
                    return value + '%';
                }
            }
        }],
        xAxes: [
            { id: 'xAxis1', type: 'time', gridLines: { display: false }, time: { min: (new Date(+2020, 3, +25)).getTime(), displayFormats: { quarter: 'MMM YYYY' } } }
        ]
    }, hoverBackgroundColor: 'black'
}

options_Rt = {
    legend: { display: true, position: 'bottom', },
    tooltips: { mode: 'index', axis: 'y', intersect: true },
    scales: {
        yAxes: [{
            display: true,
            ticks: {
            }
        }],
        xAxes: [
            { id: 'xAxis1', type: 'time', gridLines: { display: false }, time: { displayFormats: { quarter: 'MMM YYYY' } } },
        ]
    }, hoverBackgroundColor: 'black'
}
