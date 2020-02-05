var makeBarChart = function(chartData, canvasName, chartName){
	
	var labels = ["2017"];
	var year = 2018;
	for (var i=1; i < 36; i++){
		if (i%12 != 0){
		  labels.push("");
		} else {
		  labels.push("" + year);
		  year += 1;
		}
	}
	//console.log(labels);
	
	/* add code to create the yearly line chart here */
	var yearlyAvg = [];
	var total = 0;
	for (var i=0; i < chartData.length; i++){
		total += chartData[i];
		if ((i+1)%12 == 0){
			yearlyAvg.push(total);
			total = 0;
		}
	}
	console.log(yearlyAvg);
	
window[chartName] = new Chart(document.getElementById(canvasName).getContext("2d"), {
  type: "bar",
  data: { 

    labels: labels,
    datasets: [
	  	  {
		  data: chartData,
		  //xaxisID: "year-mid"
	  },
	  {  
	    type: 'scatter',
	    data: [{"x":5.5, "y":yearlyAvg[0]},{"x":17.5, "y":yearlyAvg[1]}, {"x":29.5, "y":yearlyAvg[2]}],
		xAxisID: "year-mid",
		lineTension: 0,
		fill: false,
		borderRadius: 6,
		borderColor: 'rgba(0, 0, 200, 0.2)'
	  }
	],
  },
  options: {
    maintainAspectRatio: true,
    responsive: true,
	legend: {
	  display: false
	  },
	scales: {
      xAxes: [{
    		  gridLines: {
                color: "rgba(0, 0, 0, 0)",
            }
	  },
	  {
		  id: 'year-mid',
		  position: 'bottom',
		  type: 'linear',
		  ticks: {
			  beginAtZero: true,
			  stepSize: 1,
			  max: 36
		  },
		  display: false,
		  gridLines: {
               color: "rgba(0, 0, 0, 0)",
          }
	  }],
	  yAxes: [{
        //display: false,
        ticks: {
          min: 0
          },
		  gridLines: {
                color: "rgba(0, 0, 0, 0.05)",
				z : -99
            },
		  ticks: {
			  stepSize: 1
		  }
        }]
	  }
	}
});

}

makeBarChart(STATS[0].data, "mainBarChart", "exampleBarChart");
// for some reason, it is only showing one bar
