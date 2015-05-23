(function(){
	function getQueryVariable(variable) {
	    var query = window.location.search.substring(1);
	    var vars = query.split('&');
	    for (var i = 0; i < vars.length; i++) {
	        var pair = vars[i].split('=');
	        if (decodeURIComponent(pair[0]) == variable) {
	            return decodeURIComponent(pair[1]);
	        }
	    }
	    console.log('Query variable %s not found', variable);
	}
	
	// Collection
	var a = [];
	function Collection(){
		this.length = 0;
		return this;
	}
	Collection.prototype = {
		each: function(fn){
			for (var i = this.length; i--;){
				fn.apply(this, [this[i], i, this]);
			}
		},
		push: function(){
			return a.push.apply(this, arguments);
		}
	};
	
	var EventRegistry = {
		reg: {},
		get: function(el){
			
			var els, events, key = el.toString();
			
			var reg = this.reg[key];
			if (!reg.els){
				els = reg.els = [];
			}
			else{
				els = reg.els;
			}
			if (!reg.events){
				events = reg.events = [];
			}
			else{
				events = reg.events;
			}
			
			var idx = els.indexOf(el);
			if (idx === -1){
				idx = els.length;
				els.push(el);
				events[idx] = {};
			}
			return events[idx];
		}
	};
	
	  var merge = function () {
        var m, arg, i = 1,
            base = arguments[0];
        for (; i < arguments.length; i++) {
            arg = arguments[i];
            for (m in arg) {
                if (arg.hasOwnProperty(m)) {
                    base[m] = arg[m];
                }
            }
        }
        return base;
    },
    extend = function (protoProps, staticProps) {
        var parent = this;
        var child;
        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent constructor.
        if (protoProps && protoProps.hasOwnProperty('constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }
        // Add static properties to the constructor function, if supplied.
        merge(child, parent, staticProps);
        // Set the prototype chain to inherit from `parent`, without calling
        // `parent` constructor function.
        var Surrogate = function () {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) merge(child.prototype, protoProps);
        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;
        return child;
    };
	
	
	
	Collection.extend = extend;
	var joshQuery = Collection.extend(
		{
			on : function(ev, fn){
			this.addEventListener(ev, function(){
				fn.apply(this, arguments);
			}, false);
			EventRegistry.get(this);
			}
		}
	);
	
	var $ = window.$ = function(selector, context){
		return new joshQuery(selector, context);
	};
	
	console.log($());


	//el.on('click', function(args){
	//});

	var Ajax = {
		request: function(conType, url){
			var xml = new XMLHttpRequest();
			xml.open(conType, url);
			xml.send();
			//xml.onload= function(){ window.console.log(arguments); JSON.parse(this.response); };
			xml.onreadystatechange = function() {
  				if (xml.readyState==4 && xml.status==200) {
					console.log(arguments);
					console.log(xml.response);
					console.log(xml.responseText);
					//JSON.parse(this.response);
    				document.getElementById("responseContainer").innerHTML=xml.responseText;
				}
			};
		}
	};

	var Text = {
		getCaret: function(el){
			if (el.createTextRange) { //ie support
				var r = document.selection.createRange().duplicate();
				r.moveEnd('character', el.value.length);
				if (r.text == '') {
					return el.value.length;
				}
				return el.value.lastIndexOf(r.text);
			}
			else { //widely supported
				return el.selectionStart;
			}
		},
		getTextSelection: function(){
			var selection = '';
		    if (window.getSelection) {
		        selection = window.getSelection().toString();
		    }
		    else if (document.selection && document.selection.type != 'Control') {
		        selection = document.selection.createRange().text;
		    }
		    return selection;
		},
		getTextProperty: function(el){
			var prop;
			((el.tagName == "TEXTAREA") || (el.tagName == "INPUT")) ?  prop="value" : prop="innerHTML";
			return prop;
		},
		singleBind: function(src, target){
			var srcEl = document.getElementById(src);
			var targetEl = document.getElementById(target);
			var srcProp = Text.getTextProperty(srcEl);
			var targetProp = Text.getTextProperty(targetEl);
			
			targetEl[targetProp] = srcEl[srcProp];
			
			srcEl.addEventListener('change', function(){
				targetEl[targetProp] = srcEl[srcProp];
			}, false);
			srcEl.addEventListener('keydown', function(){
				targetEl[targetProp] = srcEl[srcProp];
			}, false);
			srcEl.addEventListener('keyup', function(){
				targetEl[targetProp] = srcEl[srcProp];
			}, false);
		},
		doubleBind: function(yin, yang){
			var yinEl = document.getElementById(yin);
			var yangEl = document.getElementById(yang);
			var yinProp = Text.getTextProperty(yinEl);
			var yangProp = Text.getTextProperty(yangEl);
			
			yangEl[yangProp] = yinEl[yinProp];
			
			yinEl.addEventListener('change', function(){
				yangEl[yangProp] = yinEl[yinProp];
			}, false);
			yangEl.addEventListener('change', function(){
				yinEl[yinProp] = yangEl[yangProp];
			}, false);
			yinEl.addEventListener('keyup', function(){
				yangEl[yangProp] = yinEl[yinProp];
			}, false);
			yangEl.addEventListener('keyup', function(){
				yinEl[yinProp] = yangEl[yangProp];
			}, false);
			yinEl.addEventListener('keydown', function(){
				yangEl[yangProp] = yinEl[yinProp];
			}, false);
			yangEl.addEventListener('keydown', function(){
				yinEl[yinProp] = yangEl[yangProp];
			}, false);
		}

		//add 32, 27
		/*var keyCodes = { backspace:8, enter:13, left:37, up:38, right:39,down:40, del:46, f5:116};
		getKeyName: function(keyCode){
			for (var prop in keyCodes) {
			  console.log("keyCodes." + prop + " = " + obj[prop]);
				if (obj[prop] === keyCode){
					console.log(keyCode+'='+prop);
				}
			}
		}*/
	};


// driver
	function updateCaretTracker(){
		document.getElementById('caretPosition').innerHTML = Text.getCaret(document.getElementById('txtSource'));
	}

	document.addEventListener('DOMContentLoaded', function(ev) {
		Text.singleBind('txtSource', 'target');
		Text.doubleBind('txtYin', 'txtYang');
		Text.doubleBind('txtYin2', 'txtYang2');
		Text.doubleBind('txtYin3', 'txtYang3');
		Text.doubleBind('yin4', 'yang4');
		document.addEventListener('keydown', function(ev){
			console.log('keycode: '+ev.keyCode);
			updateCaretTracker();
			/*if (ev.keyCode === Text.keyCodes.enter){
				console.log('enter detected by Text.keyCodes.enter');
			}
			console.log('getting key name: '+Text.getKeyName(ev.keyCode));*/
		});
		document.getElementById('txtSource').addEventListener('select', function(){
			updateCaretTracker();
			document.getElementById('selected').innerHTML = Text.getTextSelection();
		}, false);
		document.getElementById('txtSource').addEventListener('blur', function(){
			updateCaretTracker();
			document.getElementById('selected').innerHTML = '';
		}, false);
		document.getElementById('txtSource').addEventListener('focus', function(){
			updateCaretTracker();
		}, false);
		document.getElementById('txtSource').addEventListener('click', function(){
			updateCaretTracker();
		}, false);
		
		//AJAX test
		document.getElementById('btnAjaxTest').addEventListener('click', function(){
			var c = document.getElementById('txtConType').value;
			var url = document.getElementById('txtUrl').value;
			Ajax.request(c, url);
		}, false);
	});
	window.addEventListener('onload', function(){
	}, false);
	
	var boo = new Collection();
	boo.push('car', 'cat', 'bat');
	boo.each(function(){
		console.log(arguments);
	});
}());