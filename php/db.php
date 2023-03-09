<?php
    try {
        $conn = new PDO('mysql: host=localhost; dbname=siscad', 'root', '');
    } catch (Exception $e) {
        echo $e->getMessage();
        echo "<br>";
        echo $e->getCode();
    }
?>