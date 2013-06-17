function Circle(x, y, colour, radius) {
    Shape.call(this, x, y, colour);
    this.radius = radius;
}
// inherit from shape
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;
// add method
Circle.prototype.circleTest = function() {
    console.log('circleTest');
}
// override method
Circle.prototype.render = function(canvas) {
    console.log('Rendering Circle to canvas ');
}
