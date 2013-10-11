function clumpy_math_Ease() {
    // t - current time
    // b - start value
    // c - change in value
    // d - duration
}
clumpy_math_Ease.linear = function(t, b, c, d) {
    return c*t/d + b;
};
clumpy_math_Ease.easeInQuad = function(t, b, c, d) {
    t /= d;
    return c*Math.pow(t, 2) + b;
};
clumpy_math_Ease.easeOutQuad = function(t, b, c, d) {
    t /= d;
    return -c * t*(t-2) + b;
};
clumpy_math_Ease.easeInOutQuad = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*Math.pow(t, 2) + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};
clumpy_math_Ease.easeInCubic = function(t, b, c, d) {
    t /= d;
    return c*Math.pow(t, 3) + b;
};
clumpy_math_Ease.easeOutCubic = function(t, b, c, d) {
    t /= d;
    t--;
    return c*(Math.pow(t, 3) + 1) + b;
};
clumpy_math_Ease.easeInOutCubic = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*Math.pow(t, 3) + b;
    t -= 2;
    return c/2*(Math.pow(t, 3) + 2) + b;
};
clumpy_math_Ease.easeInQuart = function(t, b, c, d) {
    t /= d;
    return c*Math.pow(t, 4) + b;
};
clumpy_math_Ease.easeOutQuart = function(t, b, c, d) {
    t /= d;
    t--;
    return -c * (Math.pow(t, 4) - 1) + b;
};
clumpy_math_Ease.easeInOutQuart = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*Math.pow(t, 4) + b;
    t -= 2;
    return -c/2 * (Math.pow(t, 4) - 2) + b;
};
clumpy_math_Ease.easeInQuint = function(t, b, c, d) {
    t /= d;
    return c*t*t*t*t*t + b;
};
clumpy_math_Ease.easeOutQuint = function(t, b, c, d) {
    t /= d;
    t--;
    return c*(Math.pow(t, 5) + 1) + b;
};
clumpy_math_Ease.easeInOutQuint = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2* Math.pow(t, 5) + b;
    t -= 2;
    return c/2*(Math.pow(t, 5) + 2) + b;
};
clumpy_math_Ease.easeInSine = function(t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
};
clumpy_math_Ease.easeOutSine = function(t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
};
clumpy_math_Ease.easeInOutSine = function(t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
clumpy_math_Ease.easeInExpo = function(t, b, c, d) {
    return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
};
clumpy_math_Ease.easeOutExpo = function(t, b, c, d) {
    return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};
clumpy_math_Ease.easeInOutExpo = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
    t--;
    return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};
clumpy_math_Ease.easeInCirc = function(t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + b;
};
clumpy_math_Ease.easeOutCirc = function(t, b, c, d) {
    t /= d;
    t--;
    return c * Math.sqrt(1 - Math.pow(t, 2)) + b;
};
clumpy_math_Ease.easeInOutCirc = function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - Math.pow(t, 2)) - 1) + b;
    t -= 2;
    return c/2 * (Math.sqrt(1 - Math.pow(t, 2)) + 1) + b;
};