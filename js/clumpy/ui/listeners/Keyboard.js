// requires: clumpy_eventing_Callbacks
function clumpy_ui_listeners_Keyboard(start) {
    this.repeatInitialDelay = 250;
    this.repeatDelay = 250;
    this._toTrackDown = {};
    this._toTrackUp = {};
    this._keysDown = {};
    if(start){
        this.start();
    }
}
clumpy_ui_listeners_Keyboard.prototype.getKeyCode = function(keyCodeOrString) {
    // keyCode of a letter is the same as the charcode of its uppercase version
    if(typeof(keyCodeOrString) === 'number'){
        // they passed the keyCode directly, 
        //  if they passed a charcode by mistake, change it by filtering all to uppercase
        return String.fromCharCode(keyCodeOrString).toUpperCase().charCodeAt(0);
    }
    return keyCodeOrString.toUpperCase().charCodeAt(0);
};
clumpy_ui_listeners_Keyboard.prototype.addUp = function(keyCodeOrString, autoRepeat) {
    var keyCode = this.getKeyCode(keyCodeOrString);
    this._toTrackUp[keyCode] = [autoRepeat];
};
clumpy_ui_listeners_Keyboard.prototype.removeUp = function(keyCodeOrString) {
    var keyCode = this.getKeyCode(keyCodeOrString);
    delete this._toTrackUp[keyCode];
};
clumpy_ui_listeners_Keyboard.prototype.addDown = function(keyCodeOrString, autoRepeat) {
    var keyCode = this.getKeyCode(keyCodeOrString);
    this._toTrackDown[keyCode] = [autoRepeat];
};
clumpy_ui_listeners_Keyboard.prototype.removeDown = function(keyCodeOrString) {
    var keyCode = this.getKeyCode(keyCodeOrString);
    delete this._toTrackDown[keyCode];
};
clumpy_ui_listeners_Keyboard.prototype.start = function(){
    document.onkeydown = this._onKeyDown.bindContext(this);
    document.onkeyup = this._onKeyUp.bindContext(this);
};
clumpy_ui_listeners_Keyboard.prototype.stop = function(){
    document.onkeydown = null;
    document.onkeyup = null;
};
clumpy_ui_listeners_Keyboard.prototype._onKeyDown = function(e){
    e = clumpy.getEventObject(e);
    this._keysDown[e.keyCode] = true;
};
clumpy_ui_listeners_Keyboard.prototype._onKeyUp = function(e){
    e = clumpy.getEventObject(e);
    this._keysDown[e.keyCode] = false;
};
