// COMPONENT
//
// The building blocks for our SimpleAlert component.
////////////////////////////////////////////////////////////
;(function( window ) {

  'use strict';

  /**
   * SimpleAlert function
   */
  function SimpleAlert( message ) {
    this.message = message;
    this._init();
  }

  /**
   * Initialise the message
   */
  SimpleAlert.prototype._init = function() {
    this.component = document.getElementById("component");
    this.box = document.createElement("div");
    this.box.className = "simple-alert";
    this.box.innerHTML = this.message;
    this.component.appendChild( this.box );
    this._initUIActions;
  }

  SimpleAlert.prototype._initUIActions = function() {

  }

  /**
   * Add SimpleAlert to global namespace
   */
  window.SimpleAlert = SimpleAlert;

})( window );

// EVENTS
//
// The code for the creation of new object instances,
// depending on which button is pressed.
////////////////////////////////////////////////////////////
;(function() {

  /**
   * Show default
   */
  var default_btn = document.getElementById( "default" );
  default_btn.addEventListener( "click", function() {
    var default_alert = new SimpleAlert("Hello World!");
    default_alert;
  } );

  /**
   * Show success
   */
  var default_btn = document.getElementById( "success" );
  default_btn.addEventListener( "click", function() {
    var default_alert = new SimpleAlert("Success!!");
    default_alert;
  } );

  /**
   * Show error
   */
  var default_btn = document.getElementById( "error" );
  default_btn.addEventListener( "click", function() {
    var default_alert = new SimpleAlert("Error...");
    default_alert;
  } );

})();