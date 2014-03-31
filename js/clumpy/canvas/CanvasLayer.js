// requires: clumpy_core_Clumpy
function clumpy_canvas_CanvasLayer(name, canvas){
//    console.log('name2 ' + name);
//    console.log('canvas2 ' + canvas);
    this.canvas = canvas ? canvas : document.createElement("canvas");
    this.canvas.style.position = 'absolute';
    this.id = clumpy.uuid();
    this.name = name;
    this.renderFunction = null;
    this.renderFunctionArgs = null;
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.xyz = {x:0, y:0, z:0};
    this.width = 0;
    this.height = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    return this;
}
clumpy_canvas_CanvasLayer.prototype.set = function(props) {
    for(var i in props){
        this[i] = props[i];
    }
    return this;
};
clumpy_canvas_CanvasLayer.prototype.render = function() {
    this.canvas.width = Math.round(this.width * this.scale);
    this.canvas.height = Math.round(this.height * this.scale);
    this.canvas.style.top = Math.round(this.y + (this.offsetY * this.scale)) + 'px';
    this.canvas.style.left = Math.round(this.x + (this.offsetX * this.scale)) + 'px';
    if(this.renderFunction){
        this.renderFunction.apply(this, this.renderFunctionArgs);
    }
};
