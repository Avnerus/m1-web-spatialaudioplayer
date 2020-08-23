"use strict";function _instanceof(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](e):e instanceof t}function _classCallCheck(e,t){if(!_instanceof(e,t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _classPrivateFieldSet(e,t,i){var a=t.get(e);if(!a)throw new TypeError("attempted to set private field on non-instance");if(a.set)a.set.call(e,i);else{if(!a.writable)throw new TypeError("attempted to set read only private field");a.value=i}return i}function _classPrivateFieldGet(e,t){var i=t.get(e);if(!i)throw new TypeError("attempted to get private field on non-instance");return i.get?i.get.call(e):i.value}var _soundFilesCount=new WeakMap,_soundFilesCountReady=new WeakMap,_isDeleted=new WeakMap,_isFromBuffer=new WeakMap,_isPlaying=new WeakMap,_isSoundReady=new WeakMap,_buffer=new WeakMap,_gainNode=new WeakMap,_gains=new WeakMap,_pannerNode=new WeakMap,_smp=new WeakMap,_cache=new WeakMap,_audioContext=new WeakMap,_startTime=new WeakMap,_stopTime=new WeakMap,_currentTime=new WeakMap,_needToPlay=new WeakMap,_playLooped=new WeakMap,_waitToPlay=new WeakMap,_initArray=new WeakMap,_setGains=new WeakMap,_preload=new WeakMap,Mach1SoundPlayer=function(){function e(t){var i=this;if(_classCallCheck(this,e),_soundFilesCount.set(this,{writable:!0,value:0}),_soundFilesCountReady.set(this,{writable:!0,value:0}),_isDeleted.set(this,{writable:!0,value:!1}),_isFromBuffer.set(this,{writable:!0,value:!1}),_isPlaying.set(this,{writable:!0,value:!1}),_isSoundReady.set(this,{writable:!0,value:!1}),_buffer.set(this,{writable:!0,value:void 0}),_gainNode.set(this,{writable:!0,value:void 0}),_gains.set(this,{writable:!0,value:void 0}),_pannerNode.set(this,{writable:!0,value:void 0}),_smp.set(this,{writable:!0,value:void 0}),_cache.set(this,{writable:!0,value:{}}),_audioContext.set(this,{writable:!0,value:window.AudioContext?new window.AudioContext:new window.webkitAudioContext}),_startTime.set(this,{writable:!0,value:0}),_stopTime.set(this,{writable:!0,value:0}),_currentTime.set(this,{writable:!0,value:function(){return i.isReady()&&_classPrivateFieldGet(i,_isPlaying)?_classPrivateFieldGet(i,_audioContext).currentTime-_classPrivateFieldGet(i,_startTime):_classPrivateFieldGet(i,_stopTime)-_classPrivateFieldGet(i,_startTime)>0?_classPrivateFieldGet(i,_stopTime)-_classPrivateFieldGet(i,_startTime):0}}),_needToPlay.set(this,{writable:!0,value:!1}),_playLooped.set(this,{writable:!0,value:!1}),_waitToPlay.set(this,{writable:!0,value:0}),_initArray.set(this,{writable:!0,value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_classPrivateFieldGet(i,_soundFilesCount);return new Array(e).fill(0)}}),_setGains.set(this,{writable:!0,value:function(){if(i.isReady()&&_classPrivateFieldGet(i,_isPlaying))for(var e=0;e<_classPrivateFieldGet(i,_smp).length;e+=1)_classPrivateFieldGet(i,_gainNode)[e].gain.setTargetAtTime(_classPrivateFieldGet(i,_gains)[e],_classPrivateFieldGet(i,_audioContext).currentTime,.05)}}),_preload.set(this,{writable:!0,value:async function(e,t){console.time("load file ".concat(e));try{var a=await fetch(e,{cache:"force-cache",method:"GET",responseType:"arrayBuffer"});if(!a.ok)throw new Error(a.statusText);var s=await a.arrayBuffer(),l=await function(t){return new Promise(function(a){_classPrivateFieldGet(i,_cache)[e]?a(_classPrivateFieldGet(i,_cache)[e]):_classPrivateFieldGet(i,_audioContext).decodeAudioData(t,function(t){_classPrivateFieldGet(i,_cache)[e]=t,a(t)},function(){return console.error("AudioContext issue")})})}(s);_classPrivateFieldGet(i,_buffer)[t]=l,console.log("Mach1Sound {path: ".concat(e,", i: ").concat(2*t,", ").concat(2*t+1,"} loaded")),console.timeEnd("load file ".concat(e)),_classPrivateFieldSet(i,_soundFilesCountReady,_classPrivateFieldGet(i,_soundFilesCountReady)+2),_classPrivateFieldSet(i,_isSoundReady,_classPrivateFieldGet(i,_soundFilesCountReady)===_classPrivateFieldGet(i,_soundFilesCount))}catch(t){throw _classPrivateFieldSet(i,_isSoundReady,!1),console.timeEnd("doesn't load file ".concat(e)),new Error("Can't load sound files; Completed ".concat(_classPrivateFieldGet(i,_soundFilesCountReady),"/").concat(_classPrivateFieldGet(i,_soundFilesCount)))}}}),Object.getPrototypeOf(t)===AudioBuffer.prototype){_classPrivateFieldSet(this,_isFromBuffer,!0);var a=t;_classPrivateFieldSet(this,_soundFilesCount,2*a.numberOfChannels),_classPrivateFieldSet(this,_buffer,a),_classPrivateFieldSet(this,_gainNode,_classPrivateFieldGet(this,_initArray).call(this)),_classPrivateFieldSet(this,_gains,_classPrivateFieldGet(this,_initArray).call(this)),_classPrivateFieldSet(this,_pannerNode,_classPrivateFieldGet(this,_initArray).call(this)),_classPrivateFieldSet(this,_smp,_classPrivateFieldGet(this,_initArray).call(this)),_classPrivateFieldSet(this,_isSoundReady,!0)}else if(Array.isArray(t)){_classPrivateFieldSet(this,_isFromBuffer,!1);var s=t;_classPrivateFieldSet(this,_soundFilesCount,2*s.length),_classPrivateFieldSet(this,_buffer,_classPrivateFieldGet(this,_initArray).call(this,s.length)),_classPrivateFieldSet(this,_gainNode,_classPrivateFieldGet(this,_initArray).call(this,s.length)),_classPrivateFieldSet(this,_gains,_classPrivateFieldGet(this,_initArray).call(this,s.length)),_classPrivateFieldSet(this,_pannerNode,_classPrivateFieldGet(this,_initArray).call(this,s.length)),_classPrivateFieldSet(this,_smp,_classPrivateFieldGet(this,_initArray).call(this,s.length)),s.forEach(_classPrivateFieldGet(this,_preload))}else console.error("Mach1SoundPlayer can't parse input!")}return _createClass(e,[{key:"play",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:_classPrivateFieldGet(this,_currentTime).call(this);if(!this.isReady()||_classPrivateFieldGet(this,_isPlaying)||_classPrivateFieldGet(this,_isDeleted))_classPrivateFieldSet(this,_needToPlay,!0),_classPrivateFieldSet(this,_playLooped,e),_classPrivateFieldSet(this,_waitToPlay,t);else{if(this.isReady()&&!_classPrivateFieldGet(this,_isPlaying)){for(var i=0,a=0;a<_classPrivateFieldGet(this,_soundFilesCount)/2;a+=1,i+=2)_classPrivateFieldGet(this,_smp)[i]=_classPrivateFieldGet(this,_audioContext).createBufferSource(),_classPrivateFieldGet(this,_isFromBuffer)?(_classPrivateFieldGet(this,_smp)[i].buffer=_classPrivateFieldGet(this,_audioContext).createBuffer(1,_classPrivateFieldGet(this,_buffer).length/_classPrivateFieldGet(this,_buffer).numberOfChannels,_classPrivateFieldGet(this,_audioContext).sampleRate),_classPrivateFieldGet(this,_smp)[i].buffer.copyToChannel(_classPrivateFieldGet(this,_buffer).getChannelData(a),0,0)):_classPrivateFieldGet(this,_smp)[i].buffer=_classPrivateFieldGet(this,_buffer)[a],_classPrivateFieldGet(this,_gainNode)[i]=_classPrivateFieldGet(this,_audioContext).createGain(),_classPrivateFieldGet(this,_gainNode)[i].gain.value=0,_classPrivateFieldGet(this,_pannerNode)[i]=_classPrivateFieldGet(this,_audioContext).createPanner(),_classPrivateFieldGet(this,_pannerNode)[i].setPosition(-1,0,0),_classPrivateFieldGet(this,_pannerNode)[i].panningModel="equalpower",_classPrivateFieldGet(this,_smp)[i].connect(_classPrivateFieldGet(this,_pannerNode)[i]),_classPrivateFieldGet(this,_pannerNode)[i].connect(_classPrivateFieldGet(this,_gainNode)[i]),_classPrivateFieldGet(this,_gainNode)[i].connect(_classPrivateFieldGet(this,_audioContext).destination),_classPrivateFieldGet(this,_smp)[i+1]=_classPrivateFieldGet(this,_audioContext).createBufferSource(),_classPrivateFieldGet(this,_isFromBuffer)?(_classPrivateFieldGet(this,_smp)[i+1].buffer=_classPrivateFieldGet(this,_audioContext).createBuffer(1,_classPrivateFieldGet(this,_buffer).length/_classPrivateFieldGet(this,_buffer).numberOfChannels,_classPrivateFieldGet(this,_audioContext).sampleRate),_classPrivateFieldGet(this,_smp)[i+1].buffer.copyToChannel(_classPrivateFieldGet(this,_buffer).getChannelData(a),0,0)):_classPrivateFieldGet(this,_smp)[i+1].buffer=_classPrivateFieldGet(this,_buffer)[a],_classPrivateFieldGet(this,_gainNode)[i+1]=_classPrivateFieldGet(this,_audioContext).createGain(),_classPrivateFieldGet(this,_gainNode)[i+1].gain.value=0,_classPrivateFieldGet(this,_pannerNode)[i+1]=_classPrivateFieldGet(this,_audioContext).createPanner(),_classPrivateFieldGet(this,_pannerNode)[i+1].setPosition(1,0,0),_classPrivateFieldGet(this,_pannerNode)[i+1].panningModel="equalpower",_classPrivateFieldGet(this,_smp)[i+1].connect(_classPrivateFieldGet(this,_pannerNode)[i+1]),_classPrivateFieldGet(this,_pannerNode)[i+1].connect(_classPrivateFieldGet(this,_gainNode)[i+1]),_classPrivateFieldGet(this,_gainNode)[i+1].connect(_classPrivateFieldGet(this,_audioContext).destination);for(var s=0;s<_classPrivateFieldGet(this,_soundFilesCount);s+=1)_classPrivateFieldGet(this,_smp)[s].loop=e,_classPrivateFieldGet(this,_smp)[s].start(0,t);_classPrivateFieldSet(this,_startTime,_classPrivateFieldGet(this,_audioContext).currentTime-t),_classPrivateFieldSet(this,_isPlaying,!0)}_classPrivateFieldGet(this,_setGains).call(this)}}},{key:"stop",value:function(){if(this.isReady()&&_classPrivateFieldGet(this,_isPlaying)&&!_classPrivateFieldGet(this,_isDeleted)){_classPrivateFieldSet(this,_isPlaying,!1),_classPrivateFieldSet(this,_needToPlay,!1),_classPrivateFieldSet(this,_stopTime,_classPrivateFieldGet(this,_audioContext).currentTime);for(var e=0;e<_classPrivateFieldGet(this,_smp).length;e+=1)_classPrivateFieldGet(this,_smp)[e].stop(),"function"==typeof _classPrivateFieldGet(this,_smp)[e].disconnect&&_classPrivateFieldGet(this,_smp)[e].disconnect()}}},{key:"pause",value:function(){this.stop()}},{key:"remove",value:function(){this.isReady()&&_classPrivateFieldGet(this,_smp).forEach(function(e){return e.stop()}),_classPrivateFieldSet(this,_isDeleted,!0)}},{key:"rewind",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.stop(),this.play(e>=0?e:0)}},{key:"isReady",value:function(){return _classPrivateFieldGet(this,_isSoundReady)&&!_classPrivateFieldGet(this,_isDeleted)}},{key:"isPlaying",value:function(){return _classPrivateFieldGet(this,_isPlaying)}},{key:"progress",get:function(){return(_classPrivateFieldGet(this,_soundFilesCountReady)/_classPrivateFieldGet(this,_soundFilesCount)*100).toFixed(0)}},{key:"gains",set:function(e){if(Array.isArray(e))for(var t=0;t<_classPrivateFieldGet(this,_soundFilesCount);t+=1)_classPrivateFieldGet(this,_gains)[t]=e[t];_classPrivateFieldGet(this,_isPlaying)&&_classPrivateFieldGet(this,_setGains).call(this)}}]),e}();
