// add divs to breakdown
for (var i=0; i < MAX_SUBCATEGORIES; i++){
	var div = document.createElement("div");
	var breakdownDiv = document.getElementById("breakdown");
	
	//div.style.backgroundColor = "red";
	//div.style.padding = "10px";
	div.style.margin = "1px 1px 1px 1px";
	div.setAttribute("id" ,"breakdownRow_" + i);
	div.style.display = "flex";
	div.style.flexDirection = "row";
	
	var leftDiv = document.createElement("div");
	//leftDiv.style.border = "1px solid black";
	leftDiv.setAttribute("id", "breakdownRow_" + i + "_leftBar");
	leftDiv.style.width = "100px";
	div.append(leftDiv);
	leftDiv.style.padding = "2px";
	
	var canvasHolder = document.createElement("div");
	canvasHolder.class = "canvas-holder";
	div.append(canvasHolder);
	
	var canvas = document.createElement("canvas");
	canvas.setAttribute("id", "subBarChart_" + i);
	//canvas.style.border = "1px solid black";
	canvas.height = "100";
	canvas.width = "400";
	canvasHolder.append(canvas);
	 
    breakdownDiv.append(div);
}

for (var i=0; i < MAX_SUBCATEGORIES; i++){
	makeBarChart([0], "subBarChart_" + i, "subBarChart_" + i);
}

//left bar interaction
document.getElementById("leftBar").onclick = function(){
	for (var i=0; i < STATS[SELECTION].subcategories.length; i++){
		//var cvs = document.getElementById("subBarChart_" + i);
		//makeBarChart(STATS[SELECTION].subcategories[i].data, "subBarChart_" + i, "subBarChart_" + i);
		var data = STATS[SELECTION].subcategories[i].data;
		window["subBarChart_" + i].data.datasets[0].data = data;
		//window["subBarChart_" + i].update();
		/* update line chart here
		
		*/
		var yearlyAvg = [];
	    var total = 0;
	    for (var j=0; j < data.length; j++){
		    total += data[j];
		    if ((j+1)%12 == 0){
			    yearlyAvg.push(total);
			    total = 0;
		    }
	    }
	    window["subBarChart_" + i].data.datasets[1].data = [{"x":5.5, "y":yearlyAvg[0]},{"x":17.5, "y":yearlyAvg[1]}, {"x":29.5, "y":yearlyAvg[2]}];
	    window["subBarChart_" + i].update();
		
		document.getElementById("breakdownRow_" + i).style.display = "flex";
		document.getElementById("breakdownRow_" + i + "_leftBar").innerHTML = STATS[SELECTION].subcategories[i].name +
		  "<br>n = " + STATS[SELECTION].subcategories[i].n;
		document.getElementById("breakdownRow_" + i + "_leftBar").style.width = "100px";
		document.getElementById("breakdownRow_" + i + "_leftBar").style.backgroundColor = PALLETTE[SELECTION];
		
	}
	for (var j = STATS[SELECTION].subcategories.length; j < MAX_SUBCATEGORIES; j++){
		document.getElementById("breakdownRow_" + j).style.display = "none";
	}
	document.getElementById("treemap").style.display = "none";
	document.getElementById("oneCategory").style.display = "none";
	document.getElementById("breakdown").style.display = "flex";
};

//title text interaction
document.getElementById("titleBar").onclick = function(){
	if (document.getElementById("oneCategory").style.display === "flex"){
		document.getElementById("oneCategory").style.display = "none";
		document.getElementById("breakdown").style.display = "none";
		document.getElementById("treemap").style.display = "flex";
	} else if (document.getElementById("breakdown").style.display === "flex"){
	    document.getElementById("breakdown").style.display = "none";
		document.getElementById("oneCategory").style.display = "flex"
		document.getElementById("treemap").style.display = "none";
		console.log("clicked once");
	}
}
