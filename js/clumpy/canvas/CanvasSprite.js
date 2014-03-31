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

clumpy_canvas_CanvasSprite.prototype.move = function(xyz){
    this.xyz.x += this.velocity.vX;
    this.xyz.y += this.velocity.vY;
    this.xyz.z += this.velocity.vZ;
    console.log(this.xyz);
};
clumpy_canvas_CanvasSprite.prototype.render = function(){
    clumpy_canvas_CanvasAnimation.prototype.render.call(this);
    //
};

