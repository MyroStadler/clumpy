// requires: clumpy_geom_AxialVelocity
function clumpy_canvas_CanvasSprite(
        name, 
        canvas,  
        nFrames, 
        frameSizeX, 
        frameSizeY) {
    clumpy_canvas_CanvasAnimation.call(this, name, canvas, nFrames, frameSizeX, frameSizeY);
    this.velocity = new clumpy_geom_AxialVelocity();
}

clumpy_canvas_CanvasSprite.prototype = new clumpy_canvas_CanvasAnimation();
clumpy_canvas_CanvasSprite.prototype.constructor = clumpy_canvas_CanvasSprite;

clumpy_canvas_CanvasSprite.prototype.moveD3 = function(){
    this.d3.x += this.velocity.vX;
    this.d3.y += this.velocity.vY;
    this.d3.z += this.velocity.vZ;
//    console.log(this.d3);
};
clumpy_canvas_CanvasSprite.prototype.move = function(){
    this.x += this.velocity.x;
    this.y += this.velocity.y;
};
clumpy_canvas_CanvasSprite.prototype.render = function(){
    clumpy_canvas_CanvasAnimation.prototype.render.call(this);
    //
};

