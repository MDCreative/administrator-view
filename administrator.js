var app = angular.module("app", ["firebase"]);

function hash(pass)
{
    var MAX_PASSWORD_LENGTH = 16;
    
    var charset = "qwertyaQWERTYUIOPZXCVBNMLKJHGFDSAsdfghzxcvbnuiopjklm1324657809_";
    var css = 63;
    
    var target = new Array(MAX_PASSWORD_LENGTH + 1).join('0').split('').map(parseFloat)
    var j = pass.length;
    
    var sum = j, tmp = 0, mod = 0;
    
    for(var i = 0; i < MAX_PASSWORD_LENGTH || i < j; i++)
    {
        mod = i % MAX_PASSWORD_LENGTH;
                
        tmp = (i >= j) ? (charset[(7 * i) % css]) : (pass[i]);
        sum = (sum + chrfind(tmp, charset) + 1) % css;
        
        target[mod] = charset[(sum + target[mod]) % css];
    }
    
    //target[MAX_PASSWORD_LENGTH] = '\0';
    
    return target.join('');
}
 
 
function chrfind(needle, haystack, start)
{
    if(typeof(start) === 'undefined')
        start = 0;
    
    while (haystack[start]) if (haystack[start++] == needle) return start - 1;
	return -1;
}

app.controller("AddCtrl", function($scope, $firebase) 
{
	$scope.addLecturer = function()
	{
	    //console.log($scope.name + ", " +  $scope.pass);
		$scope.mainRef = new Firebase("https://interactive-lecture.firebaseio.com/Test/Lecturer/");
		
		var sync = $firebase($scope.mainRef);
		
		var lecturer = {
			name: $scope.name,
			password: hash($scope.pass)
		};
		
		sync.$push(lecturer).then(function(v)
		{
		    console.log("hi " + v);
		});
		
		//$.extend(data, lastCoords);
		//$scope.mainRef.push(lecturer);
	};
});