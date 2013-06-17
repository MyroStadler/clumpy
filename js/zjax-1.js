//requires jquery, json and clumpy libraries

window.zjax = function(debug){
    var zjax = {};
    zjax.version = 1;
    // stick settings objects in here
    var collection = {};
    var timeoutById = {};
    zjax.debug = debug;
    // build a local filter so logging can be turned off locally as well
    function log(msg) {
        if(zjax.debug) {
            clumpy.log(msg);
        }
    }
    function zjaxDone(id, description) {
        log('Zjax done, id=' + id + ', desc=' + (description ? description : ''));
    }
    function zjaxFail(id, description) {
        log('Zjax fail, id=' + id + ', desc=' + (description ? description : ''));
    }
    function zjaxAlways(id, description) {
        log('Zjax always, id=' + id + ', desc=' + (description ? description : ''));
        var timeoutObj = timeoutById[id];
//        console.log('for id ' + id + ' found timeoutobj ' + timeoutObj);
        if(timeoutObj) {
//            console.log('setting next timeout obj: ' + timeoutObj.timeout + ' ' + timeoutObj.milli);
            timeoutObj.timeout = setTimeout(function(){onRepeatTimeout(id);}, timeoutObj.milli);
        }
    }
    function onRepeatTimeout(id) {
//        console.log('onRepeatTimeout ' + id);
        execute(id);
    }
    function Settings(id) {
        this._id = id;
        return this;
    }
    Settings.prototype.id = function(s){
        if(arguments.length > 0) {
            this._id = arguments[0];
            return this;
        }else{
            return this._id;
        }
    };
    Settings.prototype.ajaxObj = function(o){
        if(arguments.length > 0) {
            this._ajaxObj = arguments[0];
            return this;
        }else{
            return this._ajaxObj;
        }
    };
    Settings.prototype.done = function(f){
        if(arguments.length > 0) {
            this._done= arguments[0];
            return this;
        }else{
            return this._done;
        }
    };
    Settings.prototype.fail = function(f){
        if(arguments.length > 0) {
            this._fail = arguments[0];
            return this;
        }else{
            return this._fail;
        }
    };
    Settings.prototype.always = function(f){
        if(arguments.length > 0) {
            this._always = arguments[0];
            return this;
        }else{
            return this._always;
        }
    };
    Settings.prototype.desc = function(){
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
    function AjaxObjWrapper(type, data, url) {
        this.props = {type:type, data:data, url:url};
        return this;
    };
    AjaxObjWrapper.prototype.prop = function() {
        if(arguments.length === 1) {
            return this.props[arguments[0]];
        }else if(arguments.length === 2){
            this.props[arguments[0]] = arguments[1];
        }
        return this;
    };
    AjaxObjWrapper.prototype.remove = function(prop) {
        delete this.props[prop];
        return this;
    };
    function add(id) {
//        console.log('add ' + id);
        var setting = new Settings(id);
        collection[id] = setting;
        return setting;
    }
    function remove(id) {
//        console.log('remove ' + id);
        stop(id);
        delete collection[id];
    }
    function execute(id){
//        console.log('execute ' + id);
        var settings = collection[id];
        if(!settings) {
            return null;
        }
        var request = $.ajax(settings.ajaxObj());
        request.done(function(data){
            zjaxDone(settings.id(), settings.desc());
            if(settings.done()) {
                settings.done().call(null, id, data);
            }
        });
        request.fail(function(jqXHR, textStatus){
            zjaxFail(settings.id(), settings.desc());
            if(settings.fail()) {
                settings.fail().call(null, id, jqXHR, textStatus);
            }
        });
        request.always(function(){
            zjaxAlways(settings.id(), settings.desc());
            if(settings.always()) {
                settings.always().call(null, id);
            }
        });
        return zjax;
    }
    function getSettings(id) {
        if(collection[id]) {
            return collection[id];
        }
        return null;
    }
    function repeat(id, milli) {
//        console.log('repeat ' + id);
        if(timeoutById[id]) {
            clearTimeout(timeoutById[id].timeout);
        }
        timeoutById[id] = {timeout:setTimeout(function(){onRepeatTimeout(id);}, milli), milli:milli};
        return zjax;
    }
    function stop(id) {
//        console.log('stop ' + id);
        if(timeoutById[id]) {
            clearTimeout(timeoutById[id].timeout);
            delete timeoutById[id];
        }
        return zjax;
    }
    function report() {
        var lines = [];
        var ids = [];
        clumpy.forEachIn(collection, function(prop, val){ids.push(prop);});
        ids.sort();
        var sep = '----------------------------------------------------';
        lines.push(sep);
        lines.push('zjax report ' + (new Date()).toString());
        function addToLines(i, id){
            lines.push(sep);
            var settings = getSettings(id);
            var timeoutObj = timeoutById[id];
            var repeats = timeoutObj != null;
            lines.push('id=' + id);
            lines.push('desc=' + settings.desc());
            lines.push('ajaxObj=' + JSON.stringify(settings.ajaxObj()));
            lines.push('done=' + (settings.done() ? true : false));
            lines.push('fail=' + (settings.fail() ? true : false));
            lines.push('always=' + (settings.always() ? true : false));
            lines.push('repeatMilli=' + (repeats ? timeoutObj.milli : false));
        }
        clumpy.forEachInArray(ids, addToLines);
        lines.push(sep);
        return lines.join("\n");
    }
    
    // explicitly defined interface
    zjax.add = function(id) {return add(id);};
    zjax.remove = function(id) {remove(id);};
    zjax.execute = function (id) {return execute(id);};
    zjax.repeat = function (id, milli) {return repeat(id, milli);};
    zjax.stop = function (id) {return stop(id);};
    zjax.getSettings = function(id) {return getSettings(id);};
    zjax.report = function() {return report();};
    zjax.ajaxObjWrapper = function(type, data, url) {return new AjaxObjWrapper(type, data, url);};
    return zjax;
}(false);

