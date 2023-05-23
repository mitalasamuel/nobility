!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)}(function(A){var a,e=navigator.userAgent,R=/iphone/i.test(e),S=/chrome/i.test(e),T=/android/i.test(e);A.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},A.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden")&&this.get(0)===document.activeElement)return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&((n=this.createTextRange()).collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,l){var n,b,u,k,y,x,j,e;return!t&&0<this.length?(e=A(this[0]).data(A.mask.dataName))?e():void 0:(l=A.extend({autoclear:A.mask.autoclear,placeholder:A.mask.placeholder,completed:null},l),n=A.mask.definitions,b=[],u=x=t.length,k=null,t=String(t),A.each(t.split(""),function(e,t){"?"==t?(x--,u=e):n[t]?(b.push(new RegExp(n[t])),null===k&&(k=b.length-1),e<u&&(y=b.length-1)):b.push(null)}),this.trigger("unmask").each(function(){var f=A(this),s=A.map(t.split(""),function(e,t){if("?"!=e)return n[e]?g(t):e}),o=s.join(""),i=f.val();function h(){if(l.completed){for(var e=k;e<=y;e++)if(b[e]&&s[e]===g(e))return;l.completed.call(f)}}function g(e){return e<l.placeholder.length?l.placeholder.charAt(e):l.placeholder.charAt(0)}function m(e){for(;++e<x&&!b[e];);return e}function d(e,t){var n,a;if(!(e<0)){for(n=e,a=m(t);n<x;n++)if(b[n]){if(!(a<x&&b[n].test(s[a])))break;s[n]=s[a],s[a]=g(a),a=m(a)}v(),f.caret(Math.max(k,e))}}function r(e){c(),f.val()!=i&&f.change()}function p(e,t){for(var n=e;n<t&&n<x;n++)b[n]&&(s[n]=g(n))}function v(){f.val(s.join(""))}function c(e){for(var t,n=f.val(),a=-1,i=0,r=0;i<x;i++)if(b[i]){for(s[i]=g(i);r++<n.length;)if(t=n.charAt(r-1),b[i].test(t)){s[i]=t,a=i;break}if(r>n.length){p(i+1,x);break}}else s[i]===n.charAt(r)&&r++,i<u&&(a=i);return e?v():a+1<u?l.autoclear||s.join("")===o?(f.val()&&f.val(""),p(0,x)):v():(v(),f.val(f.val().substring(0,a+1))),u?i:k}f.data(A.mask.dataName,function(){return A.map(s,function(e,t){return b[t]&&e!=g(t)?e:null}).join("")}),f.one("unmask",function(){f.off(".mask").removeData(A.mask.dataName)}).on("focus.mask",function(){var e;f.prop("readonly")||(clearTimeout(a),i=f.val(),e=c(),a=setTimeout(function(){f.get(0)===document.activeElement&&(v(),e==t.replace("?","").length?f.caret(0,e):f.caret(e))},10))}).on("blur.mask",r).on("keydown.mask",function(e){var t,n,a;f.prop("readonly")||(t=e.which||e.keyCode,j=f.val(),8===t||46===t||R&&127===t?(n=(a=f.caret()).begin,(a=a.end)-n==0&&(n=46!==t?function(e){for(;0<=--e&&!b[e];);return e}(n):a=m(n-1),a=46===t?m(a):a),p(n,a),d(n,a-1),e.preventDefault()):13===t?r.call(this,e):27===t&&(f.val(i),f.caret(0,c()),e.preventDefault()))}).on("keypress.mask",function(e){if(!f.prop("readonly")){var t,n,a,i=e.which||e.keyCode,r=f.caret();if(!(e.ctrlKey||e.altKey||e.metaKey||i<32)&&i&&13!==i){if(r.end-r.begin!=0&&(p(r.begin,r.end),d(r.begin,r.end-1)),(t=m(r.begin-1))<x&&(n=String.fromCharCode(i),b[t].test(n))){for(var o,c,l=t,u=g(t);l<x;l++)if(b[l]){if(o=m(l),c=s[l],s[l]=u,!(o<x&&b[o].test(c)))break;u=c}s[t]=n,v(),a=m(t),T?setTimeout(function(){A.proxy(A.fn.caret,f,a)()},0):f.caret(a),r.begin<=y&&h()}e.preventDefault()}}}).on("input.mask paste.mask",function(){f.prop("readonly")||setTimeout(function(){var e=c(!0);f.caret(e),h()},0)}),S&&T&&f.off("input.mask").on("input.mask",function(e){function t(){A.proxy(A.fn.caret,f,a.begin,a.begin)()}var n=f.val(),a=f.caret();if(j&&j.length&&j.length>n.length){for(c(!0);0<a.begin&&!b[a.begin-1];)a.begin--;if(0===a.begin)for(;a.begin<k&&!b[a.begin];)a.begin++}else{var i=c(!0),n=n.charAt(a.begin);a.begin<x&&(b[a.begin]?b[a.begin].test(n)&&a.begin++:a.begin=i)}setTimeout(t,0),h()}),c()}))}})});