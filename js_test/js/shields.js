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
	
	var boo = new Collection();
	boo.push('car', 'cat', 'bat');
	boo.each(function(){
		console.log(arguments);
	});
	
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
		singleBind: function(src, target){
			console.log('single');
			var srcEl = document.getElementById(src);
			var targetEl = document.getElementById(target);
			console.log(srcEl);
			targetEl.innerHTML = srcEl.value;
			srcEl.addEventListener('keyup', function(){
				console.log('update bound: '+srcEl+'='+srcEl.value+' to '+targetEl);
				targetEl.innerHTML = srcEl.value;
			});
		},
		doubleBind: function(yin, yang){
			var yinEl = document.getElementById(yin);
			var yangEl = document.getElementById(yang);

			yinEl.addEventListener('keyup', function(){
				yangEl.innerHTML = yinEl.innerHTML;
			}, false);
			yangEl.addEventListener('keyup', function(){
				yinEl.innerHTML = yangEl.innerHTML;
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
}());