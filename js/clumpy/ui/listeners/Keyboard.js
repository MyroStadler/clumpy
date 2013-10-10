// requires: clumpy_eventing_Callbacks
function clumpy_ui_listeners_Keyboard(autoStart, repeatInitialDelay, repeatDelay) {
    this.repeatInitialDelay = repeatInitialDelay ? repeatInitialDelay : 250;
    this.repeatDelay = repeatDelay ? repeatDelay : 250;
    this._callbackDown = {};
    this._callbackUp = {};
    this._keysDown = {};
    this._isRepeating = {};
    this._repeatIntervalIds = {};
    if(autoStart){
        this.start();
    }
}
clumpy_ui_listeners_Keyboard.EVENT_KEY_DOWN = 'onKeyDown';
clumpy_ui_listeners_Keyboard.EVENT_KEY_UP = 'onKeyUp';
clumpy_ui_listeners_Keyboard.prototype.translateKeyCode = function(keyCodeOrString) {
    // keyCode of a letter is the same as the charcode of its uppercase version
    if(typeof(keyCodeOrString) === 'number'){
        // they passed the keyCode directly, 
        //  if they passed a charcode by mistake, change it by filtering all to uppercase
        return String.fromCharCode(keyCodeOrString).toUpperCase().charCodeAt(0);
    }
    return keyCodeOrString.toUpperCase().charCodeAt(0);
};
clumpy_ui_listeners_Keyboard.prototype.addUp = function(keyCodeOrString, callback) {
    var keyCode = this.translateKeyCode(keyCodeOrString);
    this._callbackUp[keyCode] = callback;
};
clumpy_ui_listeners_Keyboard.prototype.removeUp = function(keyCodeOrString) {
    var keyCode = this.getKeyCode(keyCodeOrString);
    delete this._callbackUp[keyCode];
};
clumpy_ui_listeners_Keyboard.prototype.addDown = function(keyCodeOrString, callback, autoRepeat) {
    var keyCode = this.translateKeyCode(keyCodeOrString);
    this._callbackDown[keyCode] = callback;
    if(autoRepeat){
        this._isRepeating[keyCode] = true;
    }
};
clumpy_ui_listeners_Keyboard.prototype.removeDown = function(keyCodeOrString) {
    var keyCode = this.getKeyCode(keyCodeOrString);
    delete this._callbackDown[keyCode];
};
clumpy_ui_listeners_Keyboard.prototype.start = function(){
    document.onkeydown = this._onKeyDown.bindContext(this);
    document.onkeyup = this._onKeyUp.bindContext(this);
};
clumpy_ui_listeners_Keyboard.prototype.stop = function(){
    document.onkeydown = null;
    document.onkeyup = null;
};
clumpy_ui_listeners_Keyboard.prototype.clear = function(){
    // TODO - remove all, set state to starting state with all empty logs etc.
};
clumpy_ui_listeners_Keyboard.prototype._onKeyDown = function(e){
    e = clumpy.getEventObject(e);
    if(this._keysDown[e.keyCode]){
        return;
    }
    this._keysDown[e.keyCode] = true;
    if(this._isRepeating[e.keyCode]){
        this._startRepeat(e.keyCode);
    }
    this.sendKeyDown(e.keyCode);
};
clumpy_ui_listeners_Keyboard.prototype._onKeyUp = function(e){
    e = clumpy.getEventObject(e);
    this._keysDown[e.keyCode] = false;
    this._clearRepeat(e.keyCode);
    this.sendKeyUp(e.keyCode);
};
clumpy_ui_listeners_Keyboard.prototype._clearRepeat = function(keyCode){
    clearTimeout(this._repeatIntervalIds[keyCode]);
    clearInterval(this._repeatIntervalIds[keyCode]);
};
clumpy_ui_listeners_Keyboard.prototype._startRepeat = function(keyCode){
    this._clearRepeat(keyCode);
    this._repeatIntervalIds[keyCode] = setTimeout(function(){this._continueRepeat(keyCode);}.bindContext(this), this.repeatInitialDelay);
};
clumpy_ui_listeners_Keyboard.prototype._continueRepeat = function(keyCode){
    this._clearRepeat(keyCode);
    this.sendKeyDown(keyCode);
    this._repeatIntervalIds[keyCode] = setInterval(function(){this.sendKeyDown(keyCode);}.bindContext(this), this.repeatDelay);
};
clumpy_ui_listeners_Keyboard.prototype.sendKeyDown = function(keyCode){
    clumpy.log('DOWN ' + keyCode + ' ' + String.fromCharCode(keyCode));
    if(this._callbackDown[keyCode]) {
        if(typeof(this._callbackDown[keyCode]) === "function"){
            this._callbackDown[keyCode](keyCode);
        }
    }
    clumpy_eventing_Callbacks.call(clumpy_ui_listeners_Keyboard.EVENT_KEY_DOWN, this, keyCode);
};
clumpy_ui_listeners_Keyboard.prototype.sendKeyUp = function(keyCode){
    clumpy.log('UP ' + keyCode + ' ' + String.fromCharCode(keyCode));
    if(this._callbackUp[keyCode]) {
        if(typeof(this._callbackUp[keyCode]) === "function"){
            this._callbackUp[keyCode](keyCode);
        }
    }
    clumpy_eventing_Callbacks.call(clumpy_ui_listeners_Keyboard.EVENT_KEY_DOWN, this, keyCode);
};
