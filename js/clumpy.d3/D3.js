// requires: clumpy.math.Trig
function clumpy_d3_D3(scale, fov, middleZ, xTilt) {
    this.scale = scale ? scale : 1;
    this.fov = fov ? fov : 500;
    this.middleZ = middleZ ? middleZ : 500;
    this.xTilt = xTilt ? xTilt : 0;
}
clumpy_d3_D3.prototype.flatten = function(xyz, pooledReturnObject) {
    var x = xyz.x;
    var y = xyz.y;
    var z = xyz.z;
    var ret = pooledReturnObject ? pooledReturnObject : {};
    if (this.xTilt !== 0) {
            var ao = clumpy_math_Trig.rotate({a: z, o: y}, clumpy_math_Trig.radians(this.xTilt));
            z = ao.a;
            y = ao.o;
    }
    z += this.middleZ;
    if (z === 0) {
            z = 0.001;
    }
    ret.x = (this.fov * (x / z)) * this.scale;
    ret.y = (this.fov * (y / z)) * this.scale;
    ret.scale = (this.fov / z) * this.scale;
    return ret;
};