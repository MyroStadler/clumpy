// requires: clumpy_math_Ease, clumpy_core_Clumpy, clumpy_eventing_Callbacks
function clumpy_transitions_Tween(id, obj, duration, propsTo, ease) {
    this.id = id;
    clumpy_transitions_Tween._activeTweens[id] = this;
    this.obj = obj;
    this.duration = duration;
    this.time = 0;
    this.propsTo = propsTo;
    this.propsFrom = {};
    this.propsChange = {};
    for(var i in this.propsTo){
        this.propsFrom[i] = this.obj[i];
        this.propsChange[i] = this.propsTo[i] - this.propsFrom[i];
    }
    this.ease = ease ? ease : clumpy_math_Ease.linear;
    this.onUpdate = null;
    this.onUpdateArgs = null;
    this.onComplete = null;
    this.onCompleteArgs = null;
}

// static funcs and props
clumpy_transitions_Tween.EVENT_TWEEN_COMPLETE = 'onTweenComplete';
clumpy_transitions_Tween._activeTweens = {};
clumpy_transitions_Tween.kill = function(idOrTween) {
    delete clumpy_transitions_Tween._activeTweens[typeof(idOrTween) === 'string' ? idOrTween : idOrTween.id];
    return clumpy_transitions_Tween;
};
clumpy_transitions_Tween.advanceTime = function(duration) {
    var tween, ends;
    for(var i in clumpy_transitions_Tween._activeTweens){
        ends = false;
        tween = clumpy_transitions_Tween._activeTweens[i];
        tween.time += duration;
        if(tween.time >= tween.duration) {
            ends = true;
            tween.time = tween.duration;
        }
        tween.render();
        if(tween.onUpdate) {
            tween.onUpdate.apply(tween, tween.onUpdateArgs);
        }
        if(ends){
            clumpy_transitions_Tween.kill(i);
            if(tween.onComplete) {
                tween.onComplete.apply(tween, tween.onCompleteArgs);
            }
            clumpy_eventing_Callbacks.call(clumpy_transitions_Tween.EVENT_TWEEN_COMPLETE, tween);
        }
    }
    return clumpy_transitions_Tween;
};
clumpy_transitions_Tween.to = function(obj, duration, propsTo, ease) {
    var tween = new clumpy_transitions_Tween(clumpy.uuid(), obj, duration, propsTo, ease);
    return tween;
};

// instance funcs
clumpy_transitions_Tween.prototype.setOnUpdate = function(onUpdate, onUpdateArgs) {
    this.onUpdate = onUpdate;
    this.onUpdateArgs = onUpdateArgs;
    return this;
};
clumpy_transitions_Tween.prototype.setOnComplete = function(onComplete, onCompleteArgs) {
    this.onComplete = onComplete;
    this.onCompleteArgs = onCompleteArgs;
    return this;
};
clumpy_transitions_Tween.prototype.render = function() {
    for(var i in this.propsTo){
        this.obj[i] = this.ease.call(null, this.time, this.propsFrom[i], this.propsChange[i], this.duration);
    }
    return this;
};
