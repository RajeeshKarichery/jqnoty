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

var NotyObject = {

  init: function (options) {

    // Mix in the passed in options with the default options
    this.options = $.extend({}, $.noty.defaults, options);

    this.options.layout = (this.options.custom) ? $.noty.layouts['inline'] : $.noty.layouts[this.options.layout];

    if ($.noty.themes[this.options.theme]) {
      this.options.theme = $.noty.themes[this.options.theme];
      if (this.options.theme.template)
        this.options.template = this.options.theme.template;

      if (this.options.theme.animation)
        this.options.animation = this.options.theme.animation;
    }
    else {
      this.options.themeClassName = this.options.theme;
    }

   /* this.options = $.extend({}, this.options, this.options.layout.options);

    if (this.options.id) {
      if ($.noty.store[this.options.id]) {
        return $.noty.store[this.options.id];
      }
    } else {
      this.options.id = 'noty_' + (new Date().getTime() * Math.floor(Math.random() * 1000000));
    }*/

    // Build the noty dom initial structure
    this._build();

    // return this so we can chain/use the bridge with less code.
    return this;
  }, // end init

  _build: function () {

    // Generating noty bar
    //var $bar = $('<div class="noty_bar noty_type_' + this.options.type + '"></div>').attr('id', this.options.id);
	var $bar = $('<div class="alert alert-' + this.options.type + '"></div>').attr('id', this.options.id);
    $bar.append(this.options.template).find('.noty_text').html(this.options.text);
	
	//$bar.find('.noty_text').html(this.options.text);

	 this.$bar = $bar;
    //this.$bar = (this.options.layout.parent.object !== null) ? $(this.options.layout.parent.object).css(this.options.layout.parent.css).append($bar) : $bar;

    //if (this.options.themeClassName)
	//	this.$bar.addClass(this.options.themeClassName).addClass('alert alert-' + this.options.type);
     // this.$bar.addClass(this.options.themeClassName).addClass('noty_container_type_' + this.options.type);

    
    if (this.options.buttons) {
     
    } else {
      // If buttons is not available, then remove containers if exist
     // this.$bar.find('.noty_buttons').remove();
    }

    // For easy access
    this.$message     = this.$bar.find('.noty_message');
    this.$closeButton = this.$bar.find('.noty_close');
    this.$buttons     = this.$bar.find('.noty_buttons');

    $.noty.store[this.options.id] = this; // store noty for api

  }, // end _build

  show: function () {

    var self = this;

    (self.options.custom) ? self.options.custom.find(self.options.layout.container.selector).append(self.$bar) : $(self.options.layout.container.selector).append(self.$bar);

    if (self.options.theme && self.options.theme.style)
      self.options.theme.style.apply(self);

    ($.type(self.options.layout.css) === 'function') ? this.options.layout.css.apply(self.$bar) : self.$bar.css(this.options.layout.css || {});

    self.$bar.addClass(self.options.layout.addClass);

    self.options.layout.container.style.apply($(self.options.layout.container.selector), [self.options.within]);

    self.showing = true;

    if (self.options.theme && self.options.theme.style)
      self.options.theme.callback.onShow.apply(this);

    if ($.inArray('click', self.options.closeWith) > -1)
      self.$bar.css('cursor', 'pointer').on('click', function (evt) {
        self.stopPropagation(evt);
        if (self.options.callback.onCloseClick) {
          self.options.callback.onCloseClick.apply(self);
        }
        self.close();
      });

    if ($.inArray('hover', self.options.closeWith) > -1)
      self.$bar.one('mouseenter', function () {
        self.close();
      });

    if ($.inArray('button', self.options.closeWith) > -1)
      self.$closeButton.one('click', function (evt) {
        self.stopPropagation(evt);
        self.close();
      });

    if ($.inArray('button', self.options.closeWith) == -1)
      self.$closeButton.remove();

    if (self.options.callback.beforeShow)
      self.options.callback.beforeShow.apply(self);

    if (typeof self.options.animation.open == 'string') {
      self.animationTypeOpen = 'css';
      self.$bar.css('min-height', self.$bar.innerHeight());
      self.$bar.on('click', function (e) {
        self.wasClicked = true;
      });
      self.$bar.show();

      if (self.options.callback.onShow)
        self.options.callback.onShow.apply(self);

      self.$bar.addClass(self.options.animation.open).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        if (self.options.callback.afterShow) self.options.callback.afterShow.apply(self);
        self.showing = false;
        self.shown   = true;
        if (self.hasOwnProperty('wasClicked')) {
          self.$bar.off('click', function (e) {
            self.wasClicked = true;
          });
          self.close();
        }
      });

    } else if (typeof self.options.animation.open == 'object' && self.options.animation.open == null) {
      self.animationTypeOpen = 'none';
      self.showing           = false;
      self.shown             = true;
      self.$bar.show();

      if (self.options.callback.onShow)
        self.options.callback.onShow.apply(self);

      self.$bar.queue(function () {
        if (self.options.callback.afterShow)
          self.options.callback.afterShow.apply(self);
      });

    } else {
      self.animationTypeOpen = 'anim';

      if (self.options.callback.onShow)
        self.options.callback.onShow.apply(self);

      self.$bar.animate(
          self.options.animation.open,
          self.options.animation.speed,
          self.options.animation.easing,
          function () {
            if (self.options.callback.afterShow) self.options.callback.afterShow.apply(self);
            self.showing = false;
            self.shown   = true;
          });
    }

    // If noty is have a timeout option
    if (self.options.timeout) {
      self.queueClose(self.options.timeout);
      self.$bar.on('mouseenter', self.dequeueClose.bind(self));
      self.$bar.on('mouseleave', self.queueClose.bind(self, self.options.timeout));
    }

    return this;

  }, // end show

  dequeueClose: function () {
    if (!this.closeTimer) return;
    clearTimeout(this.closeTimer);
    this.closeTimer = null;
  },

  queueClose: function (timeout) {
    if (this.closeTimer) return;
    var self        = this;
    self.closeTimer = window.setTimeout(function () {
      self.close();
    }, timeout);
    return self.closeTimer
  },

  close: function () {
    if (this.closeTimer) this.dequeueClose();

    if (this.closed) return;
    if (this.$bar && this.$bar.hasClass('i-am-closing-now')) return;

    var self = this;

    if (this.showing && (this.animationTypeOpen == 'anim' || this.animationTypeOpen == 'none')) {
      self.$bar.queue(
          function () {
            self.close.apply(self);
          }
      );
      return;
    } else if (this.showing && this.animationTypeOpen == 'css') {
      self.$bar.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        self.close();
      });
    }

    if (!this.shown && !this.showing) { // If we are still waiting in the queue just delete from queue
      var queue = [];
      $.each($.noty.queue, function (i, n) {
        if (n.options.id != self.options.id) {
          queue.push(n);
        }
      });
      $.noty.queue = queue;
      return;
    }

    self.$bar.addClass('i-am-closing-now');

    if (self.options.callback.onClose) {
      self.options.callback.onClose.apply(self);
    }

    if (typeof self.options.animation.close == 'string') {
      self.$bar.removeClass(self.options.animation.open).addClass(self.options.animation.close).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        if (self.options.callback.afterClose) self.options.callback.afterClose.apply(self);
        self.closeCleanUp();
      });

    } else if (typeof self.options.animation.close == 'object' && self.options.animation.close == null) {
      self.$bar.dequeue().hide(0, function() {
        if (self.options.callback.afterClose) self.options.callback.afterClose.apply(self);
        self.closeCleanUp();
      });

    } else {
      self.$bar.clearQueue().stop().animate(
          self.options.animation.close,
          self.options.animation.speed,
          self.options.animation.easing,
          function () {
            if (self.options.callback.afterClose) self.options.callback.afterClose.apply(self);
          })
          .promise().done(function () {
        self.closeCleanUp();
      });
    }

  }, // end close

  
  

  setText: function (text) {
    if (!this.closed) {
      this.options.text = text;
      this.$bar.find('.noty_text').html(text);
    }
    return this;
  },

  setType: function (type) {
    if (!this.closed) {
      this.options.type = type;
      this.options.theme.style.apply(this);
      this.options.theme.callback.onShow.apply(this);
    }
    return this;
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

$.notyRenderer = {};

$.notyRenderer.init = function (options) {
   var notification = Object.create(NotyObject).init(options);
   $.notyRenderer.show(notification);

  return ($.noty.returns == 'object') ? notification : notification.options.id;
};


$.notyRenderer.show = function (notification) {
  $('body').append($(notification.options.layout.container.object).addClass('i-am-new'));

  //$.notyRenderer.setLayoutCountFor(notification, +1);

  notification.show();
};


/*$.notyRenderer.getLayoutCountFor = function (notification) {
  return $(notification.options.layout.container.selector).data('noty_layout_count') || 0;
};

$.notyRenderer.setLayoutCountFor = function (notification, arg) {
  return $(notification.options.layout.container.selector).data('noty_layout_count', $.notyRenderer.getLayoutCountFor(notification) + arg);
};*/



$.noty         = {};

$.noty.layouts = {};
$.noty.themes  = {};
$.noty.returns = 'object';
$.noty.store   = {};



$.noty.defaults = {
  layout      : 'topRight',
  theme       : 'relax',
  type        : 'alert',
  text        : '',
  dismissQueue: true,
  template    : '<div class="alert "><span class="noty_text"></span> <button type="button" class="close" >&times;</button> </div>',
  animation   : {
    open     : {height: 'toggle'},
    close    : {height: 'toggle'},
    easing   : 'swing',
    speed    : 500,
    fadeSpeed: 'fast'
  },
  timeout     : false,
  force       : false,
  modal       : false,
  maxVisible  : 5,
  killer      : false,
  closeWith   : ['click'],
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
  },
  buttons     : false
};


// Helpers
window.noty = function noty(options) {
  return $.notyRenderer.init(options);
};

$.noty.layouts.topRight = {
    name     : 'topRight',
    options  : { // overrides options
    },
    container: {
        object  : '<ul id="noty_topRight_layout_container" />',
        selector: 'ul#noty_topRight_layout_container',
        style   : function() {
            $(this).css({
                top          : 20,
                right        : 20,
                position     : 'fixed',
                width        : '310px',
                height       : 'auto',
                margin       : 0,
                padding      : 0,
                listStyleType: 'none',
                zIndex       : 10000000
            });

            if(window.innerWidth < 600) {
                $(this).css({
                    right: 5
                });
            }
        }
    },
    parent   : {
        object  : '<li />',
        selector: 'li',
        css     : {}
    },
    css      : {
        display: 'none',
        width  : '310px'
    },
    addClass : ''
};






return window.noty;

});