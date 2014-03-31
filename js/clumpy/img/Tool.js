// requires: 
function clumpy_img_Tool() {
    //
}
clumpy_img_Tool.FIT = 'fit';
clumpy_img_Tool.FILL = 'fill';
clumpy_img_Tool.prototype.getScale = function(imgWidth, imgHeight, containerWidth, containerHeight, fitOrFill) {
    var containerSizeRatio = containerWidth/containerHeight;
    var sizeRatio = imgWidth/imgHeight;
    if(fitOrFill === clumpy_img_Tool.FIT) {
            if(sizeRatio > containerSizeRatio){
                    // fit the width in first
                    return (containerWidth/imgWidth);
            }else{
                    // fit the height in first
                    return (containerHeight/imgHeight);
            }
    }else{
            if(sizeRatio < containerSizeRatio){
                    // fit the width in first
                    return (containerWidth/imgWidth);
            }else{
                    // fit the height in first
                    return (containerHeight/imgHeight);
            }
    }
}; 
clumpy_img_Tool.prototype.getCentredOffsets = function(imgWidth, imgHeight, containerWidth, containerHeight, noRounding) {
    var result = {x:(containerWidth - imgWidth)/2, y:(containerHeight - imgHeight)/2};
    if(noRounding !== true) {
        result.x = Math.round(result.x);
        result.y = Math.round(result.y);
    }
    return result;
};
