;( function( window ) {

  'use strict';
 
	function extend( a, b ) {
		for( var key in b ) { 
		  if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		  }
		}
		return a;
	}  
	
	var buttonArray	= { 'OK':
		{addClass: 'btn btn-primary', text: 'Ok', onClick: function($noty) {												
			$noty.close();		
			if(defaultConfirm.callback !=null){
				var _response = Object();
				_response.currentTarget = 'btnOk';
				if(defaultConfirm.target !=null)
					_response.target = defaultConfirm.target;
				return defaultConfirm.callback.call(this,_response);
			}					
		  }
		},
		'CANCEL':
		{addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty) {
			$noty.close();
			if(defaultConfirm.callback !=null){
				var _response = Object();
				_response.currentTarget = 'btnCancel';
				if(defaultConfirm.target !=null)
					_response.target = defaultConfirm.target;
				return defaultConfirm.callback.call(this,_response);
			}		
		  }
		}
	};
	
	var defaultAlert = {
             type:'information',	
			 theme  : 'relax',
			 layout: 'center',		
			 text: 'Alert!!',
			 target:null,
			 callback:null,
			 buttons:[ buttonArray['OK']]
        };    
	var defaultConfirm = {
             type:'warning',	
			 theme  : 'relax',
			 layout: 'center',		
			 text: 'Confirm?',
			 target:null,
			 callback:null,
			 buttons:[
					buttonArray['OK'],
					buttonArray['CANCEL']
				  ]
        };		
	var defaultToast = {
			 type:'information',	
			 theme  : 'relax',
			 layout: 'topRight',		
			 target:null,
			 callback:null
		};	
  
	
	  /**
	   * SimpleAlert 
	   */
	  function SimpleAlert( options ) { 			
			extend( defaultAlert, options );		
			return noty({
					  text:	defaultAlert.text,
					  type: defaultAlert.type,
					  layout: defaultAlert.layout,
					  buttons: defaultAlert.buttons
			});	   
	  }  
  
       /**
	   * SimpleConfirm 
	   */		
	  function SimpleConfirm( options ) {		
			extend( defaultConfirm, options );		
			return noty({
					  text:	defaultConfirm.text,
					  type: defaultConfirm.type,
					  layout: defaultConfirm.layout,		
					  buttons: defaultConfirm.buttons
			});	   
	  }  
	  /**
	   * SimpleToast 
	   */	
	  function SimpleToast(options){
			extend( defaultToast, options );		
			var n = noty({
					  type: defaultToast.type,	
					  layout: defaultToast.layout,		
					  text: defaultToast.text,				 
			});
			setTimeout(function () {			
				$.noty.close(n.options.id);
			}, 3000);
			return n;	
	  }  
	  window.SimpleAlert = SimpleAlert;
	  window.SimpleConfirm = SimpleConfirm;
	  window.SimpleToast = SimpleToast;

})( window );