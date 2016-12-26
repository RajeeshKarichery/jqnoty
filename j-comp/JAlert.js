;(function( window ) {
	$(document).ready( function() {
		var alert = $("alert");
		var element = "<div id='mid'>Success</div>";
		$(document).on('click',"#mid", function(e) {
			$(this).css("background-color","red");
		});
		$(alert).append(element);
	});
	window.alert = alert;
 
})( window );