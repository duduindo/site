

var slideMenuMove = function()
{	
	if( window.slideTouchStart <= 30 ) {
		
		if( window.slideTouchMove > 40 ) {			
			document.getElementById("navigator").style.left = "0px";
		}

		return false;
	}

	if( (window.slideTouchStart-20) > window.slideTouchMove ) {		
		document.getElementById("navigator").style.left = "-180px";
	}
}


document.addEventListener('touchstart', function(event){
	window.slideTouchStart = event.targetTouches[0].clientX;
}, false);

document.addEventListener('touchmove', function(event){	
	window.slideTouchMove = event.targetTouches[0].clientX;
	
	slideMenuMove();	
}, false);


document.addEventListener('touchend', function(event){

	//window.slideTouchEnd = event.changedTouches[0].clientX;
	delete window.slideTouchStart;
	delete window.slideTouchMove;
	delete window.slideTouchEnd;
}, false);