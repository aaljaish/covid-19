function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Promise.all([
    d3.csv("exportDashboard.csv")]).then(function (files) {

        data = files[0]; dataLength = data.length;

        let newCasesDate = []; let newCases = []; let newCasesRolling = [];
        let totalCasesDate = []; let totalCases = [];
        let statusDate = []; let statusDeath = []; let statusHospital = []; let statusICU = []; let statusVent = [];
        let statusCumDate = []; let statusCumDied = []; let statusCumRecovered = []; let statusCumCases = []; let statusCumActive = [];
        let ontarioRateDate = []; let ontarioRate = []; let canadaRateDate = []; let canadaRate = [];
        let ontarioDeathRateDate = []; let ontarioDeathRate = []; let canadaDeathRateDate = []; let canadaDeathRate = [];
        let Rt = []; let RtHigh = []; let RtLow = []; let rtDate = [];
        let mobilityDate = []; let mobilityGrocPharm = []; let mobilityRetailRec = []; let mobilityWorkplace = [];
        let testDate = []; let testNew = []; let testRollingNew = []; let testPctPostive = [];
        let dashboardSummary = [];
        let barColor = 'rgb(54, 162, 235,0.5)';

        for (i = 0; i < dataLength; i++) {

            if (data[i]['testDate'] != "") {
                textDate = data[i]['testDate'].split('-')
                testDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                testNew.push(parseInt(data[i]['testNew']));
                testRollingNew.push(parseInt(data[i]['testRollingNew']));
                testPctPostive.push(Math.round(parseFloat(data[i]['testPctPostive']) * 1000) / 10);
            }

            if (data[i]['newCasesDate'] != "") {
                textDate = data[i]['newCasesDate'].split('-')
                newCasesDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                newCases.push(parseInt(data[i]['newCases']));
                newCasesRolling.push(parseInt(data[i]['newCasesRolling']));
            }

            if (data[i]['totalCasesDate'] != "") {
                textDate = data[i]['totalCasesDate'].split('-')
                totalCasesDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                totalCases.push(parseInt(data[i]['totalCases']));
            }

            if (data[i]['statusDate'] != "") {
                textDate = data[i]['statusDate'].split('-')
                statusDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                statusHospital.push(parseInt(data[i]['statusHospital']));
                statusICU.push(parseInt(data[i]['statusICU']));
                statusVent.push(parseInt(data[i]['statusVent']));
                statusDeath.push(parseInt(data[i]['statusDeath']));
            }

            if (data[i]['statusCumDate'] != "") {
                textDate = data[i]['statusCumDate'].split('-')
                statusCumDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                statusCumDied.push(parseInt(data[i]['statusCumDied']));
                statusCumRecovered.push(parseInt(data[i]['statusCumRecovered']));
                statusCumActive.push(parseInt(data[i]['statusCumCases']) - parseInt(data[i]['statusCumDied']) - parseInt(data[i]['statusCumRecovered']));
            }

            if (data[i]['ontarioRateDate'] != "") {
                textDate = data[i]['ontarioRateDate'].split('-')
                ontarioRateDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                ontarioRate.push(parseInt(data[i]['ontarioRate']));
            }

            if (data[i]['canadaRateDate'] != "") {
                textDate = data[i]['canadaRateDate'].split('-')
                canadaRateDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                canadaRate.push(parseInt(data[i]['canadaRate']));
            }

            if (data[i]['ontarioDeathRateDate'] != "") {
                textDate = data[i]['ontarioDeathRateDate'].split('-')
                ontarioDeathRateDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                ontarioDeathRate.push(parseFloat(data[i]['ontarioDeathRate']));
            }

            if (data[i]['canadaDeathRateDate'] != "") {
                textDate = data[i]['canadaDeathRateDate'].split('-')
                canadaDeathRateDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                canadaDeathRate.push(parseFloat(data[i]['canadaDeathRate']));
            }

            if (data[i]['rtDate'] != "" & data[i]['rtDate'] > '2020-09-01') {
                textDate = data[i]['rtDate'].split('-')
                rtDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                Rt.push(parseFloat(data[i]['Rt']));
                RtLow.push(parseFloat(data[i]['RtLow']));
                RtHigh.push(parseFloat(data[i]['RtHigh']));
            }

            if (data[i]['mobilityDate'] != "") {
                textDate = data[i]['mobilityDate'].split('-')
                mobilityDate.push(new Date(+textDate[0], textDate[1] - 1, +textDate[2]));
                mobilityGrocPharm.push(parseInt(data[i]['mobilityGrocPharm']));
                mobilityRetailRec.push(parseInt(data[i]['mobilityRetailRec']));
                mobilityWorkplace.push(parseInt(data[i]['mobilityWorkplace']));
            }
        }

        arrayList = [totalCases, statusCumDied, statusCumRecovered, statusCumActive, statusHospital, statusICU, statusVent]
        for (i = 0; i < arrayList.length; i++) {
            dashboardSummary.push(numberWithCommas(arrayList[i][arrayList[i].length - 1]))
        }

        const dashNewCases = newCases[newCases.length - 1];
        const dashDeath = statusDeath[statusDeath.length - 1];
        const dashRecovered = statusCumRecovered[statusCumRecovered.length - 1] - statusCumRecovered[statusCumRecovered.length - 2];
        const dashActive = statusCumActive[statusCumActive.length - 1] - statusCumActive[statusCumActive.length - 2];
        const dashHospital = statusHospital[statusHospital.length - 1] - statusHospital[statusHospital.length - 2];
        const dashICU = statusICU[statusICU.length - 1] - statusICU[statusICU.length - 2]
        const dashVent = statusVent[statusVent.length - 1] - statusVent[statusVent.length - 2];
        const dashRt = (Rt[Rt.length - 1] - Rt[Rt.length - 2])

        let dashList = [dashNewCases, dashDeath, dashRecovered, dashActive, dashHospital, dashICU, dashVent, dashRt]

        paragraphID = ['p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18'];
        for (i = 0; i < paragraphID.length; i++) {
            document.getElementById(paragraphID[i]).appendChild(document.createTextNode(dashboardSummary[i]));
        }

        document.getElementById('p19').appendChild(document.createTextNode(`${Rt[Rt.length - 1]} (${RtLow[Rt.length - 1]}, ${RtHigh[Rt.length - 1]})`));


        paragraphID = ['p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27'];
        for (i = 0; i < paragraphID.length; i++) {
            if (dashList[i] < 0) {
                document.getElementById(paragraphID[i]).innerHTML = `&#x2193 ${numberWithCommas((Math.abs(Math.round(dashList[i] * 100) / 100)))}`;
            } else {
                document.getElementById(paragraphID[i]).innerHTML = `&#x2191 ${numberWithCommas((Math.abs(Math.round(dashList[i] * 100) / 100)))}`;
            }

        }

        document.getElementById('p1').appendChild(document.createTextNode(numberWithCommas(newCases[newCases.length - 1])));
        document.getElementById('p2').appendChild(document.createTextNode(numberWithCommas(totalCases[totalCases.length - 1])));
        document.getElementById('p4').appendChild(document.createTextNode(numberWithCommas(canadaRate[canadaRate.length - 1])));
        document.getElementById('p5').appendChild(document.createTextNode(numberWithCommas(ontarioRate[ontarioRate.length - 1])));
        document.getElementById('p6').appendChild(document.createTextNode(canadaDeathRate[canadaDeathRate.length - 1]));
        document.getElementById('p7').appendChild(document.createTextNode(ontarioDeathRate[ontarioDeathRate.length - 1]));
        document.getElementById('p8').appendChild(document.createTextNode(`${Rt[Rt.length - 1]} (${RtLow[Rt.length - 1]}, ${RtHigh[Rt.length - 1]})`));
        document.getElementById('p9').appendChild(document.createTextNode(`Note: Rt is the effective reproductive rate. An Rt of ${Rt[Rt.length - 1]} means that 
        100 individuals with COVID-19 will typically infect ${Math.round(100 * Rt[Rt.length - 1])} people. We expect the number of cases to rise when the Rt is greater than 1.00.`));
        document.getElementById('p10').appendChild(document.createTextNode(numberWithCommas(testNew[testNew.length - 1])));
        document.getElementById('p11').appendChild(document.createTextNode(`${testPctPostive[testPctPostive.length - 1]}%`));

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        // Graph of Reported Daily Cases 
        var ctx = document.getElementById('newCasesChart').getContext('2d');
        var newCasesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: newCasesDate,
                datasets: [{ label: `New cases`, xAxisID: 'xAxis1', data: newCases, borderWidth: 1, borderColor: barColor, backgroundColor: barColor },
                {
                    label: '7-day average', data: newCasesRolling, type: 'line', fill: false, borderWidth: 3, backgroundColor: 'white',
                    borderColor: 'rgba(0, 0, 0, 0.6)', pointRadius: 0
                }]
            },
            options: options_number
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        // Graph of Total Reported Cases 
        var ctx = document.getElementById('totalCasesChart').getContext('2d');
        var totalCasesChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: totalCasesDate,
                datasets: [{ label: `Total cases`, xAxisID: 'xAxis1', data: totalCases, borderWidth: 1, borderColor: barColor, backgroundColor: barColor },]
            },
            options: options_number
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        // Graph of new hospital, ICU, ventilation, and deaths 
        var ctx = document.getElementById('statusChart').getContext('2d');
        var statusChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: statusDate,
                datasets: [
                    { label: `Hospitalized`, data: statusHospital, backgroundColor: 'rgb(54, 162, 235, 0.15)' },
                    { label: `ICU`, data: statusICU, backgroundColor: 'rgb(54, 162, 235, 0.35)' },
                    { label: `ICU + Vent`, data: statusVent, backgroundColor: 'rgb(54, 162, 235, 0.65)' },
                    { label: `Died`, data: statusDeath, backgroundColor: 'rgb(54, 162, 235, 0.95)' },
                ]
            },
            options: options_category
        });


        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        // Cumulative counts of deaths and recovered
        var ctx = document.getElementById('statusCumChart').getContext('2d');
        var statusChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: statusCumDate,
                datasets: [
                    { label: `Recovered`, data: statusCumRecovered, backgroundColor: 'rgb(54, 162, 235, 0.15)' },
                    { label: `Active`, data: statusCumActive, backgroundColor: 'rgb(54, 162, 235, 0.35)' },
                    { label: `Died`, data: statusCumDied, backgroundColor: 'rgb(54, 162, 235, 0.65)' },
                ]
            },
            options: options_category
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        // Comparing new cases for Ontario vs. Canada
        var ctx = document.getElementById('ontarioCanadaRate').getContext('2d');
        var ontarioCanadaRate = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ontarioRateDate,
                datasets: [{
                    label: `Ontario`, xAxisID: 'xAxis1', data: ontarioRate, type: 'line', fill: true, borderWidth: 3, borderColor: 'rgb(54, 162, 235, 0.85)', backgroundColor: 'rgb(54, 162, 235, 0.15)',
                    pointRadius: 0
                },
                {
                    label: 'Canada', data: canadaRate, type: 'line', fill: true, borderWidth: 3, backgroundColor: 'rgb(0, 0, 0, 0.05)',
                    borderColor: 'rgb(0, 0, 0, 0.35)', pointRadius: 0
                }]
            },
            options: options_number
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////

        // Comparing new deaths for Ontario vs. Canada
        var ctx = document.getElementById('ontarioCanadaDathRate').getContext('2d');
        var ontarioCanadaDathRate = new Chart(ctx, {
            type: 'line',
            data: {
                labels: canadaDeathRateDate,
                datasets: [{
                    label: `Ontario`, xAxisID: 'xAxis1', data: ontarioDeathRate, type: 'line', fill: true, borderWidth: 3, borderColor: 'rgb(54, 162, 235, 0.85)', backgroundColor: 'rgb(54, 162, 235, 0.15)',
                    pointRadius: 0
                },
                {
                    label: 'Canada', data: canadaDeathRate, type: 'line', fill: true, borderWidth: 3, backgroundColor: 'rgb(0, 0, 0, 0.05)',
                    borderColor: 'rgb(0, 0, 0, 0.35)', pointRadius: 0
                }]
            },
            options: options_number
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////            
        
        // Daily reproductive rate
        var ctx = document.getElementById('RtChart').getContext('2d');
        var RtChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: rtDate,
                datasets: [{
                    label: `Rt`, xAxisID: 'xAxis1', data: Rt, type: 'line', fill: false, borderWidth: 3, borderColor: 'rgb(54, 162, 235, 0.85)', backgroundColor: 'rgb(0, 0, 0, 0.10)',
                    pointRadius: 0
                },
                {
                    label: 'Lower', data: RtLow, type: 'line', fill: false, borderWidth: 3, backgroundColor: 'rgb(0, 0, 0, 0.10)',
                    borderColor: 'rgb(0, 0, 0, 0.10)', pointRadius: 0
                },
                {
                    label: 'Upper', data: RtHigh, type: 'line', fill: false, borderWidth: 3, backgroundColor: 'rgb(0, 0, 0, 0.10)',
                    borderColor: 'rgb(0, 0, 0, 0.10)', pointRadius: 0
                }]
            },
            options: options_Rt
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////        

        // Mobility chart from Google
        var ctx = document.getElementById('mobilityChart').getContext('2d');

        var mobilityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: mobilityDate,
                datasets: [
                    {
                        label: `Retail and Recreation`, xAxisID: 'xAxis1', data: mobilityRetailRec, borderDash: [3, 3], type: 'line', fill: false, borderWidth: 3, borderColor: 'rgb(54, 162, 235, 1.00)', backgroundColor: 'white',
                        pointRadius: 0
                    },
                    {
                        label: 'Groceries and Pharmacies', data: mobilityGrocPharm, type: 'line', fill: false, borderWidth: 3, backgroundColor: 'white',
                        borderColor: 'rgb(54, 162, 235, 0.65)', pointRadius: 0
                    },
                    {
                        label: 'Workplaces', data: mobilityWorkplace, borderDash: [5, 5], type: 'line', fill: false, borderWidth: 3, backgroundColor: 'white',
                        borderColor: 'rgb(54, 162, 235, 0.25)', pointRadius: 0
                    }]
            },
            options: options_percent
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////   

        // Number of tests conducted daily 
        var ctx = document.getElementById('testsChart').getContext('2d');

        var testsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: testDate,
                datasets: [{ label: `Daily tests`, xAxisID: 'xAxis1', data: testNew, borderWidth: 1, borderColor: barColor, backgroundColor: barColor },
                {
                    label: '7-day average', data: testRollingNew, type: 'line', fill: false, borderWidth: 3, backgroundColor: 'white',
                    borderColor: 'rgba(0, 0, 0, 0.6)', pointRadius: 0
                }]
            },
            options: options_number
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////  

        // Daily positivity rate 
        var ctx = document.getElementById('positivityChart').getContext('2d');

        var testsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: testDate,
                datasets: [{ label: `Percent positivity`, xAxisID: 'xAxis1', data: testPctPostive, borderWidth: 1, borderColor: barColor, backgroundColor: barColor }]
            },
            options: options_percent
        });

        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////  
    });