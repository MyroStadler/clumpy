function clumpy_core_Clumpy(debug) {
    // PROTOTYPE SHINNANIGANS - for properly scoped event handlers
    Function.prototype.bindContext = function() {
        var callingFunction = this;
        var scope = arguments[0];
        var otherArgs = [];
        for(var i = 2; i < arguments.length; i++){ 
                otherArgs.push(arguments[i]);
        }
        return function(e) {
            otherArgs.unshift(e || window.event);
            callingFunction.apply(scope, otherArgs);
        };
    };
    this.version = '1';
    this.debug = debug;
};

clumpy_core_Clumpy.prototype.clone = function(object) {
    function OneShotConstructor(){};
    OneShotConstructor.prototype = object;
    return new OneShotConstructor();
};
clumpy_core_Clumpy.prototype.forEachIn = function(object, action, context) {
    for (var property in object) {
        if (Object.prototype.propertyIsEnumerable.call(object, property)){
            action.call(context, property, object[property]);
        }
    }
};
clumpy_core_Clumpy.prototype.forEachInArray = function(array, action, context) {
    for (var i=0; i<array.length; i++) {
        action.call(context, i, array[i]);
    }
};
clumpy_core_Clumpy.prototype.log = function(msg) {
    if(!this.debug) {
        return;
    }
    try {
        console.log(msg);
    } catch (exception) {
        alert(msg);
        return;
    }
};
clumpy_core_Clumpy.prototype.getEventObject = function(e) {
    return e ? e : window.event;
};
clumpy_core_Clumpy.prototype.getEventCurrentTarget = function(e) {
    e = e ? e : window.event;
    if(e) {
        if(e.currentTarget){
            return e.currentTarget;
        }else if(e.srcElement) {
            return e.srcElement;
        }else if(e.target) {
            return e.target;
        }
    }
    return null;
};
clumpy_core_Clumpy.prototype.getEventTarget = function(e) {
    e = e ? e : window.event;
    if(e) {
        if(e.target){
            return e.target;
        }else if(e.srcElement) {
            return e.srcElement;
        }
    }
    return null;
};

window.clumpy = new clumpy_core_Clumpy(true);