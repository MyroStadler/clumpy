// requires: clumpy_math_Ease
function clumpy_transitions_Tween() {
    // static
}
clumpy_transitions_Tween._activeTweens = [];
clumpy_transitions_Tween.advanceTime = function(duration) {
    var tween, t, b, c, d;
    for(var i=0; i<clumpy_transitions_Tween._activeTweens.length; i++){
        tween = clumpy_transitions_Tween._activeTweens[i];
        tween.t += duration;
    }
};
clumpy_transitions_Tween.to = function() {
    
};
