//requires jquery, json and clumpy libraries
function clumpy_net_Settings(id) {
    this._id = id;
    return this;
};
clumpy_net_Settings.prototype.id = function(s){
    if(arguments.length > 0) {
        this._id = arguments[0];
        return this;
    }else{
        return this._id;
    }
};
clumpy_net_Settings.prototype.ajaxObj = function(o){
    if(arguments.length > 0) {
        this._ajaxObj = arguments[0];
        return this;
    }else{
        return this._ajaxObj;
    }
};
clumpy_net_Settings.prototype.done = function(f){
    if(arguments.length > 0) {
        this._done = arguments[0];
        return this;
    }else{
        return this._done;
    }
};
clumpy_net_Settings.prototype.fail = function(f){
    if(arguments.length > 0) {
        this._fail = arguments[0];
        return this;
    }else{
        return this._fail;
    }
};
clumpy_net_Settings.prototype.always = function(f){
    if(arguments.length > 0) {
        this._always = arguments[0];
        return this;
    }else{
        return this._always;
    }
};
clumpy_net_Settings.prototype.desc = function(){
    if(arguments.length > 0) {
        // has arg, is a setter
        this._desc = arguments[0];
        // chain as usual
        return this;
    }else{
        // no args is a getter
        // no chaining
        return this._desc;
    }
};
//function clumpy_net_AjaxObjWrapper(type, data, url) {
//    this.props = {type:type, data:data, url:url};
//    return this;
//};
//clumpy_net_AjaxObjWrapper.prototype.prop = function() {
//    if(arguments.length === 1) {
//        return this.props[arguments[0]];
//    }else if(arguments.length === 2){
//        this.props[arguments[0]] = arguments[1];
//    }
//    return this;
//};
//clumpy_net_AjaxObjWrapper.prototype.remove = function(prop) {
//    delete this.props[prop];
//    return this;
//};
function clumpy_net_Zjax(debug){
    this.version = 1;
    this.collection = {};
    this.timeoutById = {};
    this.jqXHR = {};
    this.debug = debug === true;
};
clumpy_net_Zjax.prototype.log = function(msg) {
    if(this.debug) {
        clumpy.log(msg);
    }
};
clumpy_net_Zjax.prototype.zjaxDone = function(id, description) {
    this.log('Zjax done, id=' + id + ', desc=' + (description ? description : ''));
    // can not do the xhr deletion in always because requests chained from done or faile will be deleted
    if(this.jqXHR[id]){
        delete this.jqXHR[id];
    }
};
clumpy_net_Zjax.prototype.zjaxFail = function(id, description) {
    this.log('Zjax fail, id=' + id + ', desc=' + (description ? description : ''));
    if(this.jqXHR[id]){
        delete this.jqXHR[id];
    }
};
clumpy_net_Zjax.prototype.zjaxAlways = function(id, description) {
    this.log('Zjax always, id=' + id + ', desc=' + (description ? description : ''));
    var timeoutObj = this.timeoutById[id];
//        console.log('for id ' + id + ' found timeoutobj ' + timeoutObj);
    if(timeoutObj) {
//            console.log('setting next timeout obj: ' + timeoutObj.timeout + ' ' + timeoutObj.milli);
        timeoutObj.timeout = setTimeout(function(){this.onRepeatTimeout(id);}.bindContext(this), timeoutObj.milli);
    }
};
clumpy_net_Zjax.prototype.onRepeatTimeout = function(id) {
//        console.log('onRepeatTimeout ' + id);
    this.execute(id);
};
clumpy_net_Zjax.prototype.add = function(id) {
//        console.log('add ' + id);
    var setting = new clumpy_net_Settings(id);
    this.collection[id] = setting;
    return setting;
};
clumpy_net_Zjax.prototype.remove = function(id) {
//        console.log('remove ' + id);
    this.stop(id);
    delete this.collection[id];
};
clumpy_net_Zjax.prototype.abort = function(id) {
    if(this.jqXHR[id]){
        this.jqXHR[id].abort();
        delete this.jqXHR[id];
    }
};
clumpy_net_Zjax.prototype.execute = function(id, optionalDataSubstitute){
//        console.log('execute ' + id);
    var settings = this.collection[id];
    if(!settings) {
        return null;
    }
    var restoreData = false;
    if(optionalDataSubstitute) {
        try {
            restoreData = settings.ajaxObj().data;
        }catch(err){
            restoreData = null;
            clumpy.log(err);
        }
        settings.ajaxObj().data = optionalDataSubstitute;
    }
//        clumpy.log(settings.ajaxObj());
    var request = $.ajax(settings.ajaxObj());
    request.done(function(data){
        this.zjaxDone(settings.id(), settings.desc());
        if(settings.done()) {
            settings.done().call(null, id, data);
        }
    }.bindContext(this));
    request.fail(function(jqXHR, textStatus){
        this.zjaxFail(settings.id(), settings.desc());
        if(settings.fail()) {
            settings.fail().call(null, id, jqXHR, textStatus);
        }
    }.bindContext(this));
    request.always(function(){
        this.zjaxAlways(settings.id(), settings.desc());
        if(settings.always()) {
            settings.always().call(null, id);
        }
    }.bindContext(this));
    // could be false or (null or a value) if a substitute data param was passed above
    if(restoreData !== false) {
        settings.ajaxObj().data = restoreData;
    }
    this.jqXHR[id] = request;
    return this;
};
clumpy_net_Zjax.prototype.getSettings = function(id) {
    if(this.collection[id]) {
        return this.collection[id];
    }
    return null;
};
clumpy_net_Zjax.prototype.repeat = function(id, milli) {
//        console.log('repeat ' + id);
    if(this.timeoutById[id]) {
        clearTimeout(this.timeoutById[id].timeout);
    }
    this.timeoutById[id] = {timeout:setTimeout(function(){this.onRepeatTimeout(id);}.bindContext(this), milli), milli:milli};
    return this;
};
clumpy_net_Zjax.prototype.stop = function(id) {
//        console.log('stop ' + id);
    if(this.timeoutById[id]) {
        clearTimeout(this.timeoutById[id].timeout);
        delete this.timeoutById[id];
    }
    return this;
};
clumpy_net_Zjax.prototype.report = function() {
    var lines = [];
    var ids = [];
    clumpy.forEachIn(this.collection, function(prop, val){ids.push(prop);});
    ids.sort();
    var sep = '----------------------------------------------------';
    lines.push(sep);
    lines.push('zjax report ' + (new Date()).toString());
    function addToLines(i, id){
        lines.push(sep);
        var settings = this.getSettings(id);
        var timeoutObj = this.timeoutById[id];
        var repeats = timeoutObj != null;
        lines.push('id=' + id);
        lines.push('desc=' + settings.desc());
        lines.push('ajaxObj=' + JSON.stringify(settings.ajaxObj()));
        lines.push('done=' + (settings.done() ? true : false));
        lines.push('fail=' + (settings.fail() ? true : false));
        lines.push('always=' + (settings.always() ? true : false));
        lines.push('repeatMilli=' + (repeats ? timeoutObj.milli : false));
    }
    clumpy.forEachInArray(ids, addToLines, this);
    lines.push(sep);
    return lines.join("\n");
};

