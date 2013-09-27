<?php
$proofs = array();
if ($handle = opendir('.')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && strpos($entry, 'proof-') === 0) {
            $proofs[] = $entry;
        }
    }
    closedir($handle);
}
?>
<html>
    <body>
        <?php
        foreach($proofs as $filename){
            echo "<a href=\"$filename\">$filename</a><br />\n";
        }
        ?>
    </body>
</html>
