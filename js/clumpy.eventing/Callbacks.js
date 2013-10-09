// requires: clumpy_core_Clumpy
function clumpy_eventing_Callbacks() {
    this._table = {};
    return this;
}
clumpy_eventing_Callbacks.prototype.hasCallback = function(key, func){
    var arr = this._table[key];
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
clumpy_eventing_Callbacks.prototype.removeCallback = function(key, func){
    var arr = this._table[key];
    if(arr){
        for(var i=0; i<arr.length; i++) {
            // the same key + function canonly be registered once
            if(arr[i] === func){
                arr.splice(i, 1);
                break;
            }
        }
    }
    return this;
};
clumpy_eventing_Callbacks.prototype.addCallback = function(key, func){
    if(this.hasCallback(key, func)){
        return;
    }
    if(!this._table[key]){
        this._table[key] = [];
    }
    this._table[key].push(func);
};
clumpy_eventing_Callbacks.prototype.call = function(key, dispatcher){
    var arr = this._table[key];
    if(!arr){
        return;
    }
    for(var i=0; i<arr.length; i++){
        arr[i](dispatcher);
    }
};