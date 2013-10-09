// requires: clumoy_core_Clumpy
function clumpy_timers_Scheduler(milliseconds, autoStart) {
    this._milliseconds = milliseconds;
    this._intervalId = NaN;
    this._calls = [];
    this._running = false;
    if(autoStart){
        start();
    }
    this._onIntervalDelegate = this.call.bindContext(this);
}
clumpy_timers_Scheduler.prototype.start = function(callOnStart) {
    if(this._running){
        return;
    }
    this_intervalId = setInterval(this._onIntervalDelegate, this._milliseconds);
    this._running = true;
    if(callOnStart){
        this.call();
    }
};
clumpy_timers_Scheduler.prototype.stop = function() {
    if(!this._running){
        return;
    }
    clearInterval(this._intervalId);
    this._running = false;
};
clumpy_timers_Scheduler.prototype.setMilliseconds = function(milliseconds, noRefresh) {
    this._milliseconds = milliseconds;
    if(!noRefresh && this._running) {
        this.stop();
        this.start();
    }
};
clumpy_timers_Scheduler.prototype.removeCall = function(func) {
    for(var i=0; i<this._calls.length; i++){
        if(this._calls[i][0] === func){
            this._calls.splice(i, 1);
            break;
        }
    }
};
clumpy_timers_Scheduler.prototype.addCall = function(func, context, args) {
    this.removeCall(func);
    this._calls.push([func, context, args]);
};
clumpy_timers_Scheduler.prototype.call = function() {
    var obj;
    for(var i=0; i<this._calls.length; i++){
        obj = this._calls[i];
        obj[0].apply(obj[1], obj[2]);
    }
};
