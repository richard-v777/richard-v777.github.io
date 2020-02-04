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
   dummy : ""},
  {name: "machine",
  n: 14,
   dummy : ""},
  {name: "other",
  n: 11,
   dummy : ""},
  {name: "thermal",
  n:4,
   dummy : ""},
  {name: "electrical",
  n:4,
   dummy : ""},
  {name: "vehicle",
  n:2,
   dummy : ""}
];

// assign some numbers to STATS object
for (i=0; i < STATS[0].subcategories.length; i++){
	x = STATS[0].subcategories[i];
	n = x.n;
	STATS[0].subcategories[i].data = randomPartition(n, 36);	
}
STATS[0].data = STATS[0].subcategories[0].data.slice(); // shallow copy
for (i=1; i < STATS[0].subcategories.length; i++){
	for (j=0; j < 36; j++){
		STATS[0].data[j] += STATS[0].subcategories[i].data[j];
	}
}
for (var i=0; i < STATS.length; i++){
	STATS[i].data = randomPartition(STATS[i].n, 36);
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
