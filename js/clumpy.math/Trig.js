function clumpy_math_Trig() {
    // static methods only please
}
clumpy_math_Trig.fromTo = function (o) {
    var retFrom = clumpy_math_Trig.range(o.from);
    var retTo = clumpy_math_Trig.range(o.to);
    if (Math.abs(retTo - retFrom) > 180) {
        if (retTo < retFrom) {
            retTo += 360;
        } else {
            retFrom += 360;
        }
    }
    return {
        from: retFrom,
        to: retTo
    };
};
clumpy_math_Trig.range = function (d) {
    // returns degrees in the range 0 - 359
    if (isNaN(d)) {
        return 0;
    }
    while (d < 0) {
        d += 360;
    }
    while (d >= 360) {
        d -= 360;
    }
    return d;
};
clumpy_math_Trig.fromNorth = function (xSide, ySide) {
    // returns degrees deviation from north
    var H = clumpy_math_Trig.solveH(xSide, ySide);
    var T = clumpy_math_Trig.solveTAH(ySide, H);
    return 180 - (clumpy_math_Trig.signAs(clumpy_math_Trig.degrees(T), xSide));
};
clumpy_math_Trig.rotate = function (ao, rads) {
    var H = clumpy_math_Trig.solveH(ao.a, ao.o);
    if (H === 0) {
        H = 0.001;
    }
    var currentRads = clumpy_math_Trig.signAs(clumpy_math_Trig.solveTAH(ret.a, H), ret.o);
    return {
        a: clumpy_math_Trig.solveAHT(H, currentRads + rads),
        o: clumpy_math_Trig.solveOHT(H, currentRads + rads)
    };
};
clumpy_math_Trig.signAs = function (changeSign, toThis) {
    if (toThis >= 0) {
        return Math.abs(changeSign);
    } else {
        return -Math.abs(changeSign);
    }
};
clumpy_math_Trig.solveDXY = function (x, y) {
    // returns degrees
    return clumpy_math_Trig.signAs(clumpy_math_Trig.degrees(clumpy_math_Trig.solveTAH(x, clumpy_math_Trig.solveH(x, y))), y);
};
clumpy_math_Trig.solveRXY = function (x, y) {
    // returns radians
    return clumpy_math_Trig.signAs(clumpy_math_Trig.solveTAH(x, clumpy_math_Trig.solveH(x, y)), y);
};
clumpy_math_Trig.solveH = function (a, o) {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
};
clumpy_math_Trig.solveAorO = function (H, side) {
    return Math.sqrt(Math.pow(H, 2) - Math.pow(side, 2));
};
clumpy_math_Trig.radians = function (d) {
    return Math.PI / 180 * d;
};
clumpy_math_Trig.degrees = function (r) {
    return r * 180 / Math.PI;
};
clumpy_math_Trig.solveTHO = function (H, o) {
    return Math.asin(o / H);
};
clumpy_math_Trig.solveTAO = function (a, o) {
    return Math.atan(o / a);
};
clumpy_math_Trig.solveTAH = function (a, H) {
    return Math.acos(a / H);
};
clumpy_math_Trig.solveOHT = function (H, T) {
    return Math.sin(T) * H;
};
clumpy_math_Trig.solveOAT = function (a, T) {
    return Math.tan(T) * a;
};
clumpy_math_Trig.solveAHT = function (H, T) {
    return Math.cos(T) * H;
};
clumpy_math_Trig.solveAOT = function (o, T) {
    return o / Math.tan(T);
};
clumpy_math_Trig.solveHAT = function (a, T) {
    return a / Math.cos(T);
};
clumpy_math_Trig.solveHOT = function (o, T) {
    return o / Math.sin(T);
};