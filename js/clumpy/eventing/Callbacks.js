// requires: clumpy_core_Clumpy
function clumpy_eventing_Callbacks() {
    // static function
}
clumpy_eventing_Callbacks._table = {};
clumpy_eventing_Callbacks.hasCallback = function(key, func){
    var arr = clumpy_eventing_Callbacks._table[key];
    if(!arr){
        return false;
    }
    for(var i=0; i<arr.length; i++) {
        if(arr[i] === func){
            return true;
        }
    }
    return false;
};
clumpy_eventing_Callbacks.removeCallback = function(key, func){
    var arr = clumpy_eventing_Callbacks._table[key];
    if(arr){
        for(var i=0; i<arr.length; i++) {
            // the same key + function canonly be registered once
            if(arr[i] === func){
                arr.splice(i, 1);
                break;
            }
        }
    }
    return clumpy_eventing_Callbacks;
};
clumpy_eventing_Callbacks.addCallback = function(key, func){
    if(clumpy_eventing_Callbacks.hasCallback(key, func)){
        return;
    }
    if(!clumpy_eventing_Callbacks._table[key]){
        clumpy_eventing_Callbacks._table[key] = [];
    }
    clumpy_eventing_Callbacks._table[key].push(func);
};
clumpy_eventing_Callbacks.call = function(key, dispatcher){
    var arr = clumpy_eventing_Callbacks._table[key];
    if(!arr){
        return;
    }
    for(var i=0; i<arr.length; i++){
        arr[i](dispatcher);
    }
};