/*;( function( window ) {

  'use strict';
 
	function extend( a, b ) {
		for( var key in b ) { 
		  if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		  }
		}
		return a;
	}  	
	
	var defaults = {
             title:'MyTitle',	
			 template  : '<h1>Hello<h1>',
			 callback    : {
				beforeShow  : function () {
				},
				onShow      : function () {
				},
				afterShow   : function () {
				},
				onClose     : function () {
				},
				afterClose  : function () {
				},
				onCloseClick: function () {
				}
			  }			 
        };    
	
	 
	  function SimplePopUp( options ) { 			
			extend( defaults, options );	
			
			
			var mypop = $("#mypop");
			var element = '<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+defaults.title+'</h4></div>	<div class="modal-body">'+defaults.template+'</div><div class="modal-footer"><button id="btnClose" type="button" class="btn btn-default" >Close</button></div></div></div></div>';
					
			
			$(mypop).append(element);
			$('#myModal').on('show.bs.modal', function () {				
				if(defaults.callback.beforeShow != null){
					var _response = Object();					
					return defaults.callback.beforeShow.call(this,_response);
				}				
			});
			
			$('#myModal').on('hide.bs.modal', function () {
				if(defaults.callback.onClose != null){
					var _response = Object();					
					return defaults.callback.onClose.call(this,_response);
				}
			});
			
			$('#btnClose').on('click', function () {
				if(defaults.callback.onCloseClick != null){
					var _response = Object();					
					return defaults.callback.onCloseClick.call(this,_response);
				}
				else							
					$.fn.close();
			});
			$.fn.open();		   		
	  } 
	  
	  $.fn.open = function() {
		   $('#myModal').modal('show');
	  }	  
	  $.fn.close = function() {
		   $('#myModal').modal('hide');
	  }	   
	  window.SimplePopUp = SimplePopUp;
	  
})( window );*/


!function(root, factory) {
	 if (typeof define === 'function' && define.amd) {
		 define(['jquery'], factory);
	 } else if (typeof exports === 'object') {
		 module.exports = factory(require('jquery'));
	 } else {
		 factory(root.jQuery);
	 }
}(this, function($) {


if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {
    }

    F.prototype = o;
    return new F();
  };
}


$.rknoty         = {};
$.rknoty.returns = 'object';
$.rknoty.store   = {};

$.rknoty.defaults = {
  text        : '',
  template    : '<div class="alert "><span class="rknoty_text"></span> <button type="button" class="close" >&times;</button> </div>',
  callback:function(){}
  /*callback    : {
				beforeShow  : function () {
				},
				onShow      : function () {
				},
				afterShow   : function () {
				},
				onClose     : function () {
				},
				afterClose  : function () {
				},
				onCloseClick: function () {
				}
			  }*/		
};




var rknotyObject = {
  init: function (options) {
	this.options = $.extend({}, $.rknoty.defaults, options);
	var mypop = $("#mypop");
			var element = '<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"></h4></div>	<div class="modal-body"></div><div class="modal-footer"><button id="btnClose" type="button" class="btn btn-default" >Close</button></div></div></div></div>';				
			
			$(mypop).append(element);			
	
		
		$('#btnClose').on('click', function () {
			
			if($.rknoty.defaults.callback != null){
				var _response = Object();					
				return $.rknoty.defaults.callback.apply(this);
			}
			else							
				$.rknotyRenderer.close();
		});		
			
  }, 
  show: function () { 
  }, // end show  
  close: function () {
  }, // end close 

  setText: function (text) {    
  },

  stopPropagation: function (evt) {
    evt = evt || window.event;
    if (typeof evt.stopPropagation !== "undefined") {
      evt.stopPropagation();
    }
    else {
      evt.cancelBubble = true;
    }
  },
  closed : false,
  showing: false,
  shown  : false

}; // end NotyObject

$.rknotyRenderer = {};

$.rknotyRenderer.init = function (options) {
   var notification = Object.create(rknotyObject).init(options);
   $.rknotyRenderer.show(notification);
};

$.rknotyRenderer.show = function (notification) {
	$('#myModal').modal('show');	 
};

$.rknotyRenderer.close = function () {	
	$('#myModal').modal('hide');	 
};




			


// Helpers
window.rknoty = function rknoty(options) {
  return $.rknotyRenderer.init(options);
};


return window.rknoty;

});
