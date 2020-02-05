var ctx = document.getElementById("treemap-canvas").getContext("2d");
window.treemap = new Chart(ctx, {
  type: "treemap",
  data: {
    datasets: [
      {
        //label: ["a", "b", "c", "d", "e", "f", "g"],
        //data: [44, 21, 14, 11, 4, 4, 2],
		tree: STATS,
		key : "n",
		groups: ["name"],
		//title : ["name"],
		fontSize: 10,
		fontColor: "white",
		//textAlign: "left",
		position: top,
        backgroundColor: PALLETTE.slice(0,7),
        spacing: 1,
        borderWidth: 0,
        borderColor: "rgba(180,180,180, 0.15)"
      }
    ]
  },
  options: {
    onClick : function(evt){
	  var activePoints = treemap.getElementAtEvent(evt);
	  var idx = activePoints[0]._index;
	  var data = activePoints[0]._chart.data.datasets[0].tree[idx];
	  console.log(data.data);
	  SELECTION = idx;
	  window.exampleBarChart.data.datasets[0].data = data.data;
	  /* update the line chart data too */
	  var yearlyAvg = [];
	  var total = 0;
	  for (var i=0; i < data.data.length; i++){
		total += data.data[i];
		if ((i+1)%12 == 0){
			yearlyAvg.push(total);
			total = 0;
		}
	  }
	  window.exampleBarChart.data.datasets[1].data = [{"x":5.5, "y":yearlyAvg[0]},{"x":17.5, "y":yearlyAvg[1]}, {"x":29.5, "y":yearlyAvg[2]}];
	  window.exampleBarChart.update();
	  document.getElementById("leftBar").style.backgroundColor = PALLETTE[SELECTION];
	  document.getElementById("leftBar").innerHTML = STATS[idx].name + "<br>n = " + STATS[idx].n;
	  
	  document.getElementById("treemap").style.display = "none";
	  document.getElementById("oneCategory").style.display = "flex";
	  document.getElementById("breakdown").style.display = "none";
	  }, 
    events: ['click'],
    maintainAspectRatio: true,
	responsive: true,
    title: {
      display: true,
      text: "Basic treemap sample"
    },
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        title: function(item, data) {
          return '';
        },
        label: function(item, data) {
          var dataset = data.datasets[item.datasetIndex];
          var dataItem = dataset.data[item.index];
          return dataItem.v;
        }
      }  
    }    
  }
});
