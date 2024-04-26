google.load('visualization', '1.0', {'packages':['corechart']});
google.setOnLoadCallback(drawChart);

function drawChart() {

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'n');
    data.addColumn('number', 'O(1)');
    data.addColumn('number', 'O(log n)');
    data.addColumn('number', 'O(n)');
    data.addColumn('number', 'O(n log n)');
    data.addColumn('number', 'O(n^2)');
    data.addColumn('number', 'O(2^n)');
    //data.addColumn('number', 'O(n!)');

    for (let i = 0; i <= 30; i++) {
        data.addRow([i+'', 1, Math.log(i), i, Math.log(i)*i, Math.pow(i,2), Math.pow(2,i)]);
    }

    const options = {
        'width':700,
        'height':600,
        'backgroundColor':{stroke:'#CCC',strokeWidth:1},
        'curveType':'function',
        'legend': { position: 'right'},
        'hAxis':{
            title:'Elements (n)',
            showTextEvery:5
        },
        'vAxis':{
            title:'Operations',
            viewWindowMode:'explicit',
            viewWindow:{min:0,max:300}
        }
    };

    const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}