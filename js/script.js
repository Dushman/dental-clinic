$(pageInit);

function pageInit(){

    function initialize() {
        var myLatlng = new google.maps.LatLng(47.014454,28.846);
        var pointMyLatlng = new google.maps.LatLng(47.014354,28.855715);
        var mapOptions = {
          zoom: 15,
          center: myLatlng,
          disableDefaultUI: true,
          scrollwheel: false
        }

        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: pointMyLatlng,
            map: map,
            icon: './img/point.png',
            title: '"Stele"'
        });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    var $this = $('.map-info');
    if(!$this.length) return;

    function paddingLeft(){
        var windowWidth = $(window).width();
        var data = (windowWidth - 960) / 2;
        if (windowWidth <= 1600) {$this.css('padding-left' , data + 'px')}
        else {$this.css('padding-left' , '320px')}  
    }

    paddingLeft();

    $(window).resize(paddingLeft);

    $('.top-logo').click(function(){window.location.reload()});

    var $page = $('html,body'),
        $body = $('body');

    function scrollToPage(target) {
        var y = 0;
        if (target && $(target).length) {
            y = $(target).offset().top;
        }
        $page.animate({scrollTop: y}, 'slow', 'swing');
    }
     
    $body.on('click', '.foo-logo, footer .item-1 ul li, .top-block nav span, .to-r-btn, .to-review-btn', function(e){
        e.preventDefault();
        scrollToPage($(this).attr('data-target'));
    });

    //Form---------------------------------------------------

    $('#order-first-name').on('input', function() {
        var input = $(this);
        var is_name = input.val();
        if (is_name) {input.removeClass('error').addClass('valid');}
        else {input.removeClass('valid').addClass('error');}
    });

    $('#order-last-name').on('input', function() {
        var input = $(this);
        var is_name = input.val();
        if (is_name) {input.removeClass('error').addClass('valid');}
        else {input.removeClass('valid').addClass('error');}
    });

    $('#order-phone').on('input', function() {
        var input = $(this);
        var re = /^[0-9\-\+]{8,15}$/;
        var is_phone = re.test(input.val());
        if (is_phone) {input.removeClass('error').addClass('valid');}
        else {input.removeClass('valid').addClass('error');}
    });

    $('#order-email').on('input', function() {
        var input = $(this);
        var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        var is_email = re.test(input.val());
        if (is_email) {input.removeClass('error').addClass('valid');}
        else {input.removeClass('valid').addClass('error');}
    });
            
    $('#order-message').keyup(function(event) {
        var input = $(this);
        var message = $(this).val();
        if (message) {input.removeClass('error').addClass('valid');}
        else {input.removeClass('valid').addClass('error');}   
    });
        
    $('.send-order-btn').click(function(e){
        var form_data = $('.order-form').serializeArray();
        var error_free = true;
        for (var input in form_data){
            var element = $('#order-' + form_data[input]['name']);
            var valid = element.hasClass('valid');
            if (!valid){element.addClass('error'); error_free = false;}
            else {element.removeClass('error');}
        }
        if (!error_free){
            e.preventDefault(); 
        } else{
            e.preventDefault(); 
            $('.order-block').hide();
            $('.success-block').fadeIn('slow');
        }
    });
        
  //Slider---------------------------------------------------

    var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    (function($) {
        this.FilmRoll = (function() {
        function FilmRoll(options) {
        this.options = options != null ? options : {};
        this.rotateRight = __bind(this.rotateRight, this);
        this.rotateLeft = __bind(this.rotateLeft, this);
        this.resize = __bind(this.resize, this);
        this.moveRight = __bind(this.moveRight, this);
        this.moveLeft = __bind(this.moveLeft, this);
        this.configureWidths = __bind(this.configureWidths, this);
        this.configureSwipe = __bind(this.configureSwipe, this);
        this.configureScroll = __bind(this.configureScroll, this);
        this.configureLoad = __bind(this.configureLoad, this);
        this.configureHover = __bind(this.configureHover, this);
        this.clearScroll = __bind(this.clearScroll, this);
        if (this.options.container) {
        this.div = $(this.options.container);
        if (this.div.length) {
        this.configure();
        }
        }
        }
        FilmRoll.prototype.configure = function() {
        var first_child,
        _this = this;
        this.children = this.div.children();
        this.children.wrapAll('<div class="film_roll_wrapper"></div>');
        this.children.wrapAll('<div class="film_roll_shuttle"></div>');
        this.wrapper = this.div.find('.film_roll_wrapper');
        this.shuttle = this.div.find('.film_roll_shuttle');
        this.rotation = [];
        this.shuttle.width(this.options.shuttle_width ? parseInt(this.options.shuttle_width, 10) : 10000);
        if (this.options.start_height) {
        this.wrapper.height(parseInt(this.options.start_height, 10));
        }
        if (this.options.vertical_center) {
        this.shuttle.addClass('vertical_center');
        }
        if (!(this.options.no_css === true || document.film_roll_styles_added)) {
        $("<style type='text/css'>.film_roll_wrapper{display:block;text-align:center;float:none;position:relative;top:auto;right:auto;bottom:auto;left:auto;z-index:auto;width:100%;height:100%;margin:0 !important;padding:0 !important;overflow:hidden;}.film_roll_shuttle{text-align:left;float:none;position:relative;top:0;left:0;right:auto;bottom:auto;height:100%;margin:0 !important;padding:0 !important;z-index:auto;}.film_roll_shuttle.vertical_center:before{content:'';display:inline-block;height:100%;vertical-align:middle;margin-right:-0.25em;}.film_roll_child{position:relative;display:inline-block;*display:inline;vertical-align:middle;zoom:1;}.film_roll_pager{text-align:center;}.film_roll_pager a{width:5px;height:5px;border:2px solid #333;border-radius:5px;display:inline-block;margin:0 5px 0 0;transition:all 1s ease}.film_roll_pager a:hover{background:#666}.film_roll_pager a.active{background:#333}.film_roll_pager span{display:none}</style>").appendTo('head');
        document.film_roll_styles_added = true;
        }
        if (this.options.pager !== false) {
        this.pager = $('<div class="film_roll_pager">');
        this.div.append(this.pager);
        this.children.each(function(i, e) {
        var link;
        link = $("<a href='#' data-id='" + e.id + "'><span>" + (i + 1) + "</span></a>");
        _this.pager.append(link);
        return link.click(function() {
        _this.index = i;
        _this.moveToIndex(_this.index, 'best', true);
        return false;
        });
        });
        }
        this.pager_links = this.div.find('.film_roll_pager a');
        if (this.options.hover === 'scroll') {
        this.options.scroll = false;
        this.hover_in = function() {
        clearTimeout(_this.hover_timer);
        return _this.hover_timer = setTimeout(function() {
        _this.moveLeft();
        return _this.configureScroll();
        }, 300);
        };
        this.hover_out = this.clearScroll;
        } else {
        if (this.options.hover !== false) {
        this.hover_in = function() {
        clearTimeout(_this.hover_timer);
        return _this.hover_timer = setTimeout(function() {
        return _this.clearScroll();
        }, 300);
        };
        this.hover_out = this.configureScroll;
        }
        }
        if (this.options.hover !== false) {
        this.mouse_catcher = $('<div style="position:absolute; top:0; left: 0; height: 100%; width: 100%;" class="film_roll_mouse_catcher"></div>');
        this.mouse_catcher.appendTo(this.wrapper).mousemove(function() {
        _this.hover_in();
        return _this.mouse_catcher.remove();
        });
        }
        first_child = null;
        this.children.each(function(i, e) {
        var $el;
        $el = $(e);
        $el.attr('data-film-roll-child-id', i);
        $el.addClass("film_roll_child");
        return _this.rotation.push(e);
        });
        if (this.options.prev && this.options.next) {
        this.prev = $(this.options.prev);
        this.next = $(this.options.next);
        } else {
        this.wrapper.append('<a class="slider-nav film_roll_prev" href="#">A</a>');
        this.wrapper.append('<a class="slider-nav film_roll_next" href="#">B</a>');
        this.prev = this.div.find('.film_roll_prev');
        this.next = this.div.find('.film_roll_next');
        }
        this.prev.click(function() {
        return _this.moveRight();
        });
        this.next.click(function() {
        return _this.moveLeft();
        });
        $('body').on('click', '.slide-prev', function(){
            return _this.moveRight();
        });
        $('body').on('click', '.slide-next', function(){
            return _this.moveLeft();
        });
        this.index = this.options.start_index || 0;
        this.interval = this.options.interval || 4000;
        this.animation = this.options.animation || this.interval / 4;
        this.easing = this.options.easing || FilmRoll.default_easing;
        if (this.options.resize !== false) {
        $(window).resize(function() {
        return _this.resize();
        });
        }
        if (this.options.configure_load) {
        if (typeof this.options.configure_load === 'function') {
        this.options.configure_load.apply(this, arguments);
        } else {
        this.configureLoad();
        }
        } else {
        $(window).load(this.configureLoad);
        }
        if (this.options.swipe !== false) {
        this.configureSwipe();
        }
        this.div.trigger($.Event("film_roll:dom_ready"));
        return this;
        };
        FilmRoll.prototype.bestDirection = function(child, rotation_index) {
        rotation_index || (rotation_index = $.inArray(child, this.rotation));
        if (rotation_index < (this.children.length / 2)) {
        return 'right';
        } else {
        return 'left';
        }
        };
        FilmRoll.prototype.cancelClick = function(event) {
        if ($(this).hasClass('fr-no-click')) {
        event.preventDefault();
        return false;
        }
        return true;
        };
        FilmRoll.prototype.childIndex = function(child) {
        return $.inArray(child, this.children);
        };
        FilmRoll.prototype.childWidth = function(child) {
        var index;
        index = this.childIndex(child);
        return this.child_widths[index] || $(child).outerWidth(true);
        };
        FilmRoll.prototype.clearScroll = function() {
        if (this.scrolled !== false) {
        clearInterval(this.timer);
        this.scrolled = false;
        }
        return this;
        };
        FilmRoll.prototype.configureHover = function() {
        this.div.hover(this.hover_in, this.hover_out);
        if (this.options.prev && this.options.next) {
        this.prev.hover(this.hover_in, this.hover_out);
        return this.next.hover(this.hover_in, this.hover_out);
        }
        };
        FilmRoll.prototype.configureLoad = function() {
        this.configureWidths();
        this.moveToIndex(this.index, 'right', true);
        if (this.options.hover === 'scroll') {
        this.options.scroll = false;
        return this.configureHover();
        } else if (this.options.scroll !== false) {
        this.configureScroll();
        if (this.options.hover !== false) {
        return this.configureHover();
        }
        }
        };
        FilmRoll.prototype.configureScroll = function() {
        var _this = this;
        if (this.scrolled !== true) {
        this.timer = setInterval(function() {
        return _this.moveLeft();
        }, this.interval);
        this.scrolled = true;
        }
        return this;
        };
        FilmRoll.prototype.configureSwipe = function() {
        var _this = this;
        if (typeof $.fn.swipe !== 'undefined') {
        this.div.swipe({
        swipeStatus: function(event, phase, direction, distance) {
        var rotation_index, wrapper_width;
        if (direction === 'up' || direction === 'down') {
        return false;
        }
        if (phase === 'start') {
        wrapper_width = _this.wrapper.width();
        if (wrapper_width >= _this.real_width || _this.children.length === 1) {
        return false;
        }
        _this.was_scrolled = _this.scrolled;
        if (_this.scrolled) {
        _this.clearScroll();
        }
        _this.active_half = _this.child_widths[_this.index] / 2;
        rotation_index = $.inArray(_this.children[_this.index], _this.rotation);
        _this.offscreen_left = parseInt(_this.shuttle.css('left'), 10);
        _this.offscreen_right = _this.marginRight(rotation_index) - (wrapper_width - _this.child_widths[_this.index]) / 2;
        _this.div.find('a').addClass('fr-no-click');
        } else if (phase === 'move') {
        if (direction === 'left') {

            if (distance > _this.active_half) {
                $(_this.children[_this.index]).removeClass('active');
                _this.index = (_this.index + 1) % _this.children.length;
                $(_this.children[_this.index]).addClass('active');
                _this.active_half += _this.child_widths[_this.index];
            }

            if (distance > _this.offscreen_right) {
                _this.offscreen_left = _this.rotateLeft() + distance;
                _this.offscreen_right += _this.childWidth(_this.rotation[_this.rotation.length - 1]);
            }

            _this.shuttle.css('left', _this.offscreen_left - distance);


        } else {

            if (distance > _this.active_half) {

                $(_this.children[_this.index]).removeClass('active');
                _this.index -= 1;
                if (_this.index < 0) {
                _this.index = _this.children.length - 1;
                }
                $(_this.children[_this.index]).addClass('active');
                _this.active_half += _this.child_widths[_this.index];

        }

        if (distance + _this.offscreen_left > 0) {
        _this.offscreen_left = _this.rotateRight() - distance;
        }
        _this.shuttle.css('left', _this.offscreen_left + distance);
        }
        } else {
        if (phase === 'end') {
        _this.moveToIndex(_this.index, direction);
        } else if (phase === 'cancel') {
        _this.moveToIndex(_this.index, (direction === 'right' ? 'left' : 'right'));
        }
        if (_this.was_scrolled) {
        _this.configureScroll();
        }
        }
        return true;
        },
        excludedElements: 'label, button, input, select, textarea, .noSwipe',
        allowPageScroll: 'vertical'
        });
        return this.div.find('a').on('click', this.cancelClick);
        }
        };
        FilmRoll.prototype.configureWidths = function() {
        var min_height,
        _this = this;
        this.width = min_height = 0;
        this.wrapper.css({
        height: '',
        'min-height': 0
        });
        this.shuttle.width('').removeClass('film_roll_shuttle').addClass('film_roll_resizing');
        this.children.width('');
        this.div.trigger($.Event("film_roll:resizing"));
        this.child_widths = [];
        if (this.options.height && this.options.height.toString().match(/^\+/)) {
        this.options.height_padding = parseInt(this.options.height, 10);
        this.options.height = null;
        } else {
        this.options.height_padding = 0;
        }
        this.children.each(function(i, e) {
        var $el, el_height, el_width;
        $el = $(e);
        $el.width($el.outerWidth(true));
        el_width = $el.outerWidth(true);
        _this.child_widths.push(el_width);
        _this.width += el_width;
        if (!_this.options.height) {
        el_height = $el.outerHeight(true);
        if (el_height > min_height) {
        min_height = el_height;
        }
        }
        return e;
        });
        if (this.options.height) {
        this.wrapper.height(this.options.height);
        } else {
        this.wrapper.height('');
        this.wrapper.css('min-height', min_height + this.options.height_padding);
        }
        this.real_width = this.width;
        this.shuttle.width(this.real_width * 2).removeClass('film_roll_resizing').addClass('film_roll_shuttle');
        return this;
        };
        FilmRoll.prototype.rotationIndex = function(child) {
        return $.inArray(child, this.rotation);
        };
        FilmRoll.prototype.marginLeft = function(rotation_index) {
        var child, i, margin, _i, _len, _ref;
        margin = 0;
        _ref = this.rotation;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        child = _ref[i];
        if (i < rotation_index && i >= 0) {
        margin += this.childWidth(child);
        }
        }
        return margin;
        };
        FilmRoll.prototype.marginRight = function(rotation_index) {
        var child, i, margin, offset, _i, _len, _ref;
        offset = this.rotation.length - 1;
        margin = 0;
        _ref = this.rotation;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        child = _ref[i];
        if (i > rotation_index && i <= offset) {
        margin += this.childWidth(child);
        }
        }
        return margin;
        };
        FilmRoll.prototype.moveLeft = function() {
        this.index = (this.index + 1) % this.children.length;
        this.moveToIndex(this.index, 'left', true);
        return false;
        };
        FilmRoll.prototype.moveRight = function() {
        this.index -= 1;
        if (this.index < 0) {
        this.index = this.children.length - 1;
        }
        this.moveToIndex(this.index, 'right', true);
        return false;
        };
        FilmRoll.prototype.moveToChild = function(element) {
        var child_index;
        child_index = this.childIndex($(element)[0]);
        if (child_index > -1) {
            return this.moveToIndex(child_index);
        }
        };
        FilmRoll.prototype.moveToIndex = function(index, direction, animate) {
        var child, direction_class, new_left_margin, rotation_index, scrolled, visible_margin, wrapper_width,
        _this = this;
        if (animate == null) {
        animate = true;
        }
        this.index = index;
        scrolled = this.scrolled;
        this.clearScroll();
        child = this.children[index];
        rotation_index = $.inArray(child, this.rotation);
        if (!direction || direction === 'best') {
            direction = this.bestDirection(child, rotation_index);
        }
        this.children.removeClass('active');
        $(child).addClass('active').trigger($.Event("film_roll:activate"));
        this.pager_links.removeClass('active');
        $(this.pager_links[index]).addClass('active');
        wrapper_width = this.wrapper.width();
        if (wrapper_width < this.real_width && this.children.length > 1) {
        visible_margin = (wrapper_width - this.child_widths[index]) / 2;
        if (direction === 'right') {
        while (rotation_index === 0 || this.marginLeft(rotation_index) < visible_margin) {
        this.rotateRight();
        rotation_index = $.inArray(child, this.rotation);
        }
        } else {
        while (rotation_index === this.children.length - 1 || this.marginRight(rotation_index) < visible_margin) {
        this.rotateLeft();
        rotation_index = $.inArray(child, this.rotation);
        }
        }
        new_left_margin = -1 * (this.marginLeft(rotation_index) - visible_margin);
        if (animate) {
        direction_class = "moving_" + direction;
        this.shuttle.addClass(direction_class);
        this.div.trigger($.Event("film_roll:moving"));
        this.shuttle.stop().animate({
        'left': new_left_margin
        }, this.animation, this.easing, function() {
        _this.shuttle.removeClass(direction_class);
        return _this.div.trigger($.Event("film_roll:moved"));
        });
        } else {
        this.shuttle.css('left', new_left_margin);
        this.div.trigger($.Event("film_roll:moved"));
        }
        } else {
        this.shuttle.css('left', (wrapper_width - this.width) / 2);
        }
        if (scrolled) {
        this.configureScroll();
        }
        return this;
        };
        FilmRoll.prototype.resize = function() {
        var _this = this;
        clearTimeout(this.resize_timer);
        this.resize_timer = setTimeout(function() {
        var scrolled;
        scrolled = _this.scrolled;
        _this.clearScroll();
        if (scrolled) {
        _this.configureScroll();
        }
        _this.configureWidths();
        _this.moveToIndex(_this.index, 'best');
        return _this.div.trigger($.Event("film_roll:resized"));
        }, 200);
        return this;
        };
        FilmRoll.prototype.rotateLeft = function() {
        var _css_left, _first_child, _new_left, _shuttle_left;
        _css_left = this.shuttle.css('left');
        _shuttle_left = _css_left ? parseInt(_css_left, 10) : 0;
        _first_child = this.rotation.shift();
        _new_left = _shuttle_left + this.childWidth(_first_child);
        this.rotation.push(_first_child);
        this.shuttle.css('left', _new_left);
        this.shuttle.append(this.shuttle.children().first().detach());
        return _new_left;
        };
        FilmRoll.prototype.rotateRight = function() {
        var _css_left, _last_child, _new_left, _shuttle_left;
        _css_left = this.shuttle.css('left');
        _shuttle_left = _css_left ? parseInt(_css_left, 10) : 0;
        _last_child = this.rotation.pop();
        _new_left = _shuttle_left - this.childWidth(_last_child);
        this.rotation.unshift(_last_child);
        this.shuttle.css('left', _new_left);
        this.shuttle.prepend(this.shuttle.children().last().detach());
        return _new_left;
        };
        return FilmRoll;
        })();
        return this.FilmRoll.default_easing = 'swing';
    })(jQuery);

    var film_roll = new FilmRoll({
        container: '#top-slider-wrap',
        scroll: true,
        interval: '8000',
        animation: '2000',
        pager: false
    });

    $('#top-slider-wrap').on('film_roll:activate', function(event) {
        $('#top-slider-wrap').find('.slider-nav').appendTo('header > .section-inn');
    });

    var film_roll = new FilmRoll({
        container: '#reviews-slider',
        scroll: false,
        interval: '1500',
        pager: false
    });

    $('#reviews-slider').on('film_roll:activate', function(event) {
        $('#reviews-slider').find('.slider-nav').appendTo('.list-of-reviews-wrap');
    });

    var film_roll = new FilmRoll({
        container: '#clinic-slider',
        scroll: false,
        interval: '1200',
        pager: true
    });

    $('#clinic-slider').on('film_roll:activate', function(event) {
        $('#clinic-slider').find('.slider-nav').appendTo('.clinic-slider-wrap');
    });

    $('#clinic-slider').on('film_roll:moving', function(event){
        $('.film_roll_child').removeClass('slide-prev slide-next');
        $('.film_roll_child.active').prev().addClass('slide-prev');
        $('.film_roll_child.active').next().addClass('slide-next');
        //console.log(film_roll.index + 1);
    });

    var film_roll = new FilmRoll({
        container: '#doctors-slider',
        scroll: false,
        interval: '1500',
        pager: false
    });

    $('#doctors-slider').on('film_roll:activate', function(event) {
        $('#doctors-slider').find('.slider-nav').appendTo('.doctors-slider-wrap');
    });

}