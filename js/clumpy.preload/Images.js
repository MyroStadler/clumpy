// requires: clumpy
function clumpy_preload_Images() {
    this.version = '1';
    this.debug = true;
    this.nImagesLoading = 0;
    this.nImagesLoaded = 0;
    this.imagesLoading = {};
    this.imageProgressCallback;
    this.onImageLoadedDelegate = this.onImageLoaded.bindContext(this);
}
clumpy_preload_Images.prototype.preload = function(urlsArray, progressCallback) {
    var url, i, img;
    for(url in this.imagesLoading) {
        this.imagesLoading[url].removeAttribute('src');
        this.imagesLoading[url].onload = null;
        delete this.imagesLoading[url];
    }
    this.imageProgressCallback = progressCallback;
    this.nImagesLoading = 0;
    this.nImagesLoaded = 0;
    for(i=0; i<urlsArray.length; i++) {
        url = urlsArray[i];
        if(!this.imagesLoading[url]) {
            this.nImagesLoading++;
            img = new Image();
            img.src = url;
            this.imagesLoading[img.src] = img;
            img.onload = this.onImageLoadedDelegate;
        }
    }
};
clumpy_preload_Images.prototype.onImageLoaded = function(e) {
    var currentTarget = clumpy.getEventCurrentTarget(e);
    if(this.imagesLoading[currentTarget.src]){
        this.nImagesLoaded++;
        delete this.imagesLoading[currentTarget.src];
        // progress callback has two params: progress 0-1 and src
        this.imageProgressCallback.call(null, this.nImagesLoading ? this.nImagesLoaded / this.nImagesLoading : 0, currentTarget.src);
    }
};
clumpy_preload_Images.prototype.log = function(msg) {
    if(!this.debug) {
        return;
    }
    clumpy.log(msg);
};