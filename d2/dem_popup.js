/**
 * Created by rejeesh on 29-12-2016.
 */
 
 
 

;( function( window ) {

    'use strict';

    $.pops         = {};
    $.pops.defaults = {
        size     : 'modal-md',
        layout	 : 'vertical',
        title    : 'Title',
        template    : null,
		templateId    : null,
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
            //element    += '<form id="frm-pops" class="form-'+this.options.layout+'">';
            element    += '<div class="modal-body">';
            element    += '<span class="pops_body"></span>';
            element    += '</div>';
            element    += '<div class="modal-footer">';
            /*var btn_class,btn_type;
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
            }*/

            element    += '<button id="btnClose" type="button" class="btn btn-default" >Close</button>';
            element    += '</div>';
			//element    += '</form>';
			element    += '</div></div></div>';
		
            element    += '</span>';

            var $popUp = $(element);
            $popUp.find('.pops_text').html(this.options.title);            
			if(this.options.templateId){
				$popUp.find('.pops_body').html($("#"+ this.options.templateId +" ").html());
				$("#"+this.options.templateId+" ").remove();
			}
			if(this.options.template){
				$popUp.find('.pops_body').html(this.options.template);
			}
			
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
				
			$('form').on('submit', function (evt) {
                evt.preventDefault();
				 var _reponse = Object();
                _reponse.formJson = $("form").serializeJSON();
				_reponse.target = evt.target;
                self.options.callback.onSubmitClick.call(self,_reponse);
			});	

            /*$('#frm-pops').on('submit', function (evt) {
                evt.preventDefault();
                var _reponse = Object();
                _reponse.formJson = $("#frm-pops").serializeJSON();
                self.options.callback.onSubmitClick.call(self,_reponse);

            });
			
            if(this.options.buttons && this.options.buttons.save && this.options.buttons.save.type=='button'){
                $('#btnSave').on('click', function (evt) {
                    var _reponse = Object();
                    _reponse.formJson = $("#frm-pops").serializeJSON();
                    self.options.callback.onSubmitClick.call(self,_reponse);
                });
            }*/

        },
        show: function () {            
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
		setTemplate:function(template){
			this.$popUp.find('.pops_body').html(template);			
		},
		setTemplateId(templateId){
			this.$popUp.find('.pops_body').html($("#"+ templateId +" ").html());
			$("#"+templateId+" ").remove();
		},		
        closed : false,
        shown  : false
    }; //end popsObject


    $.popRenderer = {};
    $.popRenderer.init = function (options) {
        var _pop = Object.create(popsObject).init(options);
        return _pop;
    };
    function my_popup_init(options){
        return $.popRenderer.init(options);
    }
    window.my_popup_init = my_popup_init;

})( window );




 
 
 /*
 ;( function( window ) {

			$.pops         = {};
			$.pops.defaults = {
				size     : 'modal-md',
				layout	 : 'vertical',
				title    : 'Title',
				template    : '<h3>Body</h3>',
				templateId    : null,
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
		
		
				  
		function my_popup_init(options){		
			this.options = $.extend({}, $.pops.defaults, options);
			this._init();
		};
		my_popup_init.prototype._init = function() {		
		
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

            $popUp = $(element);
            $popUp.find('.pops_text').html(this.options.title);
            //$popUp.find('.pops_body').html(this.options.template);
			if(this.options.templateId){
				$popUp.find('.pops_body').html($("#"+ this.options.templateId +" ").html());
				$("#"+this.options.templateId+" ").remove();
			}
			
			
			
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
                _reponse.formJson = $("#frm-pops").serializeJSON();
                self.options.callback.onSubmitClick.call(self,_reponse);

            });
            if(this.options.buttons && this.options.buttons.save && this.options.buttons.save.type=='button'){
                $('#btnSave').on('click', function (evt) {
                    var _reponse = Object();
                    _reponse.formJson = $("#frm-pops").serializeJSON();
                    self.options.callback.onSubmitClick.call(self,_reponse);
                });
            }
		}
		
		my_popup_init.prototype.show = function () {	
            $('#popsModal').modal({
                backdrop: 'static',
                keyboard: false
            });          
            return this;
        };
		
		my_popup_init.prototype.close = function () {	
            $('#popsModal').modal('hide');
        };
		
		my_popup_init.prototype.setTemplate = function (templateId) {	
			//alert("fffs");
           $popUp.find('.pops_body').html($("#"+ templateId +" ").html());
		   $("#"+templateId+" ").remove();
        };
		
		window.my_popup_init = my_popup_init;
		
})( window );
*/
		

		
		


