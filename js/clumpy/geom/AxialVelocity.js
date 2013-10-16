function clumpy_geom_AxialVelocity() {
    this.scale = 1;
    // x
    this.vX = 0;
    this.accX = 1;
    this.decX = 1;
    this.maxX = 10;
    this.minX = -10;
    this.resX = 0.25; // rsistance / fristion
    // y
    this.vY = 0;
    this.accY = 1;
    this.decY = 1;
    this.maxY = 10;
    this.minY = -10;
    this.resY = 0.25;
    // z
    this.vZ = 0;
    this.accZ = 1;
    this.decZ = 1;
    this.maxZ = 10;
    this.minZ = -10;
    this.resZ = 0.25;
    return this;
}
clumpy_geom_AxialVelocity.X = 1;
clumpy_geom_AxialVelocity.Y = 2;
clumpy_geom_AxialVelocity.Z = 4;
clumpy_geom_AxialVelocity.prototype.set = function(prop, val) {
    // this function exists so we can chain to assignments
    switch(arguments.length){
        case 2:
            this[prop] = val;
            break;
        case 1:
            // passed one arg, an object with vals to set
            for(var i in prop) {
                this[i] = prop[i];
            }
            break;
    }
    return this;
};
clumpy_geom_AxialVelocity.prototype.resist = function(xyz, n){
    if(xyz & clumpy_geom_AxialVelocity.X){
        this.vX = this._resist(this.vX, n ? n : this.resX);
    }
    if(xyz & clumpy_geom_AxialVelocity.Y){
        this.vY = this._resist(this.vY, n ? n : this.resY);
    }
    if(xyz & clumpy_geom_AxialVelocity.Z){
        this.vZ = this._resist(this.vZ, n ? n : this.resZ);
    }
    return this;
};
clumpy_geom_AxialVelocity.prototype._resist = function(v, n){
    if(n === 0 || v === 0){
        return 0;
    }
//    var sign = v == 0 ? 0 : (v / -Math.abs(v) * -1);
    var sign = v / -Math.abs(v) * -1;
    return sign * Math.max(Math.abs(v) - n, 0);
};
clumpy_geom_AxialVelocity.prototype.accelerate = function(xyz, n){
    if(xyz & clumpy_geom_AxialVelocity.X){
        this.vX = Math.min(Math.max(this.vX + (n ? n : this.accX), this.minX), this.maxX);
    }
    if(xyz & clumpy_geom_AxialVelocity.Y){
        this.vY = Math.min(Math.max(this.vY + (n ? n : this.accY), this.minY), this.maxY);
    }
    if(xyz & clumpy_geom_AxialVelocity.Z){
        this.vZ = Math.min(Math.max(this.vZ + (n ? n : this.accZ), this.minZ), this.maxZ);
    }
    return this;
};
clumpy_geom_AxialVelocity.prototype.decelerate = function(xyz, n){
    if(xyz & clumpy_geom_AxialVelocity.X){
        this.vX = Math.min(Math.max(this.vX - (n ? n : this.decX), this.minX), this.maxX);
    }
    if(xyz & clumpy_geom_AxialVelocity.Y){
        this.vY = Math.min(Math.max(this.vY - (n ? n : this.decY), this.minY), this.maxY);
    }
    if(xyz & clumpy_geom_AxialVelocity.Z){
        this.vZ = Math.min(Math.max(this.vZ - (n ? n : this.decZ), this.minZ), this.maxZ);
    }
    return this;
};