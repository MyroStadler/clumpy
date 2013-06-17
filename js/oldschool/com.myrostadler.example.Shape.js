function Shape(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
}
Shape.prototype.shapeTest = function() {
    console.log('shapeTest');
}
Shape.prototype.render = function(canvas) {
    console.log('Rendering Shape to canvas ');
}
