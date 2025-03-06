$(document).mousemove((e) => {		  
  setClockPosition(e.pageX, e.pageY);
});

$(document).ready((e) => {	
	setClockPosition(e.pageX, e.pageY);
  
	setInterval(() => {
		var currentTime = new Date();
		var hours = currentTime.getHours();
		var minutes = currentTime.getMinutes();
		var seconds = currentTime.getSeconds();

		$('#follow-text').html((hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
	}, 1000);
});

function setClockPosition(posX, posY) {
	$('#follow-text').css({
		'left': posX += 10,
		'top': posY += 10,
		'position': 'absolute',
		'z-index': '99999'
  });
}