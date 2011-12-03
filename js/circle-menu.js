;(function($, window, document, undefined){
    var pluginName = 'circleMenu',
        defaults = {
            item_diameter: 30,
            circle_radius: 80,
            start_angle: 90,
            end_angle: 0,
            speed: 500,
            delay: 1000,
            step_out: 20,
            step_in: -20,
            trigger: 'hover',
            'animation-timing-function': 'ease'
        };

    function CircleMenu(element, options){
        this._timeouts = [];
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    CircleMenu.prototype.init = function(){
        var self = this;
        
        if(typeof self.options.direction === 'string'){
            switch(self.options.direction.toLowerCase()){
                case 'bottom-left':
                    self.options.start_angle = 180;
                    self.options.end_angle = 90;
                    break;
                case 'bottom':
                    self.options.start_angle = 135;
                    self.options.end_angle = 45;
                    break;
                case 'right':
                    self.options.start_angle = -45;
                    self.options.end_angle = 45;
                    break;
                case 'left':
                    self.options.start_angle = 225;
                    self.options.end_angle = 135;
                    break;
                case 'top':
                    self.options.start_angle = 225;
                    self.options.end_angle = 315;
                    break;
                case 'bottom-half':
                    self.options.start_angle = 180;
                    self.options.end_angle = 0;
                    break;
                case 'right-half':
                    self.options.start_angle = -90;
                    self.options.end_angle = 90;
                    break;
                case 'left-half':
                    self.options.start_angle = 270;
                    self.options.end_angle = 90;
                    break;
                case 'top-half':
                    self.options.start_angle = 180;
                    self.options.end_angle = 360;
                    break;
                case 'top-left':
                    self.options.start_angle = 270;
                    self.options.end_angle = 180;
                    break;
                case 'top-right':
                    self.options.start_angle = 270;
                    self.options.end_angle = 360;
                    break;
                case 'full':
                    self.options.start_angle = -90;
                    self.options.end_angle = 270 - Math.floor(360/self.element.find('a').length);
                    break;
                case 'bottom-right':
                default:
                    self.options.start_angle = 0;
                    self.options.end_angle = 90;
                    break;
            }
        }

        self.element.css({
            'list-style': 'none',
            'margin': 0,
            'padding': 0,
            'width': self.options.item_diameter+'px'
        });
        var $items = self.element.find('a');
        $items.css({
            'display': 'block',
            'width': self.options.item_diameter+'px',
            'height': self.options.item_diameter+'px',
            'border-radius': self.options.item_diameter+'px',
            'text-align': 'center',
            'line-height': self.options.item_diameter+'px',
            'text-decoration': 'none',
            'position': 'absolute',
            'z-index': 1,
            'overflow': 'hidden'
        });
        ['-webkit-','-moz-','-o-','-ms-',''].forEach(function(prefix){
            $items.css(prefix+'transition','all '+self.options.speed+'ms '+self.options['animation-timing-function']);
        });
        self.element.find('li:first-child a').css({'z-index': 1000});
        self.element.find('li:not(:first-child) a').css({'visibility': 'hidden',top:0,left:0});
        self.item_count = self.element.find('li a').length - 1;
        self._step = (self.options.end_angle - self.options.start_angle) / (self.item_count-1);
        self.element.find('li:not(:first-child) a').each(function(index){
            var $item = $(this);
            var angle = (self.options.start_angle + (self._step * index)) * (Math.PI/180);
            var x = Math.round(self.options.circle_radius * Math.cos(angle));
            var y = Math.round(self.options.circle_radius * Math.sin(angle));
            $item.data('plugin_'+pluginName+'-pos-x', x);
            $item.data('plugin_'+pluginName+'-pos-y', y);
        });
        
        self._state = 'closed';
        if(self.options.trigger === 'hover'){
            self.element.on('mouseenter',function(evt){
                self.open();
            }).on('mouseleave',function(evt){
                self.close();
            });
        }else if(self.options.trigger === 'click'){
            self.options.delay = 0;
            self.element.find('li:first-child a').on('click',function(evt){
                evt.preventDefault();
                if(self._state === 'closed'){
                    self.open();
                }else{
                    self.close();
                }
                return false;
            });
        }
    };
    
    CircleMenu.prototype.open = function(){
        var self = this;
        var $self = this.element;
        var start = 0;
        var set;
        $self.addClass(pluginName+'-open');
        if(self.options.step_out >= 0){
            set = $self.find('li:not(:first-child) a');
        }else{
            set = $($self.find('li:not(:first-child) a').get().reverse())
        }
        self.clearTimeouts();
        set.each(function(index){
            var $item = $(this);
            self._timeouts.push(setTimeout(function(){
                $item.css({
                    visibility: 'visible',
                    left: $item.data('plugin_'+pluginName+'-pos-x')+'px',
                    top: $item.data('plugin_'+pluginName+'-pos-y')+'px'
                });
            }, start + Math.abs(self.options.step_out) * index));
        });
        this._state = 'open';
        return this;
    }
    
    CircleMenu.prototype.close = function(){
        var self = this;
        var $self = this.element;
        var do_animation = function(){
            var start = 0;
            var set;
            if(self.options.step_in >= 0){
                set = $self.find('li:not(:first-child) a');
            }else{
                set = $($self.find('li:not(:first-child) a').get().reverse());
            }
            self.clearTimeouts();
            set.each(function(index){
                var $item = $(this);
                self._timeouts.push(setTimeout(function(){
                    $item.css({top:0,left:0,visibility:'hidden'});
                }, start + Math.abs(self.options.step_in) * index));
            });
            $self.removeClass(pluginName+'-open');
        };
        self.clearTimeouts();
        self._timeouts.push(setTimeout(do_animation,self.options.delay));
        this._state = 'closed';
        return this;
    }
    CircleMenu.prototype.clearTimeouts = function(){
        var timeout;
        while(timeout = this._timeouts.shift()){
            clearTimeout(timeout);
        }
    }

    $.fn[pluginName] = function(options){
        return this.each(function(){
            if(!$.data(this, 'plugin_' + pluginName)){
                $.data(this, 'plugin_' + pluginName, new CircleMenu(this, options));
            }
        });
    }
})(jQuery, window, document);