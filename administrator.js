var app = angular.module("app", ["firebase"]);

var baseURL = "https://interactive-lecture.firebaseio.com/Test/f26b5/triad/";





var pie = new d3pie("pie", {
  data: {
    content: [ { label: "", value: 0.001 } ]
  },
  size: {
    pieInnerRadius: "60%"
  }
});

app.controller("pieCtrl", function($scope, $firebase)
{
    $scope.mainRef = new Firebase(baseURL);
    
    /*$scope.mainRef.on('child_added', function(snapshot)
    {
        console.log("hi")
        $scope.updatePie();    
    });*/
    
    $scope.updatePie = function()
    {
		$scope.mainRef.once('value', function(snapshot)
		{
		    var triadCount = 0;
		    var sums = {
		        x : 0,
		        y : 0,
		        z : 0
		    };
		    
		   snapshot.forEach(function(triad)
		   {
		       var triadValue = triad.val();
		    
		       if(triadValue.time < (new Date() - 100000*5)) 
		       {
		            sums.x += triadValue.x;
		            sums.y += triadValue.y;
		            sums.z += triadValue.z;
		       
		            triadCount++;
		       }
		   });
		   
		   var pieData = [
		       { label: "Too Fast",    value: sums.x / triadCount, color: '#9b59b6' },
    		   { label: "Enlightened", value: sums.y / triadCount, color: '#2980b9' },
    		   { label: "Confused",    value: sums.z / triadCount, color: '#2ecc71' }
		    ];
		    
		    pie.updateProp("data.content", pieData);
		});
		
		/*sync.$asObject().$loaded().then(function(data)
		{
		    console.log(data.x);
		
    		var pieData = [
    		    { label: "Enlightened", value: data.x },
    		    { label: "Too Fast",    value: data.y },
    		    { label: "Confused",    value: data.z }
    		];
    		
    		pie.updateProp("data.content", pieData);
		});*/
		
		
    };
    
    $scope.updatePie();
});

/*$(function() {
  var num = 4;
  $("#addData").on("click", function() {
    data.push({
      label: num.toString(),
      value: Math.floor(Math.random() * 10) + 1
    });

    pie.updateProp("data.content", data);
    num++;
  });
});*/