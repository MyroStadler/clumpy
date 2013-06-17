<?php
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TITLE</title>

<script src="js/clumpy-1.js"></script>


<script>
    window.onload = onWindowLoaded;
    function onWindowLoaded(){
        // pass preload an array of urls and a handler function.
        //  the handler function has two params: ratio completed (0-1) and the url of the image loaded.
        clumpy.preloadImages(['images/iss.jpg', 'images/d20.jpg'], 
                function(progress, src){clumpy.log('Image progress: ' + progress + ' ' + src)}
        );
        clumpy.preloadAudio(['audio/back-in-black.ogg', 'audio/trombone.ogg'], 
                function(progress, src){clumpy.log('Audio progress: ' + progress + ' ' + src)}
        );
    }
</script>
</head>
<body>
    <p>Check the console.</p>
</body>
</html>