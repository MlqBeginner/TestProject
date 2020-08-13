/**
 * jquery 定时器插件
 * 
 * jquery-timer - v1.0.0 - 2017-03-30 
 * Copyright (c) 2017 fengli
 */

(function($) {

	/**
	 * 定义Timer函数
	 */
	var Timer = function(options) {

		// 定义默认函数
		var defaults = {
			timerCallback : function() {
			},
			startCallback : function() {
			},
			pauseCallback : function() {
			},
			resumeCallback : function() {
			},
			stopCallback : function() {
			},
			finishCallback : function() {
			},
			// 默认间隔时间
			interval : 10000,
			timeout : false,
			useSetTimeout : false
		};

		/**
		 * 处理时间间隔及超时参数，传入参数不合法使用默认值
		 */
		options.interval = parseInt(options.interval, 10);
		options.interval = isNaN(options.interval) ? defaults.interval
				: options.interval;
		options.timeout = parseInt(options.timeout, 10);
		options.timeout = isNaN(options.timeout) ? defaults.timeout
				: options.timeout;

		this._options = $.extend(defaults, options);

		this._timerFunction = options.useSetTimeout ? 'Timeout' : 'Interval';
		this._timerID = null;
		this._startTime = 0;
		this._pausedInterval = -1;
		this._passedTime = 0;
		this._status = 'stopped';
	};

	// 设置定时器原型
	Timer.prototype = {
		_activate : function() {
			var self = this;
			this._startTime = new Date().getTime();
			this._timerID = window['set' + this._timerFunction](function() {
				self._passedTime = (new Date().getTime() - self._startTime);
				if (self._options.timeout
						&& self._passedTime >= self._options.timeout) {
					self._finish();
				} else {
					self._options.timerCallback();
				}
			}, this._options.interval);
		},
		_finish : function() {
			window['clear' + this._timerFunction](this._timerID);
			this._startTime = 0;
			this._pausedInterval = -1;
			this._passedTime = 0;
			this._timerID = null;
			this._options.finishCallback();
			this._status = 'finished';
		},
		start : function() {
			if (this._startTime !== 0) {
				throw "定时器已经在运行";
			}
			this._activate();
			this._options.startCallback();
			this._status = 'running';
		},
		pause : function() {
			if (this._startTime === 0 || this._timerID === null) {
				throw "定时器没有被开启";
			}
			window['clear' + this._timerFunction](this._timerID);
			this._passedTime = (new Date().getTime() - this._startTime);
			this._pausedInterval = this._passedTime % this._options.interval;
			this._timerID = null;
			this._options.pauseCallback();
			this._status = 'paused';
		},
		resume : function(fullFrame) {
			fullFrame = typeof (fullFrame) === 'undefined' ? false : fullFrame;
			if (this._pausedInterval === -1) {
				throw "定时器没有暂停";
			}
			if (fullFrame) {
				var self = this;
				setTimeout(function() {
					self._options.timerCallback();
					if (!self._options.useSetTimeout) {
						self._activate();
					}
				}, this._options.interval - this._pausedInterval);
			} else {
				this._activate();
			}
			this._options.resumeCallback();
			this._status = 'running';
		},
		stop : function() {
			if (this._startTime === 0 || this._timerID === null) {
				throw '定时器未被开启';
			}
			this._finish();
			this._options.stopCallback();
			this._status = 'stopped';
		},
		kill : function() {
			if (this._timerID !== null) {
				window['clear' + this._timerFunction](this._timerID);
				this._startTime = 0;
				this._pausedInterval = -1;
				this._timerID = null;
				this._status = 'stopped';
			}
		},
		status : function() {
			return this._status;
		}
	};

	$.timer = function(config) {
        if(!config.name) {
        	config.name = "timer01";
        }
        if(typeof(config.name) != 'string' || !config.name.match(/^[a-zA-Z][a-zA-Z_0-9]*$/)) {
            throw '必须是字母或者数字';
        }
        if(!config.callback) {
            return $.timer[config.name];
        }
        
        if(typeof(config.callback) != 'function') {
            throw "回调函数格式不正确";
        }
        
        // 处理时间间隔
        interval = parseInt(config.interval, 10);
        if(isNaN(interval) || interval <= 0) {
            throw "输入时间间隔参数不正确";
        }

        // 绑定函数
        options = {};
        options.timerCallback = config.callback;
        options.interval = config.interval;
        options.timeout = config.timeout;
        $.timer[config.name] = new Timer(options);

        return $.timer[config.name];
    };
    
}(jQuery))