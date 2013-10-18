// requires: clumpy_canvas_CanvasLayer, clumpy_grid_Grid, clumpy_eventing_Callbacks
function clumpy_canvas_CanvasAnimation(
        name, 
        canvas,  
        nFrames, 
        frameSizeX, 
        frameSizeY) {
    clumpy_canvas_CanvasLayer.call(this, name, canvas);
    this.nFrames = nFrames ? nFrames : 1;
    this.width = 500;//frameSizeX ? frameSizeX : 0;
    this.height = 500;//frameSizeY ? frameSizeY : 0;
    this.grid = new clumpy_grid_Grid(nFrames, NaN, frameSizeX, frameSizeY);
    this.state = 1;
    this.frame = 1;
}
clumpy_canvas_CanvasAnimation.EVENT_SPRITE_IMAGE_LOADED = 'onSpriteImageLoaded';
clumpy_canvas_CanvasAnimation.prototype = new clumpy_canvas_CanvasLayer();
clumpy_canvas_CanvasAnimation.prototype.constructor = clumpy_canvas_CanvasAnimation;
clumpy_canvas_CanvasAnimation.prototype.nextFrame = function(render){
    var frame = this.frame + 1;
    if(frame > this.nFrames) {
        frame = 1;
    }
    this.frame = frame;
    if(render) {
        this.render();
    }
};
clumpy_canvas_CanvasAnimation.prototype.setSpriteUrl = function(url){
    this._spriteLoaded = false;
    this._spriteUrl = url;
    this._spriteImage = new Image();
    this._spriteImage.onload = this._onSpriteImageLoaded.bindContext(this);
    this._spriteImage.src = this._spriteUrl;
};
clumpy_canvas_CanvasAnimation.prototype._onSpriteImageLoaded = function(e){
    this._spriteLoaded = true;
    clumpy_eventing_Callbacks.call(clumpy_canvas_CanvasAnimation.EVENT_SPRITE_IMAGE_LOADED, this);
};
clumpy_canvas_CanvasAnimation.prototype.prevFrame = function(render){
    var frame = this.frame - 1;
    if(frame < 1) {
        frame = this.nFrames;
    }
    this.frame = frame;
    if(render) {
        this.render();
    }
};
clumpy_canvas_CanvasAnimation.prototype.render = function(){
    if(!this._spriteLoaded) {
        return;
    }
    clumpy_canvas_CanvasLayer.prototype.render.call(this);
    var rect = this.grid.getRectByNumbers(this.frame, this.state);
    var d2 = this.canvas.getContext('2d');
    d2.drawImage(this._spriteImage, 
            rect.x, rect.y, rect.width, rect.height,
            0, 0, rect.width, rect.height);
};

