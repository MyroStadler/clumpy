<?php
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TITLE</title>
<script src="js/jquery-1.8.3.min.js"></script>
<script src="js/clumpy-1.js"></script>
<script src="js/zjax-1.js"></script>
<script>
    window.onload = onWindowLoaded;
    function onWindowLoaded(){
        clumpy.debug = true;
        zjax.debug = false;
        // processes can be added
        zjax.add('test')
                .desc('This tests whether zjax works')
                .ajaxObj({type:'GET', url:'ajax_test.php'})
                .done(zjaxDone)
                .fail(zjaxFail)
                .always(zjaxAlways)
                ;
        // and used many times or just once
        zjax.execute('test');
    }
    function zjaxDone(id, data) {
	// you could switch on id here
        clumpy.log('Local zjax done handler, id=' + id + ', data=' + data);    
    }
    function zjaxFail(id, req, textStatus) {
	// and here
        clumpy.log('Local zjax fail handler, id=' + id + ', textStatus=' + textStatus);    
    }
    function zjaxAlways(id) {
	// you can get the description using the id
        clumpy.log('Local zjax always handler, id=' + id + ', desc=' + zjax.getSettings(id).desc());
        // this shows that processes can be removed if no longer needed
        zjax.remove(id);
    }
</script>
</head>
<body>
    <p>Check the console.</p>
</body>
</html>