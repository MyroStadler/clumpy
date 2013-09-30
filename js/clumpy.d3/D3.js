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

/*
 * http://freespace.virgin.net/hugo.elias/routines/3d_to_2d.htm

screen.x = x / z * zoom
screen.y = y / z * zoom

This will produce the screen coordinates of the 3D point.

zoom is the  is the distance beetween the origin and the 45° mark. By altering the zoom, or changing 
it independantly for the x and y lines, effects like fish eye can be produced.

x, y and z are the 3D coordinates of the point, screen.x and screen.y are the 2D coordinates of the 
point as it would appear on the screen.

This rountine assumes that the centre of your screen is the origin. So that coordinates (0, 0) are 
in the centre of your screen. However, practically, you will never be in a situation with a PC, 
where the origin is in the centre of the screen, it is always at the top right hand corner. So to 
compensate, half the screen's width and height must be added. That is that if you have a screen 
resulution of 640x480, your centre will be (320, 240). So that must be added to the routine.

screen.x = x / z * zoom + centre.x
screen.y = y / z * zoom + centre.y

The camera in this routine is looking straight down the z axis with x for left and right, and y for 
up and down. If z is negative, the point will be behind the camera, and so will not be visible, so 
this must be added to the routine.
 
if z > 0 then
    screen.x = x / z * zoom + centre.x
    screen.y = y / z * zoom + centre.y
end if
 
If the camera has to move about, and change angle, every coordinate entering this routine must be 
transformed. I will use position for the position of the camera, and pan for the camera panning, 
and new just for temporary calculations.


procedure 3Dto2D (x, y, z, pan, centre, position)
 
x = x + position.x
y = y + position.y
z = z + position.z
 
new.x = x*cos(pan.x) - z*sin(pan.x)
new.z = x*sin(pan.x) + z*cos(pan.x)
new.y = y*cos(pan.y) - new.z*sin(pan.y)

z = new.y*cos(pan.y) - new.z*sin(pan.y)
x = new.x*cos(pan.z) - new.y*sin(pan.z)
y = new.x*sin(pan.z) + new.y*cos(pan.z)
 
if z > 0 then
    screen.x = x / z * zoom + centre.x
    screen.y = y / z * zoom + centre.y
end if


 */