function clumpy_math_Byte(n) {
    this.value = n ? n : 0;
    return this;
}
clumpy_math_Byte.prototype.add = function(n) {
    this.value |= n;
    return this;
};
clumpy_math_Byte.prototype.remove = function(n) {
    this.value &= ~n;
    return this;
};
clumpy_math_Byte.prototype.reflect = function(n, condition) {
    if(condition){
        this.add(n);
    }else{
        this.remove(n);
    }
    return this;
};
clumpy_math_Byte.prototype.test = function(n) {
    return (this.value & n) === n;
};
