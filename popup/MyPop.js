;( function( window ) {

	'use strict';
	 	  		 		  
		$.pops         = {};
		$.pops.defaults = {
			size     : 'modal-md',
			layout	 : 'vertical',
			title    : 'Title',  	
			template    : '<h3>Body</h3>',  
			callback    : {
						beforeShow  : null,
						onShow      : null,
						afterShow   : null,
						onClose     : null,
						afterClose  : null,
						onCloseClick: null,
						onSubmitClick: null
					  },
			buttons:{				
				save:{
					isShow:false,
					type:'submit',
					text:'Save',
					addClass:'primary'
				}
			}
				
		};
		var popsObject = {
			init: function (options) {
				this.options = $.extend({}, $.pops.defaults, options);
				this._build();
				return this;
			},
			_build: function () {	
				var size  = this.options.size;
				console.log(size);
		  
				var element = '<span class="pops_replace">';
				element	   += '<div class="modal fade" id="popsModal" role="dialog"  tabindex="-1" >';
				element    += '<div class="modal-dialog '+this.options.size+' "><div class="modal-content">';
				element    += '<div class="modal-header">';
				element    += '<button type="button" id="btn-x-close" class="close" data-dismiss="modal">&times;</button>';
				element    += '<h4 class="modal-title"><span class="pops_text"></span></h4>';
				element    += '</div>';
				element    += '<form id="frm-pops" class="form-'+this.options.layout+'">';
				element    += '<div class="modal-body">';				
					element    += '<span class="pops_body"></span>';				 				
				element    += '</div>';
				element    += '<div class="modal-footer">';
					var btn_class,btn_type;
					if(this.options.buttons){
						if(this.options.buttons.save.isShow){
							btn_class ='primary';
							btn_type ='submit';							
							if(this.options.buttons.save.addClass)
								btn_class = this.options.buttons.save.addClass;
							if(this.options.buttons.save.type)
								btn_type = this.options.buttons.save.type;
							element += '<button id="btnSave" type="'+btn_type+'" class="btn btn-'+btn_class+'" >'+this.options.buttons.save.text+'</button>';
						}					
					}
					
				element  += '<button id="btnClose" type="button" class="btn btn-default" >Close</button>';
				element    += '</div></form></div></div></div>';
				element    += '</span>';
				
				var $popUp = $(element);
				$popUp.find('.pops_text').html(this.options.title);
				$popUp.find('.pops_body').html(this.options.template);
				this.$popUp = $popUp;						
				if($("span").hasClass("pops_replace")){
					$('span').remove('.pops_replace');
				}
				$('body').append($popUp);
								
				var self = this;							
				$('#btnClose').on('click', function (evt) {				
					if(self.options.callback.onCloseClick){				
						return self.options.callback.onCloseClick.apply(self); 							
					}
					else	
						self.close();
				});
				
				$('#btn-x-close').on('click', function (evt) {			
					if(self.options.callback.onClose){
						evt.stopPropagation();
						return self.options.callback.onClose.apply(self);
					}
					else
						self.close();
				});				
							
				if(self.options.callback.beforeShow)
				  self.options.callback.beforeShow.apply(self);	
				if(self.options.callback.onShow)
				  self.options.callback.onShow.apply(self);	  
				if(self.options.callback.afterShow)
				  self.options.callback.afterShow.apply(self);	
				if(self.options.callback.afterClose)
				  self.options.callback.afterClose.apply(self);				
				  
				  
				$('#frm-pops').on('submit', function (evt) {	
					evt.preventDefault();
					var _reponse = Object();
					var data = JSON.stringify( $('frm-pops').serializeArray() ); 
					_reponse.formJson = data;						
					self.options.callback.onSubmitClick.call(self,_reponse);	
					
				}); 
				if(this.options.buttons && this.options.buttons.save && this.options.buttons.save.type){
					$('#btnSave').on('click', function (evt) {							
						var _reponse = Object();						
						_reponse.formJson = JSON.stringify( $('frm-pops').serializeArray() ); ;						
						self.options.callback.onSubmitClick.call(self,_reponse);	
						
					});  	
				}			
				 
			},
			show: function () {
				//$('#popsModal').modal('show');				
				$('#popsModal').modal({
					backdrop: 'static',
					keyboard: false
				});
				this.shown   = true; 
				return this;
			},
			close: function () {	
				this.closed   = true;
				$('#popsModal').modal('hide'); 
			},
			closed : false,
			shown  : false	
		}; //end popsObject
		
		
		$.popRenderer = {};
		$.popRenderer.init = function (options) {
		   var _pop = Object.create(popsObject).init(options);
		   return _pop; 
		};				  
		function mPopUp(options){			
			return $.popRenderer.init(options);
		}		  
		window.mPopUp = mPopUp;
	  
})( window );


