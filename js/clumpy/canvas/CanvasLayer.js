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
    this.z = 0;
    this.width = 0;
    this.height = 0;
    return this;
}
clumpy_canvas_CanvasLayer.prototype.set = function(props) {
    for(var i in props){
        this[i] = props[i];
    }
    return this;
};
clumpy_canvas_CanvasLayer.prototype.render = function() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.top = this.y + 'px';
    this.canvas.style.left = this.y + 'px';
    if(this.renderFunction){
        this.renderFunction.apply(this, this.renderFunctionArgs);
    }
};