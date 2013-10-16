function clumpy_math_Ease() {
    // t - current time
    // b - start value
    // c - change in value
    // d - duration
}
clumpy_math_Ease.linear = function(t, b, c, d) {
    return c*t/d + b;
};
clumpy_math_Ease.inQuad = function(t, b, c, d) {
    t /= d;
    return c*Math.pow(t, 2) + b;
};
clumpy_math_Ease.outQuad = function(t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + b;
};
clumpy_math_Ease.inOutQuad = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*Math.pow(t, 2) + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
clumpy_math_Ease.inCubic = function(t, b, c, d) {
    t /= d;
    return c*Math.pow(t, 3) + b;
};
clumpy_math_Ease.outCubic = function(t, b, c, d) {
    t /= d;
    t--;
    return c*(Math.pow(t, 3) + 1) + b;
};
clumpy_math_Ease.inOutCubic = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*Math.pow(t, 3) + b;
    t -= 2;
    return c/2*(Math.pow(t, 3) + 2) + b;
};
clumpy_math_Ease.inQuart = function(t, b, c, d) {
    t /= d;
    return c*Math.pow(t, 4) + b;
};
clumpy_math_Ease.outQuart = function(t, b, c, d) {
    t /= d;
    t--;
    return -c * (Math.pow(t, 4) - 1) + b;
};
clumpy_math_Ease.inOutQuart = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*Math.pow(t, 4) + b;
    t -= 2;
    return -c/2 * (Math.pow(t, 4) - 2) + b;
};
clumpy_math_Ease.inQuint = function(t, b, c, d) {
    t /= d;
    return c*t*t*t*t*t + b;
};
clumpy_math_Ease.outQuint = function(t, b, c, d) {
    t /= d;
    t--;
    return c*(Math.pow(t, 5) + 1) + b;
};
clumpy_math_Ease.inOutQuint = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2* Math.pow(t, 5) + b;
    t -= 2;
    return c/2*(Math.pow(t, 5) + 2) + b;
};
clumpy_math_Ease.inSine = function(t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};
clumpy_math_Ease.outSine = function(t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
};
clumpy_math_Ease.inOutSine = function(t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
clumpy_math_Ease.inExpo = function(t, b, c, d) {
    return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
};
clumpy_math_Ease.outExpo = function(t, b, c, d) {
    return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};
clumpy_math_Ease.inOutExpo = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
    t--;
    return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};
clumpy_math_Ease.inCirc = function(t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + b;
};
clumpy_math_Ease.outCirc = function(t, b, c, d) {
    t /= d;
    t--;
    return c * Math.sqrt(1 - Math.pow(t, 2)) + b;
};
clumpy_math_Ease.inOutCirc = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + b;
    t -= 2;
    return c/2 * (Math.sqrt(1 - Math.pow(t, 2)) + 1) + b;
};
clumpy_math_Ease.inElastic = function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
};
clumpy_math_Ease.outElastic = function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};
clumpy_math_Ease.inOutElastic = function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
};
clumpy_math_Ease.inBack = function(t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
};
clumpy_math_Ease.outBack = function(t, b, c, d) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};
clumpy_math_Ease.inOutBack = function(t, b, c, d) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
};
clumpy_math_Ease.inBounce = function(t, b, c, d) {
    return c - clumpy_math_Ease.outBounce (d-t, 0, c, d) + b;
};
clumpy_math_Ease.outBounce = function(t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
};
clumpy_math_Ease.inOutBounce = function(t, b, c, d) {
    if (t < d/2) return clumpy_math_Ease.inBounce (t*2, 0, c, d) * .5 + b;
    return clumpy_math_Ease.outBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
};