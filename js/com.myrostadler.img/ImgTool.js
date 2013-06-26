// requires: clumpy
function com_myrostadler_img_ImgTool() {
    this.debug = false;
}
com_myrostadler_img_ImgTool.FIT = 'fit';
com_myrostadler_img_ImgTool.FILL = 'fill';
com_myrostadler_img_ImgTool.prototype.getScale = function(imgWidth, imgHeight, containerWidth, containerHeight, fitOrFill) {
    var containerSizeRatio = containerWidth/containerHeight;
    var sizeRatio = imgWidth/imgHeight;
    if(fitOrFill === com_myrostadler_img_ImgTool.FIT) {
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
com_myrostadler_img_ImgTool.prototype.getCentredOffsets = function(imgWidth, imgHeight, containerWidth, containerHeight, noRounding) {
    var result = {x:(containerWidth - imgWidth)/2, y:(containerHeight - imgHeight)/2};
    if(noRounding !== true) {
        result.x = Math.round(result.x);
        result.y = Math.round(result.y);
    }
    return result;
};
