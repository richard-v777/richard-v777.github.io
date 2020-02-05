var rsimplex = function(n){
  y = []
  total = 0
  for (var i=0; i<n; i++){
    yi = -Math.log(Math.random())
    y.push(yi)
	total += yi
  }
  for (var i=0; i<n; i++){
    y[i] = y[i] / total
  }
  return(y)
}

var randomPartition = function(n, nparts){
	// get a random paritition with nparts which add up to n (parts are nonnegative and can be zero)
	var dividers = [0];
	for (var i=0; i < nparts-1; i++){
		dividers.push(Math.floor(Math.random()*(n+1)));
	}
	dividers.push(n);
	dividers.sort(function(a, b){return a-b});
	//console.log(dividers);
	var out = [];
	for (var i=1; i < nparts+1; i++){
		out.push(dividers[i] - dividers[i-1]);
	}
	return(out);
};

var PALLETTE = ["#ED6A5A", "#B7B7B7", "#85C7F2", "#9BC1A3", "#4C4C4C", "#FFF200", "#FFAE00", "#8C416F"];

var STATS = [
  {name: "gravitational", 
   n: 44,
   subcategories: [
       {name: "Person damaged by falling object",
        n: 15
       },
       {name: "Fall of a person to a lower level",
        n: 12
       },
       {name: "Slips and trips",
        n: 11
       },
       {name: "Other",
        n: 6
       } 
     ]
   },
  {name: "human",
  n: 21,
   dummy : "",
   subcategories: [
     {name: "dummy1",
     n: 11},
	 {name: "dummy2",
	 n:10}
   ]},
  {name: "machine",
  n: 14,
   dummy : "",
      subcategories: [
     {name: "dummy1",
     n: 7},
	 {name: "dummy2",
	 n:7}
   ]},
  {name: "other",
  n: 11,
   dummy : "",   
   subcategories: [
     {name: "dummy1",
     n: 6},
	 {name: "dummy2",
	 n:5}
   ]},
  {name: "thermal",
  n:4,
   dummy : "",
      subcategories: [
     {name: "dummy1",
     n: 2},
	 {name: "dummy2",
	 n:2}
   ]},
  {name: "electrical",
  n:4,
   dummy : "",
      subcategories: [
     {name: "dummy1",
     n: 2},
	 {name: "dummy2",
	 n:2}
   ]},
  {name: "vehicle",
  n:2,
   dummy : "",
      subcategories: [
     {name: "dummy1",
     n: 1},
	 {name: "dummy2",
	 n: 1}
   ]}
];

// assign some numbers to STATS object

for (var k=0; k < STATS.length; k++){
	for (var i=0; i < STATS[k].subcategories.length; i++){
		var x = STATS[k].subcategories[i];
		console.log(x);
		var n = x.n;
		STATS[k].subcategories[i].data = randomPartition(n, 36);	
	}
	STATS[k].data = STATS[k].subcategories[0].data.slice(); // shallow copy
	for (var j=0; j < 36; j++){
	    for (var z=1; z < STATS[k].subcategories.length; z++){
			STATS[k].data[j] += STATS[k].subcategories[z].data[j];
			//console.log(STATS[k].data);
		}
	}
}

//calculate maximum number of subcategories
var MAX_SUBCATEGORIES = 1;
for (var i=0; i < STATS.length; i++){
	var total = 0;
	for (var j=0; j < STATS[i].subcategories.length; j++){
		total += 1;
	}
	if (total > MAX_SUBCATEGORIES){
		MAX_SUBCATEGORIES = total;
	}
}

var SELECTION = 0; //the currently selected energy type, index in STATS object
