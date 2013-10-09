function clumpy_canvas_CanvasContainer(holder) {
    this.holder = holder;
    this.children = [];
    this.zOrderStartsAt = 1;
}
clumpy_canvas_CanvasContainer.prototype.render = function() {
    for(var i=0; i<this.children.length; i++) {
        this.children[i].render();
    }
};
clumpy_canvas_CanvasContainer.prototype.applyZ = function() {
    for(var i=0; i<this.children.length; i++) {
        this.children[i].canvas.style.zIndex = i + this.zOrderStartsAt;
    }
};
clumpy_canvas_CanvasContainer.prototype.getChildByName = function(name) {
    for(var i=0; i<this.children.length; i++) {
        if(this.children[i].name === name){
            return this.children[i];
        }
    } 
    return null;
};
clumpy_canvas_CanvasContainer.prototype.contains = function(child) {
    for(var i=0; i<this.children.length; i++) {
        if(this.children[i].id === child.id){
            return true;
        }
    } 
    return false;
};
clumpy_canvas_CanvasContainer.prototype.setChildIndex = function(child, index, doNotApplyZ) {
    var index = this.getChildIndex(child);
    if(isNaN(index)){
        return;
    }
    this.addChildAt(child, index, doNotApplyZ);
};
clumpy_canvas_CanvasContainer.prototype.getChildIndex = function(child) {
    for(var i=0; i<this.children.length; i++) {
        if(this.children[i].id === child.id){
            return i;
        }
    } 
    return NaN;
};
clumpy_canvas_CanvasContainer.prototype.getChildAt = function(index) {
    return this.children[index];
};
clumpy_canvas_CanvasContainer.prototype.addChildAt = function(child, index, doNotApplyZ) {
    this.removeChild(child);
    this.children.splice(index, 0, child);
    if(!doNotApplyZ){
        this.applyZ();
    }
    this.holder.appendChild(child.canvas);
    return this;
};
clumpy_canvas_CanvasContainer.prototype.addChild = function(child) {
    this.removeChild(child);
    child.canvas.style.zIndex = this.zOrderStartsAt + this.children.length;
    this.holder.appendChild(child.canvas);
    this.children.push(child);
    return this;
};
clumpy_canvas_CanvasContainer.prototype.getNumChildren = function() {
    return this.children.length;
};
clumpy_canvas_CanvasContainer.prototype.removeChild = function(child) {
    if(child.canvas.parentNode){
        child.canvas.parentNode.removeChild(child);
    }
    var index = this.getChildIndex(child);
    if(!isNaN(index)){
        this.children.splice(index, 1);
    }
};
clumpy_canvas_CanvasContainer.prototype.removeChildAt = function(index) {
    var child = this.getChildAt(index);
    if(child.canvas.parentNode){
        child.canvas.parentNode.removeChild(child);
    }
    var index = this.getChildIndex(child);
    if(!isNaN(index)){
        this.children.splice(index, 1);
    }
};

