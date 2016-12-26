;(function( window ) {

  'use strict';
  
  
  /**
   * SimpleAlert function
   */
  function SimpleAlert(type, message ) {
	this.type = type;
    this.message = message;
	this._init();
  }

  /**
   * Initialise the message
   */
   SimpleAlert.prototype._init = function() {
    console.log(this.message);
	this.component = document.getElementById("component");
	this.box = document.createElement("div");
	this.box.innerHTML ="";
	if(this.type == "success")
		this.box.className = "alert alert-success";
	else if(this.type == "info")	
		this.box.className = "alert alert-info";
	else if(this.type == "warning")	
		this.box.className = "alert alert-warning";	
		
	
    this.box.innerHTML = this.message;
    this.component.appendChild( this.box );
	this._initUIActions();
	
  }
  
  SimpleAlert.prototype._initUIActions = function() {
  
	   /**
	   * Show info
	   */
	  var default_btn = document.getElementById( "info" );
	  default_btn.addEventListener( "click", function() {
		//var default_alert = new SimpleAlert("info","Hello World!");
		//default_alert;
		console.log("am clicked");
	  } );
	  
	  
	 /**
	   * Show success
	   */
	  var default_btn = document.getElementById( "success" );
	  default_btn.addEventListener( "click", function() {
		var default_alert = new SimpleAlert("success","Success!!");
		default_alert;
	  } );

	  /**
	   * Show warning
	   */
	  var default_btn = document.getElementById("warning" );
	  default_btn.addEventListener( "click", function() {
		var default_alert = new SimpleAlert("warning","warning...");
		default_alert;
	  } );
  
  

  }
  
  // rest of code here...

  /**
   * Add SimpleAlert to global namespace
   */
  window.SimpleAlert = SimpleAlert;
  
  
  
  

})( window );


