window.clumpy = (function(modifyObjectPrototype, debug) {
    var version = '1';
    var clumpy = {};
    clumpy.debug = debug;
    var nImagesLoading = 0;
    var nImagesLoaded = 0;
    var imagesLoading = {};
    var audioProgressCallback;
    var nAudioLoading = 0;
    var nAudioLoaded = 0;
    var audioLoading = {};
    function clone(object) {
        function OneShotConstructor(){}
        OneShotConstructor.prototype = object;
        return new OneShotConstructor();
    }
    function forEachIn(object, action) {
        for (var property in object) {
            if (Object.prototype.propertyIsEnumerable.call(object, property)){
                action(property, object[property]);
            }
        }
    }
    function forEachInArray(array, action) {
        for (var i=0; i<array.length; i++) {
            action(i, array[i]);
        }
    }
    function log(msg) {
        if(!clumpy.debug) {
            return;
        }
        try {
            console.log(msg);
        } catch (exception) {
//          alert(msg);
            return;
        }
    }
    // needs to exist on this level so can be canceled
    var onAudioLoaded = function(e) {
        if(audioLoading[this.src]){
            nAudioLoaded++;
            delete audioLoading[this.src];
            // progress callback has two params: progress 0-1 and src
            audioProgressCallback.call(null, nAudioLoading ? nAudioLoaded / nAudioLoading : 0, this.src);
        }
    }
    function preloadAudio(urlsArray, progressCallback) {
        var url, i, aud;
        for(url in audioLoading) {
            audioLoading[url].load();
            audioLoading[url].removeAttribute('src');
            audioLoading[url].removeEventListener('canplaythrough', onAudioLoaded, false);
            delete audioLoading[url];
        }
        audioProgressCallback = progressCallback;
        nAudioLoading = 0;
        nAudioLoaded = 0;
        for(i=0; i<urlsArray.length; i++) {
            url = urlsArray[i];
            if(!audioLoading[url]) {
                nAudioLoading++;
                aud = new Audio();
                aud.src = url;
                audioLoading[aud.src] = aud;
                aud.addEventListener('canplaythrough', onAudioLoaded, false)
            }
        }
    }
    function preloadImages(urlsArray, progressCallback) {
        var url, i, img;
        for(url in imagesLoading) {
            imagesLoading[url].removeAttribute('src');
            imagesLoading[url].onload = null;
            delete imagesLoading[url];
        }
        nImagesLoading = 0;
        nImagesLoaded = 0;
        for(i=0; i<urlsArray.length; i++) {
            url = urlsArray[i];
            if(!imagesLoading[url]) {
                nImagesLoading++;
                img = new Image();
                img.src = url;
                imagesLoading[img.src] = img;
                img.onload = function() {
                    if(imagesLoading[this.src]){
                        nImagesLoaded++;
                        delete imagesLoading[this.src];
                        // progress callback has two params: progress 0-1 and src
                        progressCallback.call(null, nImagesLoading ? nImagesLoaded / nImagesLoading : 0, this.src);
                    }
                }
            }
        }
    }
    function goProto() {
        Object.prototype.inherit = function(baseConstructor) {
            this.prototype = clone(baseConstructor.prototype);
            this.prototype.constructor = this;
        };
        Object.prototype.method = function(name, func) {
            this.prototype[name] = func;
        };
        Object.prototype.create = function() {
            var object = clone(this);
            if (object.construct != undefined) {
                object.construct.apply(object, arguments);
            }
            return object;
        };
        Object.prototype.extend = function(properties) {
            var result = clone(this);
            forEachIn(properties, function(name, value) {
                result[name] = value;
            });
          return result;
        };
        Object.prototype.isA = function(prototype) {
            function DummyConstructor() {}
            DummyConstructor.prototype = prototype;
            return this instanceof DummyConstructor;
        };
    }
    clumpy.version = version;
    clumpy.goProto = function (){return goProto();}
    clumpy.clone = function (object){return clone(object);}
    clumpy.forEachIn = function (object, action){forEachIn(object, action);}
    clumpy.forEachInArray = function (array, action){forEachInArray(array, action);}
    clumpy.log = function(msg) {log(msg);}
    clumpy.preloadImages = function(urlsArray, progressCallback) {preloadImages(urlsArray, progressCallback);}
    clumpy.preloadAudio = function(urlsArray, progressCallback) {preloadAudio(urlsArray, progressCallback);}
    
    if(modifyObjectPrototype) {
        goProto();
    }
    return clumpy;
})(false, true);
