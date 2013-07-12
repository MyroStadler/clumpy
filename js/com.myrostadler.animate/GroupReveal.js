// requires: jQuery
function com_myrostadler_img_GroupReveal(intervalSeconds, revealSeconds, elements) {
    this.intervalSeconds = intervalSeconds;
    this.revealSeconds = revealSeconds;
    this.elements = elements;
    this.intervalId = 0;
    this.index = 0;
}
com_myrostadler_img_GroupReveal.prototype.start = function() {
    var onInterval = function(revealer) {
        if(revealer.index >= revealer.elements.length){
            clearInterval(revealer.intervalId);
            return;
        } 
        var animateMe = $(revealer.elements[revealer.index]);
        animateMe.show(Math.floor(revealer.revealSeconds * 1000));
        revealer.index++;
    };
    var that = this;
    this.stop().reset().intervalId = setInterval(function(){ onInterval(that); }, Math.floor(this.intervalSeconds * 1000));
}; 
com_myrostadler_img_GroupReveal.prototype.stop = function() {
    clearInterval(this.intervalId);
    return this;
};
com_myrostadler_img_GroupReveal.prototype.reset = function() {
    for(var i=0; i<this.elements.length; i++){
        $(this.elements[i]).hide();
    }
    this.index = 0;
    return this;
};
