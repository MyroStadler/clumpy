function clumpy_preload_Audio() {
    this.version = '1';
    this.debug = true;
    
    this.nAudioLoading = 0;
    this.nAudioLoaded = 0;
    this.audioLoading = {};
    this.audioProgressCallback;
    this.onAudioLoadedDelegate = this.onAudioLoaded.bindContext(this);
}
clumpy_preload_Audio.prototype.preload = function(urlsArray, progressCallback) {
    var url, i, aud;
    for(url in this.audioLoading) {
        this.audioLoading[url].load();
        this.audioLoading[url].removeAttribute('src');
        this.audioLoading[url].removeEventListener('canplaythrough', this.onAudioLoadedDelegate, false);
        delete this.audioLoading[url];
    }
    this.audioProgressCallback = progressCallback;
    this.nAudioLoading = 0;
    this.nAudioLoaded = 0;
    for(i=0; i<urlsArray.length; i++) {
        url = urlsArray[i];
        if(!this.audioLoading[url]) {
            this.nAudioLoading++;
            aud = new Audio();
            aud.src = url;
            this.audioLoading[aud.src] = aud;
            aud.addEventListener('canplaythrough', this.onAudioLoadedDelegate, false);
        }
    }
};

// this is bound through bindContext - 
clumpy_preload_Audio.prototype.onAudioLoaded = function(e) {
    var target = clumpy.getEventCurrentTarget(e);
    if(this.audioLoading[target.src]){
        this.nAudioLoaded++;
        delete this.audioLoading[target.src];
        // progress callback has two params: progress 0-1 and src
        this.audioProgressCallback.call(null, this.nAudioLoading ? this.nAudioLoaded / this.nAudioLoading : 0, target.src);
    }
};